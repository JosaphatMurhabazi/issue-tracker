import { Link as RadixLink } from "@radix-ui/themes";
import NextLink from "next/link";

interface Props {
    href: string;
    children: string;
}

const Link = ({ href, children }: Props) => {
    return (
        <NextLink href={href} className='link'>
                {children}
        </NextLink>
    );
};

export default Link;