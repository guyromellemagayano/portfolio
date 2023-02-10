import { ArticlesList, ArticlesListCards } from "@/components/List";
import Seo from "@/components/Seo";
import { SimpleLayout } from "@/components/SimpleLayout";
import ArticlesData from "@/data/articles";
import { getAllArticles } from "@/lib/getAllArticles";

/**
 * @description Render the articles page
 * @param {Object} props
 * @returns Articles page
 */
const Articles = (props) => {
	const { articles } = props;

	// Destructure the data from ArticlesData function
	const { meta, hero } = ArticlesData();

	return (
		<>
			<Seo meta={meta} />

			<SimpleLayout id="hero" title={hero.heading} intro={hero.description}>
				<ArticlesList>
					{articles.map((article) => (
						<ArticlesListCards key={article.slug} article={article} />
					))}
				</ArticlesList>
			</SimpleLayout>
		</>
	);
};

export async function getStaticProps() {
	return {
		props: {
			articles: (await getAllArticles()).map(({ component, ...meta }) => meta)
		}
	};
}

export default Articles;
