import Link from "next/link";
import Image from "next/image";
import Nav from "../ui/Nav";

export default function Header() {
    return (
        <header className="py-2 xl:py-2">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/">
                    <Image 
                        src="/bio-pro.png"
                        alt="Bio Pro Logo"
                        width={60}
                        height={60}
                        className="rounded-lg inline"
                        priority
                    />
                </Link>
                
                <div className="hidden xl:flex items-center">
                    <Nav />
                </div>

                
            </div>
        </header>
    )
}