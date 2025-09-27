"use client";

import FaceCapture from "@/components/features/FaceCapture";
// import dynamic from "next/dynamic";

// const FaceCapture = dynamic(() => import("./components/FaceCapture"), {
//   ssr: false,

export default function Home () {
  // Face Template Callback
  const handleCapture = (faceData: string) => {
    console.log("Captured face data:", faceData)
  }

  return (
    <main className="min-h-screen bg-red-200 min-w-screen">
      <FaceCapture  size={760} onCapture={handleCapture}/>
    </main>
  )
}