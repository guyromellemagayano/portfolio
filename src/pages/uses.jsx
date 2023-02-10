import { ToolsList, ToolsListCards } from "@/components/List";
import Seo from "@/components/Seo";
import { SimpleLayout } from "@/components/SimpleLayout";
import UsesData from "@/data/uses";

/**
 * @description Render the uses page
 * @returns {JSX} Uses page
 */
const Uses = () => {
	// Destructure the data from the UsesData function
	const { meta, hero, tools } = UsesData();

	return (
		<>
			<Seo meta={meta} />

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
