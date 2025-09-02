'use client'
import React from 'react'
import {usePathname} from "next/navigation";
import Link from "next/link";
import { FaBug } from "react-icons/fa";
import classNames from "classnames";
import {useSession} from "next-auth/react";
import {Box, Container, Flex, DropdownMenu, Avatar, Text} from "@radix-ui/themes";

const Navbar = () => {
    const currentPath = usePathname()
    const {status,data:session} = useSession()

    const links = [
        {label: "Dashboard", href: "/" },
        {label: "Issues", href: "/issues/list"},
    ]

    return (
        <nav className='border-b mb-5 px-5 py-3'>
            <Container>
                <Flex justify='between'>
                    <Flex align='center' gap='3'>
                        <Link href="/"><FaBug/></Link>
                        <ul className='flex space-x-6'>
                            {links.map(link =>
                                <li key={link.href}><Link  href={link.href} className={classNames({
                                    'text-zinc-900':link.href===currentPath,
                                    'text-zin-300':link.href!==currentPath,
                                    'hover:text-zin-800 transition-colors':true
                                })}>{link.label}</Link></li>)}
                        </ul>
                    </Flex>
                    <Box>
                        <Box>
                            {status==="authenticated" && (
                                <DropdownMenu.Root>
                                    <DropdownMenu.Trigger>
                                        <Avatar src={session.user!.image!} fallback="?" size='2' radius='full' className='cursor-pointer' referrerPolicy='no-referrer'/>
                                    </DropdownMenu.Trigger>
                                    <DropdownMenu.Content>
                                        <DropdownMenu.Label>
                                            <Text size='2'>{session.user!.email}</Text>
                                        </DropdownMenu.Label>
                                        <DropdownMenu.Item>
                                            <Link href='/api/auth/signout'>Log out</Link>
                                        </DropdownMenu.Item>
                                    </DropdownMenu.Content>
                                </DropdownMenu.Root>
                            )}
                            {status==="unauthenticated" && (
                                <Link href='/api/auth/signin'>Login</Link>
                            )}
                        </Box>
                    </Box>
                </Flex>
            </Container>

        </nav>
    )
}
export default Navbar
