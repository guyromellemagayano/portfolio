import { isEmpty } from "@/lib/checkTypes";
import { formatDate } from "@/lib/formatDate";
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

						!isEmpty(item.projects) && (item.text = projectCtaText);

						return (
							!isEmpty(item.projects) && (
								<Card.Cta key={item.text} title={item.text}>
									{item.text}
								</Card.Cta>
							)
						);
					})}
				</span>
			)}
		</Card>
	);
};

/**
 * @description Render the tools list component
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

/**
 * @description Render the articles list component
 * @param {Object} props
 * @returns {JSX} Articles list component
 */
export const ArticlesList = ({ children }) => {
	return (
		<div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
			<div className="flex max-w-3xl flex-col space-y-16">{children}</div>
		</div>
	);
};

/**
 * @description Render the articles list cards component
 * @param {Object} props
 * @returns {JSX} Articles list cards component
 */
export const ArticlesListCards = (props) => {
	const { article } = props;

	return (
		<article className="md:grid md:grid-cols-4 md:items-baseline">
			<Card.Eyebrow as="time" dateTime={article.date} className="mt-1 hidden md:block">
				{formatDate(article.date)}
			</Card.Eyebrow>
			<Card className="md:col-span-3">
				<Card.Title href={`/articles/${article.slug}`}>{article.title}</Card.Title>
				<Card.Description>{article.description}</Card.Description>
				<Card.Cta>Read article</Card.Cta>
			</Card>
		</article>
	);
};
