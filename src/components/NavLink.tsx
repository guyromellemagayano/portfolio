import { INavLinkProps } from "@/interfaces/components";
import Link from "next/link";

// Navigation link component
const NavLink = ({ href, children }: INavLinkProps): JSX.Element => {
	return (
		<Link href={href} className="transition hover:text-amber-500 dark:hover:text-amber-400">
			{children}
		</Link>
	);
};

export default NavLink;
