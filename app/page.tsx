"use client"
import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";
import LoginCard from "@/components/cards/LoginCard";
import FaceCard  from "@/components/cards/FaceCard";





export default function Home() {
  const [activeCard, setActiveCard] = useState<CardType>("login")
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();

      setTime(now.toLocaleTimeString("en-PH", {
        timeStyle: "medium",
        timeZone: "Asia/Manila"
      }))  
    }

    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  type CardType = "login" | "face";
  const actions = {
    login: () => setActiveCard("login"),
    // fingerprint: () => setActiveCard("fingerprint"),
    face: () => setActiveCard("face")

  } as const;
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>)  => {
    const key = e.target.value as CardType
    actions[key]();
  }
  
  return (
    <main
      className="flex flex-col flex-1 items-center bg-linear-to-b  from-[#002F61]/98 via-[#002F61]/80 to-[#002F61]/99 overflow-hidden"
    >
      <h2 className="my-7 text-white/50 text-lg">{time}</h2>
      <select
        name="authMethod"
        onChange={handleChange}
        className="flex px-7 py-3 bg-blue-999 text-white/50 backdrop-blur-lg border-2 border-blue-950/55 text-lg text-shadow-md/30 shadow-lg/40 rounded-lg select-wrapper"
      >
        <option
          value="login"
          className="bg-blue-950"
        >
          Login
        </option>
        <option 
          value="face"
          className="bg-blue-950"
        >
          Face Log
        </option>
      </select>
      {/** Card */}
      <div
        className="flex flex-1 items-center justify-center"
      >
        {activeCard === "login" && <LoginCard />}
        {activeCard === "face" && <FaceCard />}
      </div>
    </main>
  );
}
