import { isEmpty } from "@/lib/checkTypes";
import { formatDate } from "@/lib/formatDate";
import Image from "next/image";
import Card from "./Card";
import { Section } from "./Section";
import LinkSvgIcon from "./icons/svg/Link";

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
			{!isEmpty(article?.date) && (
				<Card.Eyebrow as="time" dateTime={article.date} className="mt-1 hidden md:block">
					{formatDate(article.date)}
				</Card.Eyebrow>
			)}

			{!isEmpty(article?.title) && !isEmpty(article?.slug) && (
				<Card className="md:col-span-3">
					<Card.Title href={`/articles/${article.slug}`}>{article.title}</Card.Title>
					<Card.Description>{article.description}</Card.Description>
					<Card.Cta>Read article</Card.Cta>
				</Card>
			)}
		</article>
	);
};

/**
 * @description Render the projects list component
 * @param {Object} props
 * @returns {JSX} Projects list component
 */
export const ProjectsList = ({ children }) => {
	return (
		<ul role="list" className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
			{children}
		</ul>
	);
};

/**
 * @description Render the projects list cards component
 * @param {Object} props
 * @returns {JSX} Projects list cards component
 */
export const ProjectsListCards = (props) => {
	const { project } = props;

	return (
		!isEmpty(project?.name) &&
		!isEmpty(project?.link?.url) && (
			<Card as="li" key={project.name}>
				{!isEmpty(project?.logo) && (
					<div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
						<span className="h-8 w-8 overflow-hidden rounded-full">
							<Image src={project.logo} alt="" className="h-full w-full" unoptimized />
						</span>
					</div>
				)}

				<h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
					<Card.Link href={project.link.url} target="_blank">
						{project.name}
					</Card.Link>
				</h2>
				<Card.Description>{project?.description || ""}</Card.Description>
				<p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-amber-500 dark:text-zinc-200">
					<LinkSvgIcon className="h-6 w-6 flex-none" />
					<span className="ml-2">{project?.link?.text || ""}</span>
				</p>
			</Card>
		)
	);
};
