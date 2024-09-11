import React from 'react'

export default function IntroVideo() {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
    </div>
  )
}