"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Nav from "../ui/Nav";
import MobileNav from "../ui/MobileNav";

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItems } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon  } from "@heroicons/react/24/outline";

const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Team', href: '#', current: true },
    { name: 'Calendar', href: '#', current: false },
];


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

    function classNames(...classes: (string | undefined | null | false)[]): string {
        return classes.filter(Boolean).join(' ')
    }

    return (
        // <header className="py-2 xl:py-2">
        //     <div className="container mx-auto flex justify-between xs:justify-around items-center">
        //         <Link 
        //             href="/"
        //             className="text-3xl font-bold text-[#04246B]"    
        //         >
        //             <Image 
        //                 src="/bio-pro.png"
        //                 alt="Bio Pro Logo"
        //                 width={60}
        //                 height={60}
        //                 className="rounded-lg inline mr-8"
        //                 priority
        //             />
        //             {time}
        //         </Link>

        //         <div className="hidden xl:flex items-center">
        //             <Nav />
        //         </div>   

        //         <div className="xl:hidden">
        //             <MobileNav />
        //         </div>             
        //     </div>
        // </header>
        <Disclosure
            as="nav"
            className="relative bg-gray-800 dark:bg-gray-800/50 dark:after:pointer-events-none dark:after:absolute dark:after:inset-x-0 dark:after:bottom-0 dark:after:h-px dark:after:bg-white/10"
        >
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex item-center sm:hidden">
                        {/** Mobile Nav */}
                        <DisclosureButton 
                            className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hove:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500"
                        >
                            <span className="absolute -inset-0.5"/>
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-cente r sm:items-stretch sm:justify-start" >
                        <div className="flex shrink-0 items-center" >
                            <img 
                                alt="Bio Pro"
                                src="/bio-pro.png"
                                className="h-8 w-auto"
                            />
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {navigation.map((item) => {
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            aria-current={item.current ? 'page' : undefined }
                                            className={classNames(
                                                item.current
                                                ? 'bg-gray-900 text-white dark:bg-gray-950/50'
                                                : 'text-gray-300 hover:bg-white/5 hover:text-white',
                                                'rounded-md px-3 py-2 text-sm font-medium'
                                            )}
                                        >
                                            {item.name}
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button
                            type="button"
                            className="relative rounded-full p-1 text-gray-400 focus:outline-2 focus:outline-offset-2 "
                        >

                        </button>
                    </div>
                </div>
            </div>
        </Disclosure>
    )
}