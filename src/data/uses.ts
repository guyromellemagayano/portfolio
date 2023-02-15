import { IUsesData } from "@/interfaces/data";

const UsesData = (): IUsesData => {
	const meta = {
		title: "Uses - Guy Romelle Magayano",
		description: "Software I use, gadgets I love, and other things I recommend.",
		keywords:
			"guy romelle magayano, full stack developer, davao, philippines, custom web application, custom web development, devops, seo, amazon, google, javascript, typescript, html, css, react, react native, wordpress, tailwind, jamstack, gatsby, nextjs, astro"
	};

	const hero = {
		heading: "Software I use, gadgets I love, and other things I recommend.",
		description: [
			"I get asked a lot about the things I use to build software, stay productive, or buy to fool myself into thinking I’m being productive when I’m really just procrastinating. Here’s a big list of all of my favorite stuff."
		]
	};

	const tools = [
		{
			name: "Workstation",
			items: [
				{
					title: "16-inch MacBook Pro, Intel Core i9, 16GB RAM (2019)",
					description:
						"This is quite an old machine but I love the size of the screen and the power of the machine. Although fans are always running on heavy workloads, I can still do a lot of things with this machine like running virtual machines, multiple browsers, and multiple apps all at the same time."
				},
				{
					title: "34-inch Xiaomi Mi Curved Gaming Monitor, 1440p, 144Hz",
					description:
						"I love the size of this monitor. It's big enough to see everything on the screen and small enough to fit on my desk. I also love the 144Hz refresh rate and the 1440p resolution. I can't imagine working on a smaller monitor."
				},
				{
					title: "Logitech MX Keys Mini",
					description:
						"I love the compact size of this keyboard. It's small enough to fit on my desk and big enough to type on. I also love the backlighting and the fact that it's wireless via Bluetooth and is rechargeable via USB Type C."
				},
				{
					title: "Apple Magic Trackpad Black Multi-Touch Surface",
					description:
						"Both wireless and rechargeable, this trackpad is a joy to use as it is very responsive and accurate in tracking my fingers. With a host of gestures, it makes navigating through my Macbook a breeze. The only downside is that it's a bit expensive."
				},
				{
					title: "Belkin USB-C Video Adapter",
					description:
						"I use this adapter to connect my MacBook Pro to my monitor. It's a bit expensive but it works well. I also love the fact that it's USB-C and Thunderbolt 3 compatible. Supports DVI, VGA, HDMI and Displayport that are both capable of handling up to 4K@60Hz."
				},
				{
					title: "UGreen 10-in-1 USB C Hub with 4K HDMI",
					description:
						"I use this hub to connect with my current webcam and gigabit ethernet adapter. Additionally, it supports up to 100W of power delivery, has 3 USB 3.0 ports, 1 SD card slot, 1 microSD card slot, a 4K HDMI port, a VGA port. It's a bit expensive but works well on my current setup."
				},
				{
					title: "Logitech Brio Ultra HD Pro Business Webcam",
					description:
						"I use this webcam for my video calls, streaming, and recording. It has a 4K sensor and a 5x digital zoom. It also has a built-in privacy shutter and a built-in microphone. Its quite crisp and clear while also supports HDR which is very useful in poorly lit environments."
				},
				{
					title: "Sony WH-1000XM4 Wireless Noise-Canceling Headphones",
					description:
						"I love the noise cancellation feature of this headphone. It's very effective in blocking out the noise around me. I also love the fact that it's wireless via Bluetooth and has a long battery life. The only downside is that it's a bit expensive."
				},
				{
					title: "Asus ROG Strix Arion M.2 NVMe SSD Enclosure - 1 x M.2 Slot - USB 3.2 Gen 2 (10Gbps) - USB-C",
					description:
						"I use this enclosure to connect my M.2 NVMe SSD to my MacBook Pro as my main Time Machinme backup drive."
				}
			]
		},
		{
			name: "Development",
			items: [
				{
					title: "Visual Studio Code",
					description:
						"My go-to code editor for all my projects. I love the fact that it's lightweight and fast. It also has a lot of extensions that I can use to make my development experience better. I also love the fact that it's open source and free."
				},
				{
					title: "iTerm2",
					description:
						"Since I'm a Mac user, its quite natural for me to use iTerm2 as my terminal emulator. Its very customizable and has a lot of features that I can use to make my terminal experience better. Robust and fast, I can't imagine using any other terminal emulator."
				},
				{
					title: "Docker",
					description:
						"I often use Docker to run my development environment. Its quite handy and easy to use and easy to setup especially on Mac. Just install Docker Desktop and you're good to go."
				}
			]
		},
		{
			name: "Productivity",
			items: [
				{
					title: "Notion",
					description:
						"I use Notion for all my note taking needs. Although it has a lot of features, some beyond just note taking, I use it primarily for creating and organizing my notes. It's very intuitive and easy to use."
				},
				{
					title: "Magnet",
					description:
						"I use Magnet to organize my windows on my Mac. It has lots of keyboard shortcuts that I can use to quickly organize my windows. It's very stable and does what it's supposed to do."
				}
			]
		}
	];

	return {
		meta,
		hero,
		tools
	};
};

export default UsesData;
