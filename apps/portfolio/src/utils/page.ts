'use server'

import { apiUrls } from '@guy-romelle-magayano/portfolio/configs'
import {
  PhotosData,
  SkillsData,
  WorkData,
  type BasePageData
} from '@guy-romelle-magayano/portfolio/types'
import {
  fullServerUrl,
  socialData
} from '@guy-romelle-magayano/portfolio/utils/server'

/**
 * Returns the full server URL with its protocol, host, and pathname.
 * @param url - The URL to fetch.
 * @param retries - The number of times to retry the request if it fails.
 * @param delay - The delay between retries in milliseconds.
 * @returns The page data
 */
export const fetchPageData = async (
  url: string,
  retries = 3,
  delay = 1000
): Promise<any> => {
  const fullUrl = await fullServerUrl(url)

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(fullUrl)

      if (!response.ok) {
        throw new Error(
          `Failed to fetch data: ${response.status} ${response.statusText}`
        )
      }

      return await response.json()
    } catch (error) {
      console.error(`Attempt ${attempt + 1} failed:`, error)

      // If the last attempt fails, throw the error
      if (attempt === retries) {
        console.error('Max retries reached. Throwing error.')
        throw new Error(
          `Failed to fetch data after ${retries + 1} attempts: ${error}`
        )
      }

      // Wait for a specified delay before retrying
      await new Promise(res => setTimeout(res, delay))
    }
  }

  // This return is just a safeguard; the function should never reach here
  return {}
}

/**
 * Fetches the home page data.
 * @returns The home page data.
 */
export const homePageData = async (): Promise<BasePageData> =>
  await fetchPageData(apiUrls.home)

/**
 * Returns the home app data.
 * @returns The home app data.
 */
export const homeAppData = async (): Promise<any> => {
  const page = await homePageData()
  const social = await socialData()
  const about = await aboutPageData()
  const work = await workData()
  const skills = await skillsData()
  // const articles = await articlesData()
  // const projects = await projectsData()
  const photos = await photosData()

  const data = await Promise.all([
    page,
    social,
    about,
    photos,
    work,
    skills
    // articles,
    // projects
  ]).then(([page, social, about, photos, work, skills]) => {
    const { meta: pageMeta, ...newPage } = page
    const { meta: aboutMeta, ...newAbout } = about
    // const newArticles =
    //   articles?.map(({ component, ...article }) => article) || undefined
    // const newProjects =
    //   projects?.map(({ component, ...project }) => project) || undefined

    return {
      ...newPage,
      links: social,
      aboutInfo: newAbout,
      workInfo: work,
      skillsInfo: skills,
      photos
      // articles: newArticles,
      // projects: newProjects
    }
  })

  return data
}

/**
 * Returns the about app data.
 * @returns The about app data.
 */
export const aboutPageData = async (): Promise<BasePageData> =>
  await fetchPageData(apiUrls.about)

/**
 * Returns the work data.
 * @returns The work data.
 */
export const workData = async (): Promise<WorkData> =>
  await fetchPageData(apiUrls.work)

// FIXME: About app data
/**
 * Returns the about app data.
 * @returns The about app data.
 */
// export const aboutAppData = async (): Promise<AboutPageData> => {
//   const page = await aboutPageData()
//   const social = await socialData()

//   const data = await Promise.all([page, social]).then(([page, social]) => {
//     const { meta, ...newPage } = page

//     return {
//       ...newPage,
//       social
//     }
//   })

//   return data
// }

/**
 * Returns the skills data.
 * @returns The skills data.
 */
export const skillsData = async (): Promise<SkillsData> =>
  await fetchPageData(apiUrls.skills)

/**
 * Returns the photos data.
 * @returns The photos data.
 */
export const photosData = async (): Promise<PhotosData> =>
  await fetchPageData(apiUrls.photos)

// FIXME: Articles page data
/**
 * Returns the articles page data.
 * @returns The articles page data.
 */
// export const articlesPageData = async (): Promise<BasePageData> =>
//   await fetchPageData(apiUrls.articles)

// FIXME: Articles app data
/**
 * Returns the articles app data.
 * @returns The articles app data.
 */
// export const articlesAppData = async (): Promise<ArticlesAppData> => {
//   const page = await articlesPageData()
//   const articles = await articlesData()

//   const data = await Promise.all([page, articles]).then(([page, articles]) => {
//     const { meta, ...newPage } = page
//     const newArticles =
//       articles?.map(({ component, ...article }) => article) || undefined

//     return {
//       ...newPage,
//       articles: newArticles
//     }
//   })

//   return data
// }

// FIXME: Projects page data
/**
 * Return the projects page data.
 * @returns The projects page data.
 */
// export const projectsPageData = async (): Promise<ProjectsPageData> =>
//   await fetchPageData(apiUrls.projects)

// FIXME: Projects app data
/**
 * Returns the projects app data.
 * @returns The projects app data.
 */
// export const projectsAppData = async (): Promise<ProjectsAppData> => {
//   const page = await projectsPageData()
//   const projects = await projectsData()
//   const data = await Promise.all([page, projects]).then(([page, projects]) => {
//     const { meta, ...newPage } = page,
//       newProjects =
//         projects?.map(({ component, ...project }) => project) || undefined

//     return {
//       ...newPage,
//       projects: newProjects
//     }
//   })

//   return data
// }
