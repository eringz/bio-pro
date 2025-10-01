import { IconType } from 'react-icons';
import { FaHome, FaFingerprint, FaIdCard, FaUserCircle  } from 'react-icons/fa';
import { GiArchiveRegister } from "react-icons/gi";
import { IoNotifications } from "react-icons/io5";
import { IoOptionsOutline } from "react-icons/io5";
import { MdFace } from "react-icons/md";
import { FiLogIn } from "react-icons/fi";
import { GrUserAdmin } from "react-icons/gr";





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
        name: "options",
        path: "/options",
        icon: IoOptionsOutline,
    },
    
];


export const options = [
    {
        label: "Fingerprint",
        action: "fingerprint",
        icon: FaFingerprint,
    },
    {
        label: "Face Recognition",
        action: "face",
        icon: MdFace,
    },
    {
        label: "RFID",
        action: "rfid",
        icon: FaIdCard,
    },
    {
        label: "Log in",
        action: "login",
        icon: FiLogIn,
    },
    
];

// interface people {
//     id: number;
//     role: string;
//     avatar: string;
// }

export const people = [
    {
        id: 1,
        role: 'admin',
        avatar: './admin.png',
    },
    {
        id: 2,
        role: 'employee',
        avatar: './user.png',
    }
];