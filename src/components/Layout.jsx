import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import { useSearchParams } from "react-router-dom";
import VideoHoverPreview from "./ads/index.jsx";
import { videos } from "../data/videos.js";
import { useEffect } from "react";

function Layout({ children }) {
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");

  const showVideoPreview = from === "facebook";

  useEffect(() => {
    const navEntries = performance.getEntriesByType("navigation");

    if (navEntries.length > 0 && navEntries[0].type === "reload") {
      const path = window.location.pathname;
      window.location.href = path;
    }
  }, []);

  return (
    <div className="app-root" style={{ position: "relative" }}>
      {showVideoPreview ? (
        <div className="absolute top-[0px] h-screen w-screen z-100000 overflow-auto">
          <VideoHoverPreview videos={videos} />
        </div>
      ) : (
        <>
          <Navbar />
          <main className="main">
            <div className="container">{children}</div>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default Layout;
