import Link from "next/link";
import { ReactNode } from "react";

interface Props {
	href: string;
	children: ReactNode;
}

// Hook to get the previous value of a prop.
const NavLink = ({ href, children }: Props) => {
	return (
		<Link href={href} className="transition hover:text-amber-500 dark:hover:text-amber-400">
			{children}
		</Link>
	);
};

export default NavLink;
