"use client";

import { useEffect, useState } from "react";
import FaceCapture from "@/components/features/FaceCapture";
import { verifyFace } from "@/lib/api/face";

export default function Home () {
  const [records, setRecords] = useState<any[]>([]);
  const [status, setStatus] = useState("");
  const [time, setTime] = useState("");




  const formatPHTime = (dateString: string): string => {
    return new Date(dateString + "Z")
      .toLocaleString("en-CA", {
        timeZone: "Asia/Manila",
        hour12: false,
      })
      .replace(",", "");
  };


  // Fetch attendance today
  const fetchRecords = async () => {
    try {
      const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
      const res = await fetch(`http://localhost:5000/attendances/date/${today}`);
      // const res = await fetch(`http://localhost:5000/attendances/date/2025-09-27`);
      console.log(res);
      if (!res.ok) throw new Error("Failed to fetch records");
      const data = await res.json();
      setRecords(data);
    } catch (err) {
      console.error("❌ Error fetching records:", err);
    }
  };

  useEffect(() => {
    fetchRecords();

    const updateClock = () => {
      const now = new Date();
      const time_options: Intl.DateTimeFormatOptions = {
        timeStyle: "medium",
        timeZone: "Asia/Manila"
      }
      setTime(now.toLocaleTimeString("en-Ph", time_options));
    };

    updateClock();

    const interval = setInterval(updateClock, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Face Template Callback
  const handleCapture = async (faceData: string) => {
    console.log("Captured face data:", faceData.substring(0, 50));

    const result = await verifyFace(faceData);
    await fetchRecords();  

    if (result) {
      console.log("Face Verification result:", result);
    } else {
      console.error("Verificaion failed or no connection.");
    }

  }

  const today = new Date();
  const week_options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
  }; 
  const date_options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'Asia/Manila', // <- dito
  }; 

  
  const dayName = today.toLocaleDateString('en-PH', week_options);
  const dateString = today.toLocaleDateString('en-PH', date_options); // YYYY-MM-DD


  return (
    <main className="flex flex-cols gap-12 justify-between  min-w-screen p-8 space-y-8">
      {/* Face Capture */}
      <div className="bg-white  my-4 rounded-2xl shadow-lg hover:shadow-xl transition">
        {time && <p className="my-4 text-lg text-center">{time}</p>}
        <FaceCapture size={700} onCapture={handleCapture} />
        {status && <p className="mt-4 text-lg text-center">{status}</p>}
      </div>

      {/* Attendance Announce Section */}
      <div className="w-full max-w-4xl mx-auto bg-white p-6 my-4 rounded-2xl shadow-lg hover:shadow-xl transition">
        <h2 className="text-xl text-[#006D5A] font-bold mb-4">Attendance Records - {dateString} ({dayName}) </h2>

        {records.length === 0 ? (
          <p className="text-gray-500">No attendance yet.</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-200 rounded shadow-xl">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-2 px-4 text-left">ID</th>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Time</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r, i) => (
                <tr key={i} className={`${(i % 2 === 0) ? 'bg-gray-200' : '' } border-b hover:bg-gray-50`}>
                  <td className="py-2 px-4">{r.id}</td>
                  <td className="py-2 px-4">{r.first_name} {r.last_name}</td>
                <td className={`${(r.status_name === "Time In") ? 'text-[#006D5A]' : 'text-[#4C0000]'} "py-2 px-4"`}>{r.status_name}</td>
                  <td className="py-2 px-4">{new Date(r.datetime).toLocaleTimeString("en-PH", {timeZone: "Asia/Manila", hour: "numeric", minute: "numeric", second: "numeric", hour12: true})}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}