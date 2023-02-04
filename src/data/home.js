import { GitHubIcon, LinkedInIcon, TwitterIcon } from "@/components/SocialIcons";
import logoEpicDesignLabs from "@/images/logos/epic-design-labs.png";
import logoInfosoftStudio from "@/images/logos/infosoft-studio.png";
import logoMakeDevelopment from "@/images/logos/make-development.jpeg";
import logoMultiplyMii from "@/images/logos/multiplymii.jpeg";
import logoWesternPestControl from "@/images/logos/western-pest-control.jpeg";
import image4 from "@/images/photos/food.jpg";
import image5 from "@/images/photos/photography.jpg";
import image2 from "@/images/photos/speaker.jpg";
import image1 from "@/images/photos/travel.jpg";
import image3 from "@/images/photos/workplace.jpg";

const HomeData = () => {
	const meta = {
		title: "Guy Romelle Magayano - Full Stack Developer, open-source enthusiast, and a minimalist",
		description:
			"I’m Guy, a full stack developer and an open-source enthusiast based in Davao City, Philippines. I love building things that live on the internet, whether that be websites, applications, or anything in between. My goal is to always build products that provide pixel-perfect, performant experiences while also ensuring minimal code and maximum efficiency.",
		keywords:
			"guy romelle magayano, full stack developer, davao, philippines, custom web application, custom web development, devops, seo, amazon, google, javascript, typescript, html, css, react, react native, wordpress, tailwind, jamstack, gatsby, nextjs, astro"
	};

	const hero = {
		heading: "Full stack developer, open-source enthusiast, and a minimalist.",
		description:
			"I’m Guy, a full stack developer and an open-source enthusiast based in Davao City, Philippines. I love building things that live on the internet, whether that be websites, applications, or anything in between. My goal is to always build products that provide pixel-perfect, performant experiences while also ensuring minimal code and maximum efficiency.",
		socialLinks: [
			{
				url: "https://twitter.com/mguyromelle",
				ariaLabel: "Follow on Twitter",
				icon: TwitterIcon
			},
			{
				url: "https://github.com/guyromellemagayano",
				ariaLabel: "Follow on GitHub",
				icon: GitHubIcon
			},
			{
				url: "https://www.linkedin.com/in/mguyromelle/",
				ariaLabel: "Follow on LinkedIn",
				icon: LinkedInIcon
			}
		]
	};

	const slidePhotos = [image1, image2, image3, image4, image5];

	const workExperiences = [
		{
			company: "Epic Design Labs",
			title: "Full Stack Developer",
			logo: logoEpicDesignLabs,
			start: "Apr. 2020",
			end: "Jan. 2023"
		},
		{
			company: "MultiplyMii",
			title: "Full Stack Developer",
			logo: logoMultiplyMii,
			start: "Apr. 2020",
			end: "Sept. 2021"
		},
		{
			company: "MAKE Interactive BV",
			title: "Web Developer",
			logo: logoMakeDevelopment,
			start: "Apr. 2019",
			end: "Feb. 2020"
		},
		{
			company: "Orth Enterprises, LLC",
			title: "Web Developer",
			logo: null,
			start: "Apr. 2019",
			end: "Aug. 2019"
		},
		{
			company: "Outsourcing Wizards",
			title: "Web Developer",
			logo: null,
			start: "Jan. 2019",
			end: "Mar. 2019"
		},
		{
			company: "Infosoft Studio",
			title: "Web Developer",
			logo: logoInfosoftStudio,
			start: "May. 2017",
			end: "Sept. 2018"
		},
		{
			company: "MiniClean Business Solutions",
			title: "Web Developer",
			logo: null,
			start: "Nov. 2014",
			end: "Apr. 2015"
		},
		{
			company: "Western Pest Control",
			title: "Webmaster/Web Developer",
			logo: logoWesternPestControl,
			start: "May 2014",
			end: "Oct. 2014"
		},
		{
			company: "Freelance",
			title: "Web Developer",
			logo: null,
			start: "May 2014",
			end: "Oct. 2014"
		},
		{
			company: "Freelance",
			title: "Frontend Developer",
			logo: null,
			start: "Sept. 2013",
			end: "Oct. 2013"
		}
	];

	return {
		meta,
		hero,
		slidePhotos,
		workExperiences
	};
};

export default HomeData;
