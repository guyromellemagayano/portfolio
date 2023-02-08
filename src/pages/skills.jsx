import { SkillsList, SkillsListCards } from "@/components/List";
import { SimpleLayout } from "@/components/SimpleLayout";
import SkillsData from "@/data/skills";
import Head from "next/head";

/**
 * @description Render the skills page
 * @returns {JSX} Skills page
 */
const Skills = () => {
	// Destrucutre the data from the AboutData function
	const { meta, hero, skills } = SkillsData();

	return (
		<>
			<Head>
				<title>{meta.title}</title>
				<meta name="description" content={meta.description} />
				<meta name="keywords" content={meta.keywords} />
			</Head>

			<SimpleLayout id="hero" title={hero.heading} intro={hero.description}>
				<div className="space-y-20">
					{skills.map((skill) => (
						<SkillsList key={skill.name} title={skill.name}>
							{skill.items?.map((item) => (
								<SkillsListCards
									key={item.title}
									icons={item.icons}
									title={item.title}
									description={item.description}
									frameworks={item.frameworks}
									// cta={[
									// 	{
									// 		projects: [
									// 			{
									// 				title: "Project 1",
									// 				description: "Project 1 description",
									// 				link: "https://google.com"
									// 			}
									// 		]
									// 	},
									// 	{
									// 		articles: [
									// 			{
									// 				title: "Article 1",
									// 				description: "Article 1 description",
									// 				link: "https://google.com"
									// 			}
									// 		]
									// 	}
									// ]}
								/>
							))}
						</SkillsList>
					))}
				</div>
			</SimpleLayout>
		</>
	);
};

export default Skills;
