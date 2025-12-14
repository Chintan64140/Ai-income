import React, { useState } from "react";

export default function VideoExtractor() {
  const [inputHTML, setInputHTML] = useState("");
  const [output, setOutput] = useState([]);

  // ------------------ PARSER FOR SINGLE ITEM ------------------
  const parseVideoThumb = (element) => {
    if (!element) return null;

    const anchor = element.querySelector("a.video-thumb__image-container");

    return {
      video_id: element.getAttribute("data-video-id"),
      video_type: element.getAttribute("data-video-type"),

      title: anchor?.getAttribute("aria-label") || null,
      url: anchor?.getAttribute("href") || null,

      preview_video: {
        mp4_av1: anchor?.getAttribute("data-previewvideo") || null,
        fallback_mp4: anchor?.getAttribute("data-previewvideo-fallback") || null,
      },

      thumbnail: {
        src: anchor?.querySelector("img")?.getAttribute("src") || null,
        srcset: anchor?.querySelector("img")?.getAttribute("srcset") || null,
      },

      sprite_image:
        element.querySelector(".thumb-image-container__sprite")?.getAttribute("data-sprite") ||
        null,

      duration:
        element.querySelector('[data-role="video-duration"] div')?.textContent?.trim() || null,

      uploader: {
        name: element.querySelector(".video-uploader__name")?.textContent?.trim() || null,
        profile_url:
          element.querySelector(".video-uploader__name")?.getAttribute("href") || null,
        avatar:
          element.querySelector(".video-uploader-logo")?.getAttribute("data-background-image") ||
          null,
      },

      views: element.querySelector(".video-thumb-views")?.textContent?.trim() || null,
    };
  };

  // ------------------ PARSER FOR MULTIPLE ITEMS ------------------
  const parseVideoThumbList = (doc) => {
    const items = doc.querySelectorAll(".thumb-list__item");
    const results = [];

    items.forEach((item) => {
      const json = parseVideoThumb(item);
      if (json) results.push(json);
    });

    return results;
  };

  // ------------------ MAIN EXTRACT FUNCTION ------------------
  const extractData = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(inputHTML, "text/html");

    const data = parseVideoThumbList(doc);

    setOutput(data);
    console.log("Extracted Array:", data);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2>HTML Video Data Extractor (React)</h2>

      <textarea
        value={inputHTML}
        onChange={(e) => setInputHTML(e.target.value)}
        placeholder="Paste your HTML here..."
        style={{ width: "100%", height: "250px", padding: "10px", fontSize: "14px" }}
      />

      <button
        onClick={extractData}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Extract
      </button>

      <h3 style={{ marginTop: "20px" }}>Output JSON:</h3>

      <pre
        style={{
          background: "#222",
          color: "#0f0",
          padding: "15px",
          borderRadius: "5px",
          whiteSpace: "pre-wrap",
        }}
      >
        {output.length > 0 ? JSON.stringify(output, null, 2) : "No data yet"}
      </pre>
    </div>
  );
}
