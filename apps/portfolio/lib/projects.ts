import glob from 'fast-glob'

import { TProjectLibProps, TProjectWithSlugLibProps } from '@/types/libs'

// Import a project
export const importProject = async (
  projectFilename: string
): Promise<TProjectWithSlugLibProps> => {
  const { article } = (await import(`../app/projects/${projectFilename}`)) as {
    default: React.ComponentType
    article: TProjectLibProps
  }

  return {
    slug: projectFilename.replace(/(\/page)?\.mdx$/, ''),
    ...article
  }
}

// Fetch all projects
export const getAllProjects = async () => {
  const projectFilenames = await glob('*/page.mdx', {
    cwd: './app/projects'
  })

  const projects = await Promise.all(projectFilenames.map(importProject))

  return projects.sort((a, z) => +new Date(z.date) - +new Date(a.date))
}
