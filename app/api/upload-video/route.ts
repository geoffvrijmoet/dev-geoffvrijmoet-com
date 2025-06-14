import { NextRequest, NextResponse } from 'next/server';

interface Body {
  url: string;
  poster?: string;
  width?: number;
  height?: number;
  bytes?: number;
}

const TOKEN = process.env.PORTFOLIO_UPLOAD_TOKEN;

export async function POST(req: NextRequest) {
  if (!TOKEN) {
    return NextResponse.json({ error: 'Server misconfigured: missing token' }, { status: 500 });
  }

  const auth = req.headers.get('authorization');
  if (auth !== `Bearer ${TOKEN}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (!body.url) {
    return NextResponse.json({ error: 'Missing url' }, { status: 400 });
  }

  // Persist in MongoDB
  if (!process.env.MONGODB_URI) {
    return NextResponse.json(
      { error: 'Server misconfigured: missing MONGODB_URI' },
      { status: 500 }
    )
  }

  try {
    const { MongoClient } = await import('mongodb')
    const client = await MongoClient.connect(process.env.MONGODB_URI)
    const db = client.db('dev_geoffvrijmoet_com')

    const videos = db.collection('videos')

    // Ensure an index on createdAt for sorting
    await videos.createIndex({ createdAt: -1 })

    await videos.insertOne({
      ...body,
      createdAt: new Date(),
    })

    await client.close()
  } catch (err) {
    console.error('[upload-video] Mongo error', err)
    return NextResponse.json({ error: 'Failed to persist video' }, { status: 500 })
  }

  return NextResponse.json({ ok: true });
} 