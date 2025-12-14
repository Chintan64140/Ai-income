import React, { useRef, useState } from "react";

// VideoHoverPreview_Tailwind.jsx
// Single-file React component (default export) using Tailwind CSS.
// - Shows thumbnail image by default
// - On hover it shows and plays the preview video (AV1 first, MP4 fallback)
// - Responsive grid, accessible, optimized for modern browsers

export default function VideoHoverPreview({ videos = [] }) {
  return (
    <div className="bg-[#4f4f4f] pb-6">
      <div className="p-4 bg-[#353535]">
        <div className="container">
          <img src="https://www.freepornvideo.sex/images/logo.png" />
        </div>
      </div>
      <div className="p-4 container">
        <div className="flex justify-center py-10 flex-col items-center gap-2">
          <video
            controls
            // preload="none"
            width="640"
            height="360"
            className="rounded-lg"
          >
            <source
              src="https://pr1.sexvid.pro/contents/videos/19000/19604/19604_short_preview.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <p className="text-[26px] text-[#fff] ">A chick is pushed against the bed and fucked</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {videos.map((v) => (
            <VideoCard key={v.video_id} item={v} />
          ))}
        </div>
      </div>
    </div>
  );
}

function VideoCard({ item }) {
  const [hover, setHover] = useState(false);
  const videoRef = useRef(null);

  const handleMouseEnter = async () => {
    setHover(true);
    // try to play; wrapping in try/catch because some browsers block autoplay
    try {
      await videoRef.current?.play();
    } catch (e) {
      // ignore play failures (user gesture required in some contexts)
    }
  };

  const handleMouseLeave = () => {
    setHover(false);
    try {
      videoRef.current?.pause();
      videoRef.current && (videoRef.current.currentTime = 0);
    } catch (e) {}
  };

  // pick sources
  const av1 = item.preview_video?.mp4_av1;
  const mp4 = item.preview_video?.fallback_mp4;

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
      aria-label={item.title}
    >
      <div
        className="relative w-full overflow-hidden rounded-lg bg-gray-900/5"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Image (shows when not hovered) */}
        <img
          src={item.thumbnail?.src}
          srcSet={item.thumbnail?.srcset}
          alt={item.title}
          loading="lazy"
          className={`w-full h-44 md:h-40 object-cover transition-opacity duration-200 ease-in-out ${
            hover ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Video (on hover) - absolutely positioned to overlap image */}
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          poster={item.thumbnail?.src}
          className={`absolute inset-0 w-full h-44 md:h-40 object-cover rounded-lg transition-opacity duration-150 ease-in-out pointer-events-none ${
            hover ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Prefer AV1; supply type hints */}
          {av1 && <source src={av1} type="video/mp4" />}
          {mp4 && <source src={mp4} type="video/mp4" />}
          {/* fallback text */}
          Your browser does not support the preview video.
        </video>

        {/* Duration badge */}
        {item.duration && (
          <span className="absolute right-2 bottom-2 bg-black/70 text-white text-xs font-medium rounded px-2 py-1">
            {item.duration}
          </span>
        )}

        {/* Play overlay (visible on hover) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="opacity-0 group-hover:opacity-80 transition-opacity duration-200">
            <svg
              className="w-12 h-12 text-white drop-shadow-lg"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="11"
                stroke="currentColor"
                strokeWidth="1"
                className="opacity-70"
              />
              <path d="M10 8L16 12L10 16V8Z" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <h3 className="text-sm font-medium text-[#fff] line-clamp-2">
          {item.title}
        </h3>
        <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
          <span>{item.views}</span>
          <span>•</span>
          <span>{item.uploader?.name}</span>
        </div>
      </div>
    </a>
  );
}

// Example usage (commented):
//
// import VideoHoverPreview from './VideoHoverPreview_Tailwind.jsx'
// const videos = [ /* array like the object you provided */ ]
// <VideoHoverPreview videos={videos} />

/* Notes:
 - This file expects Tailwind CSS already configured in your project.
 - The component uses small responsive heights (h-44) — tweak as needed.
 - Because the video is layered on top of the image and pointer-events are disabled
   on the video, clicks go to the anchor so the preview doesn't block navigation.
 - If you want to open a modal/player on click instead of navigating, replace the anchor
   with a button/div and implement your modal logic.
*/
