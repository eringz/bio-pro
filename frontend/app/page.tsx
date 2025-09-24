"use client";

import { useRef, useState } from "react";

export default function Home() {

  const videoRef = useRef<HTMLVideoElement>(null);
  const [captured, setCaptured] = useState<string | null>(null);

  const startCamera =  async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }

  const captureImage = () => {
    const canvas = document.createElement("canvas");

    if (!videoRef.current) return;

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0);
      const dataUrl = canvas.toDataURL("image/png");
      setCaptured(dataUrl);


      // Send to Backend
      fetch("http://localhost:5000/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ image: dataUrl }),
      });
    }


  }

  return (
    <div className="p-4">
      <video 
        ref={videoRef}
        autoPlay
        className="rounded-xl border"
      />

      <div className="mt-4 flex gap-2">
        <button
          onClick={startCamera}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Start Camera
        </button>
        <button
          onClick={captureImage}
          className="px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          Capture & Check-in
        </button>
      </div>
      {captured && (
        <img 
          src={captured}
          alt="captured"
          className="mt-4 rounded-lg border"
        />
      )}
    </div>
  );
}
