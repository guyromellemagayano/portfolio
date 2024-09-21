'use server'

import { apiUrls } from '@portfolio/configs'
import {
  PhotosData,
  SkillsData,
  WorkData,
  type BasePageData
} from '@portfolio/types'

// import { articlesData } from './articles'
import { socialData } from './data'
import { fetchData } from './helpers'

/**
 * Fetches the home page data.
 * @returns The home page data.
 */
export const homePageData = async (): Promise<BasePageData> =>
  await fetchData(apiUrls.home)

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
    // articles
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
      // articles: newArticles
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
  await fetchData(apiUrls.about)

/**
 * Returns the work data.
 * @returns The work data.
 */
export const workData = async (): Promise<WorkData> =>
  await fetchData(apiUrls.work)

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
  await fetchData(apiUrls.skills)

/**
 * Returns the photos data.
 * @returns The photos data.
 */
export const photosData = async (): Promise<PhotosData> =>
  await fetchData(apiUrls.photos)

// FIXME: Articles page data
/**
 * Returns the articles page data.
 * @returns The articles page data.
 */
// export const articlesPageData = async (): Promise<BasePageData> =>
//   await fetchData(apiUrls.articles)

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
//   await fetchData(apiUrls.projects)

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
