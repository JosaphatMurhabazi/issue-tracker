'use client'
import React from 'react'
import {usePathname} from "next/navigation";
import Link from "next/link";
import { FaBug } from "react-icons/fa";
import classNames from "classnames";
import {useSession} from "next-auth/react";
import {Box} from "@radix-ui/themes";

const Navbar = () => {
    const currentPath = usePathname()
    const {status,data:session} = useSession()

    const links = [
        {label: "Dashboard", href: "/" },
        {label: "Issues", href: "/issues/list"},
    ]

    return (
        <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
            <Link href="/"><FaBug/></Link>
            <ul className='flex space-x-6'>
                {links.map(link =>
                    <li key={link.href}><Link  href={link.href} className={classNames({
                        'text-zinc-900':link.href===currentPath,
                        'text-zin-300':link.href!==currentPath,
                        'hover:text-zin-800 transition-colors':true
                    })}>{link.label}</Link></li>)}
            </ul>
            <Box>
                {status==="authenticated" && (
                    <Link href='/api/auth/signout'>Log out</Link>
                )}
                {status==="unauthenticated" && (
                    <Link href='/api/auth/signin'>Login</Link>
                )}
            </Box>
        </nav>
    )
}
export default Navbar
