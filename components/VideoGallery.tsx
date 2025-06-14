"use client"

import { useEffect, useState } from 'react'

interface Video {
  _id: string
  url: string
  poster?: string
  width?: number
  height?: number
  bytes?: number
  createdAt?: string
}

export default function VideoGallery() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/videos')
        if (res.ok) {
          const data = (await res.json()) as Video[]
          setVideos(data)
        }
      } catch (err) {
        console.error('Failed to load videos', err)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  if (loading) {
    return <p className="text-center my-12">Loading videos…</p>
  }

  if (videos.length === 0) {
    return <p className="text-center my-12">No videos yet.</p>
  }

  return (
    <section className="py-16 md:py-24 bg-secondary/20">
      <div className="container px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">
          Latest Screen-share Videos
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <div key={video._id} className="rounded-lg overflow-hidden shadow-sm">
              {video.url.includes('iframe') ? (
                // If the URL already contains an iframe embed code, dangerously set innerHTML
                <div
                  className="w-full aspect-video"
                  dangerouslySetInnerHTML={{ __html: video.url }}
                />
              ) : (
                <iframe
                  src={video.url}
                  className="w-full aspect-video"
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                  allowFullScreen
                  title="Screen-share video"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 