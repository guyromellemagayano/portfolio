import { ArticlesList, ArticlesListCards } from "@/components/List";
import { SimpleLayout } from "@/components/SimpleLayout";
import ArticlesData from "@/data/articles";
import { getAllArticles } from "@/lib/getAllArticles";
import Head from "next/head";

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
			<Head>
				<title>{meta.title}</title>
				<meta name="description" content={meta.description} />
				<meta name="keywords" content={meta.keywords} />
			</Head>

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
