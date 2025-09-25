"use client";

import { useRef, useState } from "react";

export default function RegisterFace() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState("");

  // Start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (err) {
      console.error(err);
      setStatus("Camera not accessible");
    }
  };

  // Capture face and register
  const registerFace = async () => {
    if (!videoRef.current || !canvasRef.current) {
      setStatus("Camera not ready");
      return;
    }

    // Dynamically set canvas size to video
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

    const face_template = canvasRef.current.toDataURL("image/png");

    try {
      const res = await fetch("http://127.0.0.1:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "John Ronald Santos",        // replace with user input if needed
          email: "ron@biopro.com", // replace with user input
          role: "Developer",
          face_template
        })
      });

      console.log(`Register res: ${res}`);

      const data = await res.json();
      if (res.ok) {
        setStatus("User registered successfully!");
      } else {
        setStatus(data.error || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      setStatus("Server error");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-xl font-bold">Register Face</h1>

      <video
        ref={videoRef}
        autoPlay
        muted
        width={320}
        height={240}
        className="rounded border shadow"
      />

      <canvas ref={canvasRef} width={320} height={240} className="hidden" />

      <div className="flex gap-2 mt-2">
        <button
          onClick={startCamera}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow"
        >
          Start Camera
        </button>
        <button
          onClick={registerFace}
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow"
        >
          Capture & Register
        </button>
      </div>

      {status && <p className="mt-2 text-sm text-gray-700">{status}</p>}
    </div>
  );
}
