import { StaticImageData } from "next/image";
import { FunctionComponent } from "react";

// About page data
export interface IAboutData {
	meta: {
		title: string;
		description: string;
		keywords: string;
	};
	hero: {
		heading: string;
		description: string[];
	};
}

// Articles page data
export interface IArticlesData {
	meta: {
		title: string;
		description: string;
		keywords: string;
	};
	hero: {
		heading: string;
		description: string[];
	};
}

// Home page data
export interface IHomeData {
	meta: {
		title: string;
		description: string;
		keywords: string;
	};
	hero: {
		heading: string;
		description: string[];
	};
	slidePhotos: StaticImageData[];
	cvFile: string;
	workExperiences: {
		company: string;
		title: string;
		logo: StaticImageData | null;
		start: string;
		end: string;
	}[];
}

// Navigation data
export interface INavigationData {
	menu: {
		title: string;
		slug: string;
	}[];
	copyright: {
		year: number;
		text: string;
	};
}

// Pages data
export interface IPagesData {
	pages: {
		title: string;
		link: string;
	}[];
	articles: {
		title: string;
		link: string;
	}[];
	projects: {
		title: string;
		link: string;
	}[];
}

// Projects page data
export interface IProjectsData {
	meta: {
		title: string;
		description: string;
		keywords: string;
	};
	hero: {
		heading: string;
		description: string[];
	};
	projects: {
		name: string;
		description: string;
		link: {
			url: string;
			text: string;
		};
		tech: string[];
		logo: StaticImageData;
	}[];
}

// Thank you page data
export interface IThankYouData {
	meta: {
		title: string;
		description: string;
		keywords: string;
	};
	hero: {
		heading: string;
		description: string[];
	};
}

// Uses page data
export interface IUsesData {
	meta: {
		title: string;
		description: string;
		keywords: string;
	};
	hero: {
		heading: string;
		description: string[];
	};
	tools: {
		name: string;
		items: {
			title: string;
			description: string;
		}[];
	}[];
}

// Skills page data
export interface ISkillsData {
	meta: {
		title: string;
		description: string;
		keywords: string;
	};
	hero: {
		heading: string;
		description: string[];
	};
	skills: {
		name: string;
		items: {
			icons?: string[];
			title: string;
			description: string;
			frameworks?: string[];
		}[];
	}[];
}

// Social links data
export interface ISocialLinksData {
	url: string;
	ariaLabel: string;
	icon: FunctionComponent;
}
