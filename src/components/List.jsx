import { isEmpty } from "@/lib/checkTypes";
import { Fragment } from "react";
import Card from "./Card";
import { Section } from "./Section";

/**
 * @description Render the skills list component
 * @param {Object} props
 * @returns {JSX} Skills list component
 */
export const SkillsList = ({ children, ...props }) => {
	return (
		<Section {...props}>
			<div className="space-y-16">{children}</div>
		</Section>
	);
};

/**
 * @description Render the skills list cards component
 * @param {Object} props
 * @returns {JSX} Skills list cards component
 */
export const SkillsListCards = (props) => {
	const { title, description, frameworks, cta } = props;

	return (
		<Card as="article">
			<Card.Title as="h3" title={title}>
				{title}
			</Card.Title>
			<Card.Description>{description}</Card.Description>

			{!isEmpty(frameworks) && (
				<Card.Eyebrow as="ul" className="flex flex-wrap gap-x-2">
					{frameworks.map((item) => (
						<li key={item}>{item}</li>
					))}
				</Card.Eyebrow>
			)}

			{!isEmpty(cta) && (
				<span className="flex items-start gap-x-4">
					{cta.map((item) => {
						const projectCtaText = "See projects";
						const articleCtaText = "See articles";

						!isEmpty(item.projects) && (item.text = projectCtaText);
						!isEmpty(item.articles) && (item.text = articleCtaText);

						return (
							<Fragment key={item.text}>
								{!isEmpty(item.projects) && (
									<Card.Cta key={item.text} title={item.text}>
										{item.text}
									</Card.Cta>
								)}

								{!isEmpty(item.articles) && (
									<Card.Cta key={item.text} title={item.text}>
										{item.text}
									</Card.Cta>
								)}
							</Fragment>
						);
					})}
				</span>
			)}
		</Card>
	);
};

/**
 * @description Render the Tools list component
 * @param {Object} props
 * @returns {JSX} Tools list component
 */
export const ToolsList = ({ children, ...props }) => {
	return (
		<Section {...props}>
			<ul role="list" className="space-y-16">
				{children}
			</ul>
		</Section>
	);
};

/**
 * @description Render the tools list cards component
 * @param {Object} props
 * @returns {JSX} Tools list cards component
 */
export const ToolsListCards = (props) => {
	const { title, description } = props;

	return (
		<Card as="li">
			<Card.Title as="h3">{title}</Card.Title>
			<Card.Description>{description}</Card.Description>
		</Card>
	);
};
