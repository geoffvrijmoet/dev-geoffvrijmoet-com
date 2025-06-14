import { readFile } from 'node:fs/promises';

interface StreamUploadResult {
  uid: string;
  thumbnail: string;
  embedUrl: string;
  size: number;
}

type Meta = Record<string, string>;

export async function uploadToCloudflareStream(
  filePath: string,
  accountId: string,
  apiToken: string,
  metadata: Meta = {}
): Promise<StreamUploadResult> {
  const fileBuffer = await readFile(filePath);

  // Always use multipart so we can pass metadata when provided.
  const form = new FormData();
  form.append('file', new Blob([fileBuffer]), 'video.mp4');
  Object.entries(metadata).forEach(([k, v]) => {
    form.append(`meta[${k}]`, v);
  });

  const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/stream`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
    body: form as unknown as BodyInit,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Cloudflare Stream upload failed: ${res.status} – ${text}`);
  }

  const json = (await res.json()) as {
    result: { uid: string; thumbnail: string };
  };
  const result = json.result;
  return {
    uid: result.uid,
    thumbnail: result.thumbnail,
    embedUrl: `https://iframe.videodelivery.net/${result.uid}`,
    size: fileBuffer.byteLength,
  };
} 