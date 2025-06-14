import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is not defined')

const uri = process.env.MONGODB_URI

export async function GET() {
  try {
    const client = await MongoClient.connect(uri)
    const db = client.db('dev_geoffvrijmoet_com')

    const videos = await db
      .collection('videos')
      .find()
      .sort({ createdAt: -1 })
      .toArray()

    await client.close()

    return NextResponse.json(videos)
  } catch (error) {
    console.error('[api/videos] error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    )
  }
} 