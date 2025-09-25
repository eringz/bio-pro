import FaceCapture from "@/components/features/FaceCapture";
// import dynamic from "next/dynamic";

// const FaceCapture = dynamic(() => import("./components/FaceCapture"), {
//   ssr: false,
// });

export default function Home () {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <FaceCapture  userId={1} />
    </main>
  )
}