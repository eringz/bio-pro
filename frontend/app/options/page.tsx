"use client"

import { options } from "@/data";

export default function OptionsPage() {

    
    return (
        <main className="flex items-center my-96 min-w-screen">

            <div className="flex flex-cols justify-around items-center w-full">
                {options.map(({label, action, icon}) => {
                    const Icon = icon;
                    return (
                        <div key={action} className="relative group">
                            <button
                                className="w-40 h-40 rounded-full bg-white shadow-lg flex items-center justify-center text-[#04246B] font-semibold hover:bg-gray-200 transition"
                                data-tooltip-target="default-tooltip"
                            >
                                {Icon && <Icon size={60} />}
                            </button>
                            <div
                                className="absolute bottom-full px-4 py-2 mb-3 opacity-0 group-hover:opacity-100 left-1/2 z-20  -translate-x-1/2 whitespace-nowrap border border-gray-300 rounded-lg bg-white text-xs text-[#04246B] font-medium transition-opacity duration-300 shadow-[0px_12px_30px_-4px_rgba(16,24,40,0.08);]"
                                role="tooltip" 
                            >
                                {label}
                            </div>
                        </div>
                        
                        
                    ) 
                })}
            </div>
            
        </main>
    )
}

//  className="w-40 h-40 rounded-full bg-white shadow-lg flex items-center justify-center text-lg font-semibold hover:bg-gray-200 transition"
// onClick={() => alert(`${label} selected!`)}