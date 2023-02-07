const SkillsData = () => {
	const meta = {
		title: "Skills - Guy Romelle Magayano",
		description: "I love web and currently focusing on being better at quite a few things.",
		keywords:
			"guy romelle magayano, full stack developer, davao, philippines, custom web application, custom web development, devops, seo, amazon, google, javascript, typescript, html, css, react, react native, wordpress, tailwind, jamstack, gatsby, nextjs, astro"
	};

	const hero = {
		heading: "I love web and currently focusing on being better at quite a few things.",
		description: [
			"I have a wide range of skills and experiences in building web applications and websites. I can do frontend, backend, and even a little bit of devops if needed! Here is a complete list of some of the technologies I have worked with and some of the projects I have worked on since."
		]
	};

	const skills = [
		{
			name: "Frontend",
			items: [
				{
					icons: [],
					title: "Markup and Styling",
					description:
						"I have a good understanding of both HTML and CSS and can build responsive websites and apps from scratch.",
					frameworks: ["TailwindCSS", "Bootstrap", "Bulma"]
				},
				{
					icons: [],
					title: "Javascript and Typescript",
					description:
						"I have a good understanding of Javascript and Typescript and can build responsive websites and apps from scratch.",
					frameworks: ["ReactJS", "VueJS"]
				}
			]
		},
		{
			name: "Backend",
			items: [
				{
					icons: [],
					title: "NodeJS",
					description: "I have a good understanding of NodeJS and can build responsive websites and apps from scratch.",
					frameworks: ["Express"]
				}
			]
		},
		{
			name: "Mobile",
			items: [
				{
					icons: [],
					title: "React Native",
					description:
						"I have a good understanding of React Native and can build responsive websites and apps from scratch."
				}
			]
		},
		{
			name: "Site Generators",
			items: [
				{
					icons: [],
					title: "JAMstack",
					description:
						"I have a good understanding of JAMstack and can build responsive websites and apps from scratch.",
					frameworks: ["Gatsby", "NextJS", "NuxtJS"]
				}
			]
		},
		{
			name: "APIs",
			items: [
				{
					icons: [],
					title: "Wordpress",
					description:
						"I have a good understanding of Wordpress and can build responsive websites and apps from scratch."
				},
				{
					icons: [],
					title: "Optimizely/Episerver",
					description:
						"I have a good understanding of Optimizely/Episerver and can build responsive websites and apps from scratch."
				},
				{
					icons: [],
					title: "BigCommerce",
					description:
						"I have a good understanding of BigCommerce and can build responsive websites and apps from scratch."
				},
				{
					icons: [],
					title: "Shopify",
					description: "I have a good understanding of Shopify and can build responsive websites and apps from scratch."
				}
			]
		},
		{
			name: "Database",
			items: [
				{
					icons: [],
					title: "Relational",
					description: "I have a good understanding of relational databases and can build one from scratch.",
					frameworks: ["MySQL", "PostgreSQL", "MariaDB"]
				}
			]
		},
		{
			name: "DevOps",
			items: [
				{
					icons: [],
					title: "Virtualization",
					description:
						"I have a good understanding of virtualization and can build responsive websites and apps from scratch.",
					frameworks: ["Docker", "Vagrant"]
				},
				{
					icons: [],
					title: "Web Servers",
					description:
						"I have a good understanding of web servers and can build responsive websites and apps from scratch.",
					frameworks: ["Nginx", "Apache"]
				},
				{
					icons: [],
					title: "Shell Scripting",
					description:
						"I have a good understanding of Scripting and can build responsive websites and apps from scratch.",
					frameworks: ["BASH"]
				}
			]
		},
		{
			name: "Version Control",
			items: [
				{
					icons: [],
					title: "Git",
					description: "I have very ample knowledge of Git and is always using it in my projects.",
					frameworks: ["Github", "Gitlab", "Bitbucket"]
				}
			]
		},
		{
			name: "User Interface Design",
			items: [
				{
					icons: [],
					title: "Tools",
					description:
						"I have a good understanding of user interface design tools and can build responsive websites and apps from scratch.",
					frameworks: ["Figma", "Adobe Photoshop"]
				}
			]
		},
		{
			name: "SEO",
			items: [
				{
					icons: [],
					title: "Tools",
					description:
						"I have a good understanding of SEO tools and can build responsive websites and apps from scratch.",
					frameworks: ["Google Analytics", "Google Search Console", "Google Webmaster Tools", "PageSpeed Insights"]
				}
			]
		},
		{
			name: "Project Management",
			items: [
				{
					icons: [],
					title: "Tools",
					description:
						"I have a good understanding of project management tools and can build responsive websites and apps from scratch.",
					frameworks: ["Jira", "Trello", "Asana", "Notion", "Monday.com"]
				}
			]
		}
	];

	return { meta, hero, skills };
};

export default SkillsData;
