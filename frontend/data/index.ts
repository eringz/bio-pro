import { IconType } from 'react-icons';
import { FaHome } from 'react-icons/fa';
import { GiArchiveRegister } from "react-icons/gi";
import { IoNotifications } from "react-icons/io5";


interface NavLink {
    name: string;
    path: string;
    icons?: IconType;
}

export const navLinks = [
    {
        name: "home",
        path: "/",
        icon: FaHome,
    },
    {
        name: "register",
        path: "/register",
        icon: GiArchiveRegister,
    },
    {
        name: "notification",
        path: "/notification",
        icon: IoNotifications,
    },
    
];