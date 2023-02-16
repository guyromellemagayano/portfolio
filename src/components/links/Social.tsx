import { ISocialLinkProps } from "@/interfaces/components";
import clsx from "clsx";

// Social link component
const SocialLink = function SocialLink({
	icon: Icon,
	url,
	ariaLabel,
	showLabel = false
}: ISocialLinkProps): JSX.Element {
	return (
		<a
			className={clsx(
				"group -m-1 p-1",
				showLabel &&
					"flex text-sm font-medium text-zinc-800 transition hover:text-amber-500 dark:text-zinc-200 dark:hover:text-amber-500"
			)}
			href={url || "#"}
			aria-label={ariaLabel}
			target="_blank"
			rel="noreferrer"
		>
			<Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
			{showLabel && <span className="ml-4">{ariaLabel}</span>}
		</a>
	);
};

export default SocialLink;
