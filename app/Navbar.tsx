'use client'
import React from 'react'
import {usePathname} from "next/navigation";
import Link from "next/link";
import { FaBug } from "react-icons/fa";
import classNames from "classnames";

const Navbar = () => {
    const currentPath = usePathname()

    const links = [
        {label: "Dashboard", href: "/" },
        {label: "Issues", href: "/issues"},
    ]

    return (
        <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
            <Link href="/"><FaBug/></Link>
            <ul className='flex space-x-6'>
                {links.map(link =>
                    <Link key={link.href} href={link.href} className={classNames({
                        'text-zinc-900':link.href===currentPath,
                        'text-zin-300':link.href!==currentPath,
                        'hover:text-zin-800 transition-colors':true
                    })}>{link.label}</Link>)}
            </ul>
        </nav>
    )
}
export default Navbar
