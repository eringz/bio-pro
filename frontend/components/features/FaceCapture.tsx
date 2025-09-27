"use client";

import { useRef,  useEffect } from "react";

interface Props {
    size?: number;
    onCapture: (faceTemplate: string) => void;
}

export default function FaceCapture({ size, onCapture } : Props) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    useEffect(() => {

        // Start Camera
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    await videoRef.current.play();
                }

            } catch (err) {
                console.error("Camera error: ", err);
            }
        };

        startCamera();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
                tracks.forEach((track) => track.stop());
            }
        }

    }, []);


    const captureFace = () => {
        if (!videoRef.current || !canvasRef.current) return;

        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;

        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const faceData = canvasRef.current.toDataURL("image/png");
        onCapture(faceData);
    };


    return (
        <div
            className="flex flex-col items-center gap-4"
        >
            <video 
                ref={videoRef}
                autoPlay
                muted
                width={size}
                height={size}
                className="rounded border shadow"
            />
            <canvas 
                ref={canvasRef}
                // width={720}
                // height={720}
                className="hidden"
            />
            <div className="flex gap-2">
                <button
                    onClick={captureFace}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg shadow"
                >
                    Capture Face
                </button>
            </div>
        </div>
    )
} 

