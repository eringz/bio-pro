"use client";

import FaceCapture from "@/components/features/FaceCapture";
import { verifyFace } from "@/lib/api/face";
// import dynamic from "next/dynamic";

// const FaceCapture = dynamic(() => import("./components/FaceCapture"), {
//   ssr: false,

export default function Home () {
  // Face Template Callback
  const handleCapture = async (faceData: string) => {
    console.log("Captured face data:", faceData.substring(0, 50));

    const result = await verifyFace(faceData);

    if (result) {
      console.log("Face Verification result:", result);
    } else {
      console.error("Verificaion failed or no connection.");
    }

  }

  return (
    <main className="min-h-screen min-w-screen">
      <div>
        <h2 className="text-xl font-bold mb-4">Capture Face</h2>
        <FaceCapture  size={480} onCapture={handleCapture}/>
      </div>

      
    </main>
  )
}