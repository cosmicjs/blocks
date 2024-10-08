/* eslint-disable @next/next/no-img-element */
"use client"

import { useState } from "react"

import { VideoType } from "./VideoCard"

export function PlayArea({ video }: { video: VideoType }) {
  const [isClicked, setIsClicked] = useState(false)
  return (
    <>
      {!isClicked ? (
        <div className="relative max-h-[75vh] cursor-pointer overflow-hidden md:h-[420px]">
          <button onClick={() => setIsClicked(true)} className="w-full">
            <img
              src={`${video.metadata.thumbnail.imgix_url}?w=2000&auto=format,compression`}
              alt={video.title}
              className="aspect-video w-full object-cover"
            />
            <div className="absolute top-[50%] flex w-full justify-center">
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="-mt-[60px]"
              >
                <circle cx="60" cy="60" r="60" fill="white"></circle>
                <path
                  d="M86.0469 59.5619L46.2446 82.6355L46.1634 36.6289L86.0469 59.5619Z"
                  fill="#191942"
                ></path>
              </svg>
            </div>
          </button>
        </div>
      ) : (
        <video
          src={video.metadata.video.url}
          controls
          className="max-h-[75vh] w-full md:h-[420px]"
          autoPlay
        />
      )}
    </>
  )
}
