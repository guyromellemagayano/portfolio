import MailSvgIcon from "@/components/icons/svg/Mail";
import { GitHubSvgIcon, LinkedInSvgIcon, TwitterSvgIcon } from "@/components/SocialIcons";
import { ISocialLinksData } from "types";

const socialLinksData: ISocialLinksData[] = [
	{
		url: "https://twitter.com/mguyromelle",
		ariaLabel: "Follow on Twitter",
		icon: TwitterSvgIcon
	},
	{
		url: "https://github.com/guyromellemagayano",
		ariaLabel: "Follow on GitHub",
		icon: GitHubSvgIcon
	},
	{
		url: "https://www.linkedin.com/in/mguyromelle/",
		ariaLabel: "Follow on LinkedIn",
		icon: LinkedInSvgIcon
	},
	{
		url: "mailto:hello@guyromellemagayano.dev",
		ariaLabel: "hello@guyromellemagayano.dev",
		icon: MailSvgIcon
	}
];

export default socialLinksData;
