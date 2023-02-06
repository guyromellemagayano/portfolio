import clsx from "clsx";

/**
 * @description Render the social link
 * @param {Object} props
 * @returns {JSX} Social link
 */
const SocialLink = (props) => {
	const { icon: Icon, url, ariaLabel, showLabel = false } = props;

	return (
		<a
			className={clsx(
				"group -m-1 p-1",
				showLabel &&
					"flex text-sm font-medium text-zinc-800 transition hover:text-red-500 dark:text-zinc-200 dark:hover:text-red-500"
			)}
			href={url || "#"}
			aria-label={ariaLabel}
			target="_blank"
		>
			<Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
			{showLabel && <span class="ml-4">{ariaLabel}</span>}
		</a>
	);
};

export default SocialLink;
