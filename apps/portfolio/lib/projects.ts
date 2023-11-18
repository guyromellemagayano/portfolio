import glob from 'fast-glob'
import { TProjectLibProps, TProjectWithSlugLibProps } from 'types/libs'

async function importProject(
  projectFilename: string
): Promise<TProjectWithSlugLibProps> {
  const { article } = (await import(`../app/projects/${projectFilename}`)) as {
    default: React.ComponentType
    article: TProjectLibProps
  }

  return {
    slug: projectFilename.replace(/(\/page)?\.mdx$/, ''),
    ...article
  }
}

export async function getAllProjects() {
  const projectFilenames = await glob('*/page.mdx', {
    cwd: './app/projects'
  })

  const projects = await Promise.all(projectFilenames.map(importProject))

  return projects.sort((a, z) => +new Date(z.date) - +new Date(a.date))
}
