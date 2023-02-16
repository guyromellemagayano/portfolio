import { IArticleProps } from "@/interfaces/components";
import { formatDate } from "@/lib/formatDate";
import Card from "./Card";

// Article component
const Article = ({ article }: IArticleProps): JSX.Element => {
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
