import glob from "fast-glob";
import * as path from "path";

// This function is used to import a single article
const importArticle = async (
	articleFilename: string
): Promise<{
	slug: string;
	meta: {
		author: string;
		date: string;
		description: string;
		title: string;
	};
	component: any;
}> => {
	let { meta, default: component } = await import(`../pages/articles/${articleFilename}`);

	return {
		slug: articleFilename.replace(/(\/index)?\.mdx$/, ""),
		...meta,
		component
	};
};

// This function is used to import all articles
export const getAllArticles = async () => {
	let articleFilenames = await glob(["*.mdx", "*/index.mdx"], {
		cwd: path.join(process.cwd(), "src/pages/articles")
	});

	let articles = await Promise.all(articleFilenames.map(importArticle));

	return articles.sort((a, z) => new Date(z.meta.date).valueOf() - new Date(a.meta.date).valueOf());
};
