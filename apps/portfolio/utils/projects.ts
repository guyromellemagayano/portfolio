import glob from 'fast-glob'

// Types for project lib function
export type TProjectLibProps<T = any> = T & {
  name: string
  description: string
  link: { url: string; text: string }
  tech: string[]
}

// Types for project lib function with slug
export type TProjectWithSlugLibProps<T = any> = T &
  TProjectLibProps & {
    slug: string
  }

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
