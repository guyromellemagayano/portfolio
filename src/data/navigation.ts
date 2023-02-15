import PagesData from "@/data/pages";
import { INavigationData } from "types";

const NavigationData = (): INavigationData => {
	let menu = [];

	// Destructure the data from the PagesData function
	const { pages } = PagesData();

	// Add the pages to the menu
	pages.filter((item) => item.title !== "Home").map((item) => menu.push(item));

	const copyright = {
		year: new Date().getFullYear(),
		text: "Guy Romelle Magayano. All rights reserved."
	};

	return {
		menu,
		copyright
	};
};

export default NavigationData;
