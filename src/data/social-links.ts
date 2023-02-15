import MailSvgIcon from "@/components/icons/svg/Mail";
import { GitHubSvgIcon, LinkedInSvgIcon, TwitterSvgIcon } from "@/components/SocialIcons";
import { FunctionComponent } from "react";

interface ISocialLinksData {
	url: string;
	ariaLabel: string;
	icon: FunctionComponent;
}

const socialLinksData = [
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
] as ISocialLinksData[];

export default socialLinksData;
