import { IPagesData } from "types";

const PagesData = (): IPagesData => {
	const pages = [
		{
			title: "Home",
			link: "/"
		},
		{
			title: "About",
			link: "/about"
		},
		{
			title: "Skills",
			link: "/skills"
		},
		{
			title: "Projects",
			link: "/projects"
		},
		{
			title: "Articles",
			link: "/articles"
		},
		{
			title: "Uses",
			link: "/uses"
		}
	];

	const articles = [];

	const projects = [];

	return { pages, articles, projects };
};

export default PagesData;
