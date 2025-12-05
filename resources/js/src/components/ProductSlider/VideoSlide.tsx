import { useEffect, useRef, useState } from "react";

export default function VideoSlide({
  path,
  poster,
}: {
  path: string;
  poster: string;
}) {
  const ref = useRef<HTMLVideoElement>();
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const onPlay = () => setPaused(false);
    const onPause = () => setPaused(true);

    element.addEventListener("play", onPlay);
    element.addEventListener("pause", onPause);

    return () => {
      if (!element) return;

      element.removeEventListener("play", onPlay);
      element.removeEventListener("pause", onPause);
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    >
      <video
        ref={ref}
        playsInline
        controls
        autoPlay={false}
        muted
        poster={poster}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source src={path} />
      </video>

      {paused && (
        <div
          onClick={() => ref.current.play()}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 80,
            height: 80,
            borderRadius: "50%",
            backgroundColor: "rgb(255, 204, 38)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 25,
          }}
        >
          <i className="fa-solid fa-play"></i>
        </div>
      )}
    </div>
  );
}
