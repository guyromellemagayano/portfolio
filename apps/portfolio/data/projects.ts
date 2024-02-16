import type { TCommonPageData } from '@/types/common'

export type TProjectsData = TCommonPageData

/**
 * Returns an object containing metadata, hero section data, and an array of project objects.
 * @returns The metadata, hero section data, and an array of project objects.
 */
const ProjectsData = (): TProjectsData => {
  const meta = {
    title: 'Projects - Guy Romelle Magayano',
    description: 'Things I’ve made trying to put my dent in the web universe.',
    keywords:
      'guy romelle magayano, full stack developer, davao, philippines, custom web application, custom web development, devops, seo, amazon, google, javascript, typescript, html, css, react, react native, wordpress, tailwind, jamstack, gatsby, nextjs'
  }

  const hero = {
    heading: 'Things I’ve made trying to put my dent in the web universe.',
    description: [
      'I’ve worked on tons of little projects over the years but these are the ones that I’m most proud of. Some of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas for how it can be improved.'
    ]
  }

  return { meta, hero }
}

export default ProjectsData
