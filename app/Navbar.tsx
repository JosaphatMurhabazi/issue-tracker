'use client'
import React from 'react'
import {usePathname} from "next/navigation";
import Link from "next/link";
import { FaBug } from "react-icons/fa";
import classNames from "classnames";
import {useSession} from "next-auth/react";
import {Box, Container, Flex, DropdownMenu, Avatar, Text} from "@radix-ui/themes";
import {Skeleton} from "@/app/components";

const Navbar = () => {

    return (
        <nav className='border-b mb-5 px-5 py-3'>
            <Container>
                <Flex justify='between'>
                    <Flex align='center' gap='3'>
                        <Link href="/"><FaBug/></Link>
                        <NavLinks/>
                    </Flex>
                    <AuthStatus/>
                </Flex>
            </Container>

        </nav>
    )
}

const NavLinks =()=>{
    const currentPath = usePathname();
    const navLink:string ='text-zinc-500 hover:text-zinc-800 transition-colors'

    const links = [
        {label: "Dashboard", href: "/" },
        {label: "Issues", href: "/issues/list"},
    ]

    return (
        <ul className='flex space-x-6'>
            {links.map(link =>
                <li key={link.href}>
                    <Link
                    className={`${navLink} ${link.href === currentPath ? 'text-zinc-900' : ''}`}
                    href={link.href}>
                    {link.label}
                </Link></li>)}
        </ul>
    )
}

const AuthStatus =()=>{
    const {status,data:session} = useSession()

    if(status==='loading') return <Skeleton width='3rem' height='1.1rem' />;

    if(status==='unauthenticated')
    return <Link href='/api/auth/signin' >Login</Link>;

    return (
        <Box>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Avatar src={session!.user!.image!} fallback="?" size='2' radius='full' className='cursor-pointer' referrerPolicy='no-referrer'/>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Label>
                        <Text size='2'>{session!.user!.email}</Text>
                    </DropdownMenu.Label>
                    <DropdownMenu.Item>
                        <Link href='/api/auth/signout'>Log out</Link>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </Box>
    )
}

export default Navbar
