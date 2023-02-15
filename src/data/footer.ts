const FooterData = () => {
	const menu = [
		{
			title: "About",
			link: "/about"
		},
		{
			title: "Projects",
			link: "/skills"
		},
		{
			title: "Skills",
			link: "/skills"
		},
		{
			title: "Uses",
			link: "/uses"
		}
	];

	const copyright = {
		year: new Date().getFullYear(),
		text: "Guy Romelle Magayano. All rights reserved."
	};

	return {
		menu,
		copyright
	};
};

export default FooterData;
