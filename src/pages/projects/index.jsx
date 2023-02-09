import { ProjectsList, ProjectsListCards } from "@/components/List";
import { SimpleLayout } from "@/components/SimpleLayout";
import ProjectsData from "@/data/projects";
import Head from "next/head";

/**
 * @description Render the projects page
 * @returns Projects page
 */
const Projects = () => {
	// Desctructure the data from ProjectsData function
	const { meta, hero, projects } = ProjectsData();

	return (
		<>
			<Head>
				<title>{meta.title}</title>
				<meta name="description" content={hero.description} />
				<meta name="keywords" content={meta.keywords} />
			</Head>

			<SimpleLayout id="hero" title={hero.heading} intro={hero.description}>
				<ProjectsList>
					{projects.map((project) => (
						<ProjectsListCards key={project.name} project={project} />
					))}
				</ProjectsList>
			</SimpleLayout>
		</>
	);
};

export default Projects;
