"use client"

import { useState, useEffect } from "react";


export default function Header ()
{
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");

    

    useEffect(() => {
        const updateDate = () => {
            const today = new Date();
            const options: Intl.DateTimeFormatOptions = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }

            setDate(today.toLocaleDateString("en-PH", options));
        }

        const interval = setInterval(updateDate, 1000);

        return () => clearInterval(interval)
    }, [])

    return (
        <header>
            <nav className="flex justify-between px-20 bg-[#002F61] backdrop-blur-lg border border-b-white/20">
                <span
                    className="my-3 text-white/50 text-lg"
                >
                    {/* {date} */} Bio Pro
                </span>
                <span
                    className="my-3 text-white/50 text-lg ml-12"
                >
                    {date}
                </span>
                <button
                    onClick={() => {
                        window.open(
                            "/admin",
                            "__blank", 
                            "popup=yes, width=1280, height=900", 
                        )
                    }}
                    className="bg-transparent px-5 py-2 m-2 rounded-lg border text-white/75 border-none"
                >
                    BMS
                </button>
            </nav>
        </header>
    )
}