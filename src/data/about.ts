import { IAboutData } from "types";

const AboutData = (): IAboutData => {
	const meta = {
		title: "About - Guy Romelle Magayano",
		description: "I’m Guy Romelle Magayano and I build things for the Web.",
		keywords:
			"guy romelle magayano, full stack developer, davao, philippines, custom web application, custom web development, devops, seo, amazon, google, javascript, typescript, html, css, react, react native, wordpress, tailwind, jamstack, gatsby, nextjs, astro"
	};

	const hero = {
		heading: "I’m Guy Romelle Magayano and I build things for the Web.",
		description: [
			"Funny enough, my interest in the Web started when I started playing video games with my twin brother. We were pretty young back then and were into a lot of entertainment as we were studying quite a lot - I know Asian parents have a reputation for an excellent reason. Web search and browsing were relatively new to us as we had Yahoo! - Yeah, you heard that right - as our default search engine coupled with the infamous Internet Explorer as our go-to browser because Windows 98 and XP were the more common ones in many computer laboratories, even in computer shops back then.",
			"Fast-forward to my college years, I was introduced to web development via an elective course - although that was basic, in retrospect, I tried to learn much of the foundations I built to this day through self-learning and constant practice. For some time during my college education, I have known and practiced enough that I  managed to develop my library management app - using the usual front-end stuff: HTML, CSS, JavaScript, and PHP as my backend language.",
			"When I landed a developer job online just after I graduated, I learned a lot of new stuff, including WordPress and front-end JavaScript frameworks, including React, Angular, and Vue. Then I got introduced to  NodeJS and Python backend programming languages and applied virtualization to them via Docker and some CI/CD practices, including shell scripting using BASH. I developed some apps and even massive-scale ones via multiple companies. After some hard work and various clients later, I tried to create my open-source projects for Gatsby and even NodeJS. Some are publicly published via NPM, while others are still a work in progress via my GitHub repository. By the time the JAMstack train went along, I had dived deeper into Javascript and introduced myself to Typescript bit by bit. I learned more about React via Gatsby and NextJS and even acquired NuxtJS as part of my work requirements. In my free time, I also learned additional static site generators like Jekyll and Hugo, although that would be part of my ongoing hobby of learning new stuff and seeing what I can do with them. On the other hand,  I also worked with multiple commercial APIs, including Episerver (now Optimizely), BigCommerce, and Shopify. I also learned how to create serverless functions via Netlify.",
			"Today, I work as a full-stack developer for an e-commerce company specializing in design, branding, UX, development, conversion building, growth support, traffic, and integrations. I design, develop, and maintain their web products daily.",
			"And if that wasn't enough, I give back to the open-source community in my spare time by maintaining front-end workflows and other projects."
		]
	};

	return { meta, hero };
};

export default AboutData;
