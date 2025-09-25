"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/data";

export default function Nav() {
    const pathname = usePathname();

    return (
        <div className="flex gap-8">
            {navLinks.map(({ name, path, icon }, index) => {
                const Icon = icon;
                return <Link
                    key={index}
                    href={path}
                    className={`${path === pathname && "text-[#04246B] border-b-2 border-[#04246B"} capitalize font-medium hover:text-[#04246B] transition-all delay-500`}
                >
                        {Icon && <Icon size={30} />}                  
                    </Link>
            })}
        </div>
    )

    
}

