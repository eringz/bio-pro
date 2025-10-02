"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Nav from "../ui/Nav";
import MobileNav from "../ui/MobileNav";

export default function Header() {
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();

            setTime(now.toLocaleTimeString("en-PH", {
                timeStyle: "medium",
                timeZone: "Asia/Manila",
                hour12: false,
            }))
        };

        updateClock();

        const interval = setInterval(updateClock, 1000);

        return () => clearInterval(interval);

    });

    return (
        <header className="py-2 xl:py-2">
            <div className="container mx-auto flex justify-between items-center">
                <Link 
                    href="/"
                    className="text-3xl font-bold text-[#04246B]"    
                >
                    <Image 
                        src="/bio-pro.png"
                        alt="Bio Pro Logo"
                        width={60}
                        height={60}
                        className="rounded-lg inline mr-8"
                        priority
                    />
                    {time}
                </Link>

                <div className="hidden xl:flex items-center">
                    <Nav />
                </div>   

                <div className="xl:hidden">
                    <MobileNav />
                </div>             
            </div>
        </header>
    )
}