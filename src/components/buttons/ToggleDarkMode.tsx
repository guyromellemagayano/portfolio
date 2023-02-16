import MoonSvgIcon from "../icons/svg/Moon";
import SunSvgIcon from "../icons/svg/Sun";

// Button for toggling the dark and light modes
const ToggleDarkMode = () => {
	// Disable transitions temporarily to prevent the dark mode toggle from
	const disableTransitionsTemporarily = () => {
		document.documentElement.classList.add("[&_*]:!transition-none");
		window.setTimeout(() => {
			document.documentElement.classList.remove("[&_*]:!transition-none");
		}, 0);
	};

	// Toggle the dark and light modes
	const toggleMode = () => {
		disableTransitionsTemporarily();

		let darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		let isSystemDarkMode = darkModeMediaQuery.matches;
		let isDarkMode = document.documentElement.classList.toggle("dark");

		if (isDarkMode === isSystemDarkMode) {
			delete window.localStorage.isDarkMode;
		} else {
			window.localStorage.isDarkMode = isDarkMode;
		}
	};

	return (
		<button
			type="button"
			aria-label="Toggle dark mode"
			className="group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
			onClick={toggleMode}
		>
			<SunSvgIcon className="h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-amber-50 [@media(prefers-color-scheme:dark)]:stroke-amber-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-amber-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-amber-600" />
			<MoonSvgIcon className="hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400 [@media_not_(prefers-color-scheme:dark)]:fill-amber-400/10 [@media_not_(prefers-color-scheme:dark)]:stroke-amber-500" />
		</button>
	);
};

export default ToggleDarkMode;
