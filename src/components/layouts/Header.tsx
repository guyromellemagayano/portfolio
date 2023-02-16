import ToggleDarkMode from "@/components/buttons/ToggleDarkMode";
import Container from "@/components/Container";
import DesktopNavigation from "@/components/DesktopNavigation";
import MobileNavigation from "@/components/MobileNavigation";
import clamp from "@/utils/clamp";
import { useRouter } from "next/router";
import React from "react";
import Avatar from "../Avatar";
import AvatarContainer from "../AvatarContainer";

// Header component
const Header = () => {
	let isHomePage = useRouter().pathname === "/";

	let headerRef = React.useRef<any | null>();
	let avatarRef = React.useRef<any | null>();
	let isInitial = React.useRef<boolean>(true);

	React.useEffect(() => {
		let downDelay = avatarRef.current?.offsetTop ?? 0;
		let upDelay = 64;

		const setProperty = (property: string, value: string) => {
			document.documentElement.style.setProperty(property, value);
		};

		const removeProperty = (property: string) => {
			document.documentElement.style.removeProperty(property);
		};

		const updateHeaderStyles = () => {
			let { top, height } = headerRef.current.getBoundingClientRect();
			let scrollY = clamp({ number: window.scrollY, a: 0, b: document.body.scrollHeight - window.innerHeight });

			if (isInitial.current) {
				setProperty("--header-position", "sticky");
			}

			setProperty("--content-offset", `${downDelay}px`);

			if (isInitial.current || scrollY < downDelay) {
				setProperty("--header-height", `${downDelay + height}px`);
				setProperty("--header-mb", `${-downDelay}px`);
			} else if (top + height < -upDelay) {
				let offset = Math.max(height, scrollY - upDelay);
				setProperty("--header-height", `${offset}px`);
				setProperty("--header-mb", `${height - offset}px`);
			} else if (top === 0) {
				setProperty("--header-height", `${scrollY + height}px`);
				setProperty("--header-mb", `${-scrollY}px`);
			}

			if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
				setProperty("--header-inner-position", "fixed");
				removeProperty("--header-top");
				removeProperty("--avatar-top");
			} else {
				removeProperty("--header-inner-position");
				setProperty("--header-top", "0px");
				setProperty("--avatar-top", "0px");
			}
		};

		function updateAvatarStyles() {
			if (!isHomePage) {
				return;
			}

			let fromScale = 1;
			let toScale = 36 / 64;
			let fromX = 0;
			let toX = 2 / 16;

			let scrollY = downDelay - window.scrollY;

			let scale = (scrollY * (fromScale - toScale)) / downDelay + toScale;
			scale = clamp({ number: scale, a: fromScale, b: toScale });

			let x = (scrollY * (fromX - toX)) / downDelay + toX;
			x = clamp({ number: x, a: fromX, b: toX });

			setProperty("--avatar-image-transform", `translate3d(${x}rem, 0, 0) scale(${scale})`);

			let borderScale = 1 / (toScale / scale);
			let borderX = (-toX + x) * borderScale;
			let borderTransform = `translate3d(${borderX}rem, 0, 0) scale(${borderScale})`;

			setProperty("--avatar-border-transform", borderTransform);
			setProperty("--avatar-border-opacity", scale === toScale ? "1" : "0");
		}

		function updateStyles() {
			updateHeaderStyles();
			updateAvatarStyles();
			isInitial.current = false;
		}

		updateStyles();
		window.addEventListener("scroll", updateStyles, { passive: true });
		window.addEventListener("resize", updateStyles);

		return () => {
			window.removeEventListener("scroll", updateStyles, { passive: true });
			window.removeEventListener("resize", updateStyles);
		};
	}, [isHomePage]);

	return (
		<>
			<header
				className="pointer-events-none relative z-50 flex flex-col"
				style={{
					height: "var(--header-height)",
					marginBottom: "var(--header-mb)"
				}}
			>
				{isHomePage && (
					<>
						<div ref={avatarRef} className="order-last mt-[calc(theme(spacing.16)-theme(spacing.3))]" />
						<Container className="top-0 order-last -mb-3 pt-3" style={{ position: "var(--header-position)" }}>
							<div
								className="top-[var(--avatar-top,theme(spacing.3))] w-full"
								style={{ position: "var(--header-inner-position)" }}
							>
								<div className="relative">
									<AvatarContainer
										className="absolute left-0 top-3 origin-left transition-opacity"
										style={{
											opacity: "var(--avatar-border-opacity, 0)",
											transform: "var(--avatar-border-transform)"
										}}
									/>
									<Avatar
										large
										className="block h-16 w-16 origin-left"
										style={{ transform: "var(--avatar-image-transform)" }}
									/>
								</div>
							</div>
						</Container>
					</>
				)}
				<div ref={headerRef} className="top-0 z-10 h-16 pt-6" style={{ position: "var(--header-position)" }}>
					<Container
						className="top-[var(--header-top,theme(spacing.6))] w-full"
						style={{ position: "var(--header-inner-position)" }}
					>
						<div className="relative flex gap-4">
							<div className="flex flex-1">
								{!isHomePage && (
									<AvatarContainer>
										<Avatar />
									</AvatarContainer>
								)}
							</div>
							<div className="flex flex-1 justify-end md:justify-center">
								<MobileNavigation className="pointer-events-auto md:hidden" />
								<DesktopNavigation className="pointer-events-auto hidden md:block" />
							</div>
							<div className="flex justify-end md:flex-1">
								<div className="pointer-events-auto">
									<ToggleDarkMode />
								</div>
							</div>
						</div>
					</Container>
				</div>
			</header>

			{isHomePage && <div style={{ height: "var(--content-offset)" }} />}
		</>
	);
};

export default Header;
