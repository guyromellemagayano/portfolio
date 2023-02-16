import avatarImage from "@/images/avatar.jpg";
import { IAvatarProps } from "@/interfaces/components";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

// Avatar component
const Avatar = ({ large = false, className, ...rest }: IAvatarProps & any): JSX.Element => {
	return (
		<Link href="/" aria-label="Home" className={clsx(className, "pointer-events-auto")} {...rest}>
			<Image
				src={avatarImage}
				alt=""
				sizes={large ? "4rem" : "2.25rem"}
				className={clsx("rounded-full bg-zinc-100 object-cover dark:bg-zinc-800", large ? "h-16 w-16" : "h-9 w-9")}
				priority
			/>
		</Link>
	);
};

export default Avatar;
