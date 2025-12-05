import { useEffect, useState } from "react";

export default function VideoThumbnail({ videoUrl }: { videoUrl: string }) {
  // const [thumb, setThumb] = useState<string | null>(null);

  // useEffect(() => {
  //   const video = document.createElement("video");
  //   video.src = videoUrl;
  //   video.muted = true;
  //   video.currentTime = 1;
  //   video.playsInline = true;

  //   const handleLoaded = () => {
  //     video.currentTime = 0.1;
  //   };

  //   const handler = () => {
  //     const canvas = document.createElement("canvas");
  //     canvas.width = video.videoWidth;
  //     canvas.height = video.videoHeight;
  //     const ctx = canvas.getContext("2d");

  //     if (ctx) {
  //       ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  //       setThumb(canvas.toDataURL("image/jpeg"));
  //     }
  //   };

  //   video.addEventListener("loadeddata", handleLoaded);
  //   video.addEventListener("seeked", handler);

  //   return () => {
  //     video?.removeEventListener("loadeddata", handleLoaded);
  //     video?.removeEventListener("seeked", handler);
  //   };
  // }, [videoUrl]);

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          background: "black",
          opacity: 0.2,
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 45,
          height: 45,
          borderRadius: "50%",
          backgroundColor: "rgb(255, 204, 38)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <i className="fa-solid fa-play"></i>
      </div>

      <img src={videoUrl} alt="video thumbnail" />

      {/* {thumb ? (
        <img src={thumb} alt="video thumbnail" />
      ) : (
        <div
          style={{
            background: "rgb(247, 247, 247)",
            aspectRatio: "1/1",
          }}
        />
      )} */}
    </div>
  );
}
