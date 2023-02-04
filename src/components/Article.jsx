import { formatDate } from "@/lib/formatDate";
import Card from "./Card";

/**
 * @description Render the article component
 * @param {Object} props
 * @returns {JSX} Article component
 */
const Article = (props) => {
	const { article } = props;

	return (
		<Card as="article">
			<Card.Title href={`/articles/${article.slug}`}>{article.title}</Card.Title>
			<Card.Eyebrow as="time" dateTime={article.date} decorate>
				{formatDate(article.date)}
			</Card.Eyebrow>
			<Card.Description>{article.description}</Card.Description>
			<Card.Cta>Read article</Card.Cta>
		</Card>
	);
};

export default Article;
