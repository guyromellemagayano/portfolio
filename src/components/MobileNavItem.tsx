import { IMobileNavItemProps } from "@/interfaces/components";
import { Popover } from "@headlessui/react";
import Link from "next/link";

// Mobile navigation item component
const MobileNavItem = ({ href, children }: IMobileNavItemProps): JSX.Element => {
	return (
		<Popover.Button as={Link} href={href} className="block py-2">
			{children}
		</Popover.Button>
	);
};

export default MobileNavItem;
