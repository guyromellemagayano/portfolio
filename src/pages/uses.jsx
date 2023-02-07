import { ToolsList, ToolsListCards } from "@/components/List";
import { SimpleLayout } from "@/components/SimpleLayout";
import UsesData from "@/data/uses";
import Head from "next/head";

/**
 * @description Render the uses page
 * @returns {JSX} Uses page
 */
const Uses = () => {
	// Destructure the data from the UsesData function
	const { meta, hero, tools } = UsesData();

	return (
		<>
			<Head>
				<title>{meta.title}</title>
				<meta name="description" content={meta.description} />
				<meta name="keywords" content={meta.keywords} />
			</Head>

			<SimpleLayout id="hero" title={hero.heading} intro={hero.description}>
				<div className="space-y-20">
					{tools.map((tool) => (
						<ToolsList key={tool.name} title={tool.name}>
							{tool.items?.map((item) => (
								<ToolsListCards key={item.title} title={item.title} description={item.description} />
							))}
						</ToolsList>
					))}
				</div>
			</SimpleLayout>
		</>
	);
};

export default Uses;
