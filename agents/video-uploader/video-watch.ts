import 'dotenv/config';
import chokidar from 'chokidar';
import path from 'node:path';
import { stat, rename, unlink } from 'node:fs/promises';
import execa from 'execa';
import ffmpegPath from 'ffmpeg-static';
import { fetch } from 'undici';
import { uploadToCloudflareStream } from '../../lib/cloudflareStream.js';
import { uploadToCloudinary } from '../../lib/cloudinary.js';

const WATCH_DIR = process.env.VIDEO_WATCH_DIR ?? path.resolve(process.cwd(), 'videos');
const PROCESSED_DIR = path.join(WATCH_DIR, '..', 'processed');
const FAILED_DIR = path.join(WATCH_DIR, '..', 'failed');
const USE_CDN = process.env.USE_CDN ?? 'cloudflare';

const PORTFOLIO_URL = process.env.PORTFOLIO_UPLOAD_URL;
const PORTFOLIO_TOKEN = process.env.PORTFOLIO_UPLOAD_TOKEN;

if (!PORTFOLIO_URL || !PORTFOLIO_TOKEN) {
  console.error('Missing PORTFOLIO_UPLOAD_URL or PORTFOLIO_UPLOAD_TOKEN env variables');
  process.exit(1);
}

async function waitUntilStable(file: string) {
  let previous = -1;
  let stableCount = 0;
  while (stableCount < 2) {
    const { size } = await stat(file);
    if (size === previous) stableCount += 1;
    else stableCount = 0;
    previous = size;
    await new Promise((r) => setTimeout(r, 800));
  }
}

async function toMp4(src: string, dest: string) {
  // probe codec
  const { stdout } = await execa(ffmpegPath!, [
    '-i', src,
    '-hide_banner', '-loglevel', 'error',
    '-select_streams', 'v:0', '-show_entries', 'stream=codec_name', '-of', 'csv=p=0'],
  );
  const already = stdout.trim() === 'h264';
  const args = already ?
    ['-i', src, '-c', 'copy', '-movflags', '+faststart', dest] :
    ['-i', src, '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '26', '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', dest];
  await execa(ffmpegPath!, args, { stdio: 'inherit' });
}

async function upload(mp4Path: string, projectSlug: string) {
  if (USE_CDN === 'cloudflare') {
    const { CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_STREAM_TOKEN } = process.env;
    if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_STREAM_TOKEN) throw new Error('Missing Cloudflare env vars');
    const res = await uploadToCloudflareStream(mp4Path, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_STREAM_TOKEN, {
      project: projectSlug,
    });
    return { url: res.embedUrl, bytes: res.size, poster: res.thumbnail };
  }
  if (USE_CDN === 'cloudinary') {
    const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) throw new Error('Missing Cloudinary env vars');
    const res = await uploadToCloudinary(mp4Path, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET);
    return { url: res.secureUrl, bytes: res.bytes };
  }
  throw new Error(`Unknown USE_CDN ${USE_CDN}`);
}

async function notifyPortfolio(payload: { url: string; poster?: string; bytes?: number; project: string }) {
  const res = await fetch(PORTFOLIO_URL!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${PORTFOLIO_TOKEN}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Portfolio API error ${res.status}: ${text}`);
  }
}

function log(...args: unknown[]) {
  // eslint-disable-next-line no-console
  console.log('[video-agent]', ...args);
}

log('Watching', WATCH_DIR);

chokidar
  .watch(WATCH_DIR, { ignoreInitial: true })
  .on('add', async (file) => {
    if (!file.toLowerCase().endsWith('.mov')) return;
    const projectSlug = path.relative(WATCH_DIR, file).split(path.sep)[0];
    log('Detected', file);
    try {
      await waitUntilStable(file);
      const mp4 = file.replace(/\.mov$/i, '.mp4');
      await toMp4(file, mp4);
      const { url, poster, bytes } = await upload(mp4, projectSlug);
      await notifyPortfolio({ url, poster, bytes, project: projectSlug });
      await rename(file, path.join(PROCESSED_DIR, path.basename(file)));
      await unlink(mp4);
      log('Processed', path.basename(file));
    } catch (err) {
      log('Error processing', file, err);
      await rename(file, path.join(FAILED_DIR, path.basename(file)));
    }
  }); 