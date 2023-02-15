import Container from "@/components/Container";
import FooterData from "@/data/footer";
import NavLink from "../NavLink";

// Footer component
const Footer = () => {
	// Destructure the data from the FooterData function
	const { menu, copyright } = FooterData();

	return (
		<footer className="mt-32">
			<Container.Outer>
				<div className="border-t border-zinc-100 pt-10 pb-16 dark:border-zinc-700/40 relative mx-4 sm:mx-8 lg:mx-12">
					<Container.Inner>
						<div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
							<div className="flex gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
								{menu.map((item) => (
									<NavLink href={item.link}>{item.title}</NavLink>
								))}
							</div>
							<p className="text-sm text-zinc-400 dark:text-zinc-500">
								&copy; {copyright.year} {copyright.text}
							</p>
						</div>
					</Container.Inner>
				</div>
			</Container.Outer>
		</footer>
	);
};

export default Footer;
