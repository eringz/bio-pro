"use client";

import { useEffect, useState } from "react";
import FaceCapture from "@/components/features/FaceCapture";
import { verifyFace } from "@/lib/api/face";
import { RxDownload } from "react-icons/rx";


interface AttendanceRecord {
  id: number;
  user_id: number;
  datetime: string;       // or Date, depende sa pag-parse mo
  device_no: number;
  status_id: number;
  face_id?: string;
  status_name: string;
  first_name: string;
  last_name: string;
}

export default function Home () {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);

  // Fetch attendance today
  const fetchRecords = async () => {
    try {
      const today = new Date().toLocaleDateString("en-CA", {timeZone: "Asia/Manila"}).split("T")[0]; // YYYY-MM-DD
      const res = await fetch(`https://bio-pro-9pht.onrender.com/attendances/date/${today}`);

      if (!res.ok) throw new Error("Failed to fetch records");
      const data = await res.json();
      setRecords(data);
    } catch (err) {
      console.error("❌ Error fetching records:", err);
    }
  };

  useEffect(() => {
    fetchRecords();

  }, []);

  // Face Template Callback
  const handleCapture = async (faceData: string) => {
    console.log("Captured face data:", faceData.substring(0, 50));

    const result = await verifyFace(faceData);
    await fetchRecords();  

    if (result) {
      console.log("Face Verification result:", result);
    } else {
      console.error("Verification failed or no connection.");
    }

  }

  const today = new Date();
  
  const dayName = today.toLocaleDateString('en-PH', {weekday: 'short'});
  const dateString = today.toLocaleDateString('en-PH', {year: 'numeric', month: 'short', day: 'numeric' }); // YYYY-MM-DD


  return (
    <main className="gtid grid-cols-2 gap-12 justify-between md:grid-cols-2 sm:grid-cols-1 ">
      {/* Face Capture */}
      <div className="flex justify-center p-12 max-h-fit shadow-lg hover:shadow-xl transition">
        <FaceCapture size={600} onCapture={handleCapture} />
      </div>

      {/* Attendance Announce Section */}
      <div className="w-full max-w-7xl mx-auto bg-white p-6 my-4 rounded-2xl shadow-lg hover:shadow-xl transition">
        <div className="flex justify-between items-center px-2 border">
          <h2 className="text-xl text-[#04246B] font-bold m-4 text-shadow-xs">{dateString} ({dayName}) </h2>
          <input
            type="text"
            placeholder="Search by name..."
            className="border rounded-md px-3  h-10 text-sm w-1/2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button className="text-[#04246B]">
            <RxDownload size={25} />
          </button>
        </div>
        {records.length === 0 ? (
          <p className="text-gray-500">No attendance yet.</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-200 rounded shadow-xl">
            <thead>
              <tr className="bg-gray-100 border-b tracking-widest">
                <th className="py-2 px-4 text-left">ID</th>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Time</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r, i) => (
                <tr key={i} className={`${(i % 2 === 0) ? 'bg-gray-200' : '' } border-b hover:bg-gray-50`}>
                  <td className="py-2 px-4">{i+1}</td>
                  <td className="py-2">{r.first_name} {r.last_name}</td>
                  <td className={`${(r.status_name === "Time In") ? 'text-[#006D5A]' : 'text-[#4C0000]'} px-5`}>{r.status_name}</td>
                  <td className="py-2 px-4">{new Date(r.datetime).toLocaleTimeString("en-PH", {timeStyle: "short", timeZone: "Asia/Manila", hour12: false})}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}