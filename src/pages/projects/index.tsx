import { ProjectsList, ProjectsListCards } from '@/components/List'
import Seo from '@/components/Seo'
import SimpleLayout from '@/components/SimpleLayout'
import ProjectsData from '@/data/projects'
import type { NextPage } from 'next'

// Projects page
const Projects: NextPage = (): JSX.Element => {
  // Desctructure the data from ProjectsData function
  const { meta, hero, projects } = ProjectsData()

  return (
    <>
      <Seo meta={meta} />

      <SimpleLayout id="hero" title={hero.heading} intro={hero.description}>
        <ProjectsList>
          {projects.map((project) => (
            <ProjectsListCards key={project.name} project={project} />
          ))}
        </ProjectsList>
      </SimpleLayout>
    </>
  )
}

export default Projects
