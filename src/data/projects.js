import logoDjango from "@/images/logos/django.png";
import logoGithub from "@/images/logos/github.png";
import logoNpm from "@/images/logos/npm.png";
import logoReact from "@/images/logos/react.png";
import logoWordpress from "@/images/logos/wordpress.png";

const ProjectsData = () => {
	const meta = {
		title: "Projects - Guy Romelle Magayano",
		description: "Things I’ve made trying to put my dent in the web universe.",
		keywords:
			"guy romelle magayano, full stack developer, davao, philippines, custom web application, custom web development, devops, seo, amazon, google, javascript, typescript, html, css, react, react native, wordpress, tailwind, jamstack, gatsby, nextjs, astro"
	};

	const hero = {
		heading: "Things I’ve made trying to put my dent in the web universe.",
		description: [
			"I’ve worked on tons of little projects over the years but these are the ones that I’m most proud of. Some of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas for how it can be improved."
		]
	};

	const projects = [
		{
			name: "SiteCrawler",
			description: "Monitor and Strengthen Your Websites",
			link: {
				url: "https://app.sitecrawler.com/login",
				text: "app.sitecrawler.com"
			},
			tech: ["NextJS", "Django", "PostgreSQL", "Terraform", "Docker", "AWS", "Traefik", "Go", "LocalStack"],
			logo: logoDjango
		},
		{
			name: "WineClub",
			description: "Connecting wine makers and wine lovers",
			link: {
				url: "https://github.com/guyromellemagayano/wineclub",
				text: "github.com"
			},
			tech: ["React Native", "NextJS", "NodeJS", "Redux", "MongoDB", "GraphQL", "Heroku", "Docker"],
			logo: logoReact
		},
		{
			name: "RVGearPro",
			description: "RVGearPro is your source for great prices and value on Camper & RV Parts",
			link: {
				url: "https://github.com/guyromellemagayano/rvgearpro",
				text: "github.com"
			},
			tech: ["BigCommerce API", "Javscript", "Gatsby", "NodeJS", "Tailwind"],
			logo: logoReact
		},
		{
			name: "City Government of Davao",
			description: "Official Website of City Government of Davao",
			link: {
				url: "https://www.davaocity.gov.ph",
				text: "davaocity.gov.ph"
			},
			tech: ["WordPress", "PHP", "MySQL", "Gulp", "jQuery", "Bootstrap"],
			logo: logoWordpress
		},
		{
			name: "City Government of Tagum",
			description: "Official Website of City Government of Tagum",
			link: {
				url: "https://github.com/guyromellemagayano/city-government-of-tagum",
				text: "github.com"
			},
			tech: ["WordPress", "PHP", "MySQL", "Gulp", "jQuery", "Bootstrap"],
			logo: logoWordpress
		},
		{
			name: "Big Leap Partnerships",
			description: "Taking your business from where it is to where you want it to be",
			link: {
				url: "https://github.com/guyromellemagayano/big-leap-partnerships",
				text: "github.com"
			},
			tech: ["WordPress", "PHP", "Timber", "MySQL", "Gulp", "jQuery", "Bootstrap"],
			logo: logoWordpress
		},
		{
			name: "Bigcommerce for Gatsby (v2)",
			description: "This unofficial source plugin makes BigCommerce API data available in GatsbyJS sites",
			link: {
				url: "https://www.npmjs.com/package/gatsby-source-bigcommerce-v2",
				text: "npmjs.com"
			},
			tech: ["GatsbyJS", "NodeJS", "JavaScript", "GraphQL", "BigCommerce API"],
			logo: logoNpm
		},
		{
			name: "Optimizely for Gatsby",
			description: "This unofficial source plugin makes Optimizely API data available in GatsbyJS sites.",
			link: {
				url: "https://www.npmjs.com/package/gatsby-source-optimizely",
				text: "npmjs.com"
			},
			tech: ["GatsbyJS", "NodeJS", "JavaScript", "GraphQL", "Optimizely API"],
			logo: logoNpm
		},
		{
			name: "Bigcommerce for NodeJS",
			description: "A revised version of the original node module for authentication and use with the BigCommerce API",
			link: {
				url: "https://github.com/guyromellemagayano/node-bigcommerce",
				text: "github.com"
			},
			tech: ["NodeJS", "JavaScript", "BigCommerce API"],
			logo: logoGithub
		}
	];

	return { meta, hero, projects };
};

export default ProjectsData;
