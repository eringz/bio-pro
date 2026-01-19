"use client"

import { useRef, useEffect } from "react";
import { MdFace } from "react-icons/md";


interface Props {
    size?: number;
    onCapture: (facetemplate: string) => void
}

export default function FaceCard ({size, onCapture}: Props)
{
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const video = videoRef.current;

        if (!video) return;
        let stream: MediaStream;

        //starting camera
        const startCamera = async () => {
            try 
            {
                stream = await navigator.mediaDevices.getUserMedia({video: true});
                video.srcObject = stream;
            }
            catch (err)
            {
                console.error("Camera Error:", err);
            }

        }
        
        startCamera();

        return () => {
            if (stream) 
            {
                stream.getTracks().forEach(track => track.stop())
            }
        }
    },[])


    return (
        <div
            className="flex flex-col items-center gap-7 w-150 h-150 border-2 border-blue-950/35 rounded-lg backdrop-blur-md shadow-xl/40"
        >
            {/* <h2 className="m-15 text-white/55 text-2xl text-shadow-lg/30">Face</h2> */}
            
            <form 
                className="flex flex-col"
            >
                <h2 
                    className="p-6 mt-10 max-w-40 self-center bg-transparent border-2 border-blue-950/80 text-blue-950/80 text-2xl text-shadow-lg/30 rounded-full backdrop-blur-md shadow-lg/40">
                    <MdFace size="40"/>
                </h2>
                <div
                    className="flex justify-center items-center p-6 max-w-2xl max-h-2xl border-blue-950/35 rounded-md shadow-lg"
                >
                    <video 
                        ref={videoRef}
                        autoPlay
                        width={size}
                        height={size}
                        className="border-blue-950/35 rounded-lg shadow-lg/40"
                    />
                    <canvas 
                        ref={canvasRef}
                        className="hidden shadow"
                    />
                </div>

            </form>
        </div>
    )
}