import { readFile } from 'node:fs/promises';
import crypto from 'node:crypto';
import FormData from 'form-data';

interface CloudinaryUploadResult {
  publicId: string;
  secureUrl: string;
  bytes: number;
}

function createSignature(params: Record<string, string>, apiSecret: string) {
  const sorted = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join('&');
  return crypto.createHash('sha1').update(sorted + apiSecret).digest('hex');
}

export async function uploadToCloudinary(
  filePath: string,
  cloudName: string,
  apiKey: string,
  apiSecret: string
): Promise<CloudinaryUploadResult> {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const params = { timestamp, folder: 'portfolio' };
  const signature = createSignature(params, apiSecret);

  const file = await readFile(filePath);

  const form = new FormData();
  form.append('file', file, 'video.mp4');
  form.append('api_key', apiKey);
  form.append('timestamp', timestamp);
  form.append('signature', signature);
  form.append('folder', 'portfolio');
  form.append('resource_type', 'video');

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/video/upload`, {
    method: 'POST',
    body: form as unknown as BodyInit,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Cloudinary upload failed: ${res.status} – ${text}`);
  }

  const json = (await res.json()) as {
    public_id: string;
    secure_url: string;
    bytes: number;
  };

  return {
    publicId: json.public_id,
    secureUrl: json.secure_url,
    bytes: json.bytes,
  };
} 