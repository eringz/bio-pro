"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Nav from "../ui/Nav";
import MobileNav from "../ui/MobileNav";
import { usePathname } from "next/navigation";

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon  } from "@heroicons/react/24/outline";

const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Attendance ', href: '/'},
];

const menus = [
    {name: 'Admin Profile', href: '#'},
    {name: 'Settings', href: '#'},
    {name: 'Sign out', href: '#'}
]

function classNames(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(' ')
}




export default function Header() {
    const [time, setTime] = useState("");
    const pathname = usePathname();

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
            className="relative bg-gray-800  dark:bg-gray-800/50 dark:after:pointer-events-none dark:after:absolute dark:after:inset-x-0 dark:after:bottom-0 dark:after:h-px dark:after:bg-white/10"
        >
            <div className="mx-auto max-w-screen px-2 sm:px-6 lg:px-10">
                <div className="relative flex h-20 items-center justify-between">
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
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex shrink-0 items-center">
                            <Link href="/">
                                <img
                                    alt="Your Company"
                                    src="/bio-pro.png"
                                    className="h-16 w-16 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 object-contain"
                                />
                            </Link>
                            
                        </div>
                        <div className="hidden  sm:ml-3  sm:block">
                            <div className="flex items-center h-14 space-x-4 ">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`${item.href === pathname ? 'bg-gray-900 text-white dark:bg-gray-950/50' : 'text-gray-300 hover:bg-white/5 hover:text-white'}  rounded-md px-4 py-2 text-base font-medium flex items-center h-full `}

                                    >
                                        {item.name} 
                                    </Link>
                                ))}
                                </div>
                            </div>
                        </div>
                    <div className="absolute gap-4 inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <span className="absolute p-2 text-xl -ml-39.5 text-white" >{time}</span>
                        <button
                            type="button"
                            className="relative rounded-full p-1 text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500 dark:hover:text-white"
                        >
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">View notification</span>
                            <BellIcon aria-hidden="true" className="size-9" />
                        </button>
                        {/** Dropdown */}
                        <Menu as="div" className="relative ml-3" >
                            <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" >
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only" >Open user menu</span>
                                <img  
                                    alt="avatar"
                                    src="/ron-ngayon.png"
                                    className="size-12 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
                                />
                            </MenuButton>
                            <MenuItems 
                                transition
                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10" 
                            >
                                {menus.map(({name, href}, index) => {
                                    return (
                                        <MenuItem>
                                            <Link
                                                key={index}
                                                href={href}
                                                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden dark:text-gray-300 dark:data-focus-bg:bg-white/5"
                                            >
                                                {name}
                                            </Link>
                                        </MenuItem>
                                    )
                                })}
                                
                            </MenuItems>
                        </Menu>
                    </div>
                </div>
            </div>
            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3">
                    {navigation.map((item) => {
                        return (
                            <DisclosureButton
                                key={item.name}
                                as="a"
                                href={item.href}
                                className={`${item.href === pathname ? 'bg-gray-900 text-white dark:bg-gray-950/50' : 'text-gray-300 hover:bg-white/5 hover:text-white'}  rounded-md px-4 py-2 text-base font-medium flex items-center h-full `}
                            >
                                {item.name}
                            </DisclosureButton>
                        )
                    })}
                </div>
            </DisclosurePanel>
        </Disclosure>
    )
}