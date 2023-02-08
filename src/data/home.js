import image4 from "@/images/photos/food.jpg";
import image5 from "@/images/photos/photography.jpg";
import image2 from "@/images/photos/speaker.jpg";
import image1 from "@/images/photos/travel.jpg";
import image3 from "@/images/photos/workplace.jpg";

const HomeData = () => {
	const meta = {
		title: "Guy Romelle Magayano - Full Stack Developer, open-source enthusiast, and a minimalist",
		description: "Full stack developer, open-source enthusiast, and a minimalist.",
		keywords:
			"guy romelle magayano, full stack developer, davao, philippines, custom web application, custom web development, devops, seo, amazon, google, javascript, typescript, html, css, react, react native, wordpress, tailwind, jamstack, gatsby, nextjs, astro"
	};

	const hero = {
		heading: "Full stack developer, open-source enthusiast, and a minimalist.",
		description: [
			"I’m Guy, a full stack developer and an open-source enthusiast based in Davao City, Philippines. I love building things that live on the internet, whether that be websites, applications, or anything in between. My goal is to always build products that provide pixel-perfect, performant experiences while also ensuring minimal code and maximum efficiency."
		]
	};

	const slidePhotos = [image1, image2, image3, image4, image5];

	const cvFile = "/docs/cv.pdf";

	return {
		meta,
		hero,
		slidePhotos,
		cvFile
	};
};

export default HomeData;
