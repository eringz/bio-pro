"use client"
import { useState, useEffect } from "react";
import { User, ScanFace, Fingerprint } from "lucide-react"

export default function LoginCard ()
{   


    return (
        <div
            className="flex flex-col items-center gap-7 w-150 h-150 border-2 border-blue-950/35 rounded-lg backdrop-blur-md shadow-xl/40"
        >
            <h2 className="p-6 m-10 bg-transparent border-2 border-blue-950/80 text-blue-950/80 text-2xl text-shadow-lg/30 rounded-full backdrop-blur-md shadow-lg  /40"><User size="40"/></h2>
            
            <form 
                className="flex flex-col gap-7"
            >
                <label
                    className="w-full"
                >
                    <input 
                        type="text" 
                        name="username" 
                        id="username" 
                        placeholder="User Name" 
                        className="p-3 w-130 text-blue-950/150 outline-none border-b-2 border-blue-950/40 shadow-md/30"
                    />
                </label>
                <label>
                    <input 
                        name="password" 
                        type="password" 
                        id="password" 
                        placeholder="Password"
                        className="p-3 w-130 text-blue-950/150 outline-none border-b-2 border-blue-950/40 shadow-md/30" 
                    />
                </label>
                <button className="p-4 mt-5 bg-blue-900 text-white/30 rounded-lg shadow-xl/30 text-shadow-lg/30">Login</button>
            </form>
        </div>
    )
}