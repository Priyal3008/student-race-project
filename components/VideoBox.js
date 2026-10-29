import { YOUTUBE_ID } from "../lib/config";

// Shows a YouTube embed when YOUTUBE_ID is set in lib/config.js, otherwise a placeholder.
export default function VideoBox() {
  return (
    <div className="video">
      {YOUTUBE_ID ? (
        <iframe
          src={"https://www.youtube-nocookie.com/embed/" + YOUTUBE_ID}
          title="What students build in one day"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div className="video-ph">
          <div className="play" aria-hidden="true" />
          <p className="vt">Video placeholder</p>
          <p className="muted">A student builds a working AI project in one day.</p>
          <p className="muted tiny">Set YOUTUBE_ID in lib/config.js to show the real video.</p>
        </div>
      )}
    </div>
  );
}
