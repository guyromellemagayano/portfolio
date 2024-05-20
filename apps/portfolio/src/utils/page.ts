'use server'

import { apiUrls } from '@guy-romelle-magayano/portfolio/configs'
import {
  type AboutPageData,
  type ArticlesAppData,
  type ArticlesPageData,
  type HomeAppData,
  type HomePageData,
  type ProjectsAppData,
  type ProjectsPageData,
  type SkillsAppData,
  type SkillsPageData,
  type UsesPageData,
  type WorkPageData
} from '@guy-romelle-magayano/portfolio/types'
import {
  articlesData,
  fullServerUrl,
  projectsData,
  socialData
} from '@guy-romelle-magayano/portfolio/utils/server'

/**
 * Returns the full server URL with its protocol, host, and pathname.
 * @param url - The URL to fetch.
 * @returns The page data.
 */
export const fetchPageData = async (url: string): Promise<any> =>
  fetch(await fullServerUrl(url))
    .then(res => res.json())
    .catch(() => ({}))

/**
 * Fetches the home page data.
 * @returns The home page data.
 */
export const homePageData = async (): Promise<HomePageData> =>
  await fetchPageData(apiUrls.home)

/**
 * Returns the home app data.
 * @returns The home app data.
 */
export const homeAppData = async (): Promise<HomeAppData> => {
  const page = await homePageData(),
    social = await socialData(),
    articles = await articlesData(),
    projects = await projectsData(),
    data = await Promise.all([page, social, articles, projects]).then(
      ([page, social, articles, projects]) => {
        const { meta, ...newPage } = page,
          newArticles =
            articles?.map(({ component, ...article }) => article) || undefined,
          newProjects =
            projects?.map(({ component, ...project }) => project) || undefined

        return {
          ...newPage,
          links: social,
          articles: newArticles,
          projects: newProjects
        }
      }
    )

  return data
}

/**
 * Returns the skills app data.
 * @returns The skills app data.
 */
export const skillsPageData = async (): Promise<SkillsPageData> =>
  await fetchPageData(apiUrls.skills)

/**
 * Returns the skills app data.
 * @returns The skills app data.
 */
export const skillsAppData = async (): Promise<SkillsAppData> => {
  const page = await skillsPageData(),
    data = await Promise.all([page]).then(([page]) => {
      const { meta, ...newPage } = page

      return {
        ...newPage
      }
    })

  return data
}

/**
 * Returns the work app data.
 * @returns The work app data.
 */
export const workPageData = async (): Promise<WorkPageData> =>
  await fetchPageData(apiUrls.work)

/**
 * Returns the work app data.
 * @returns The work app data.
 */
export const workAppData = async (): Promise<WorkPageData> => {
  const page = await workPageData(),
    data = await Promise.all([page]).then(([page]) => {
      const { meta, ...newPage } = page

      return {
        ...newPage
      }
    })

  return data
}

/**
 * Returns the articles page data.
 * @returns The articles page data.
 */
export const articlesPageData = async (): Promise<ArticlesPageData> =>
  await fetchPageData(apiUrls.articles)

/**
 * Returns the articles app data.
 * @returns The articles app data.
 */
export const articlesAppData = async (): Promise<ArticlesAppData> => {
  const page = await articlesPageData(),
    articles = await articlesData(),
    data = await Promise.all([page, articles]).then(([page, articles]) => {
      const { meta, ...newPage } = page,
        newArticles =
          articles?.map(({ component, ...article }) => article) || undefined

      return {
        ...newPage,
        articles: newArticles
      }
    })

  return data
}

/**
 * Return the projects page data.
 * @returns The projects page data.
 */
export const projectsPageData = async (): Promise<ProjectsPageData> =>
  await fetchPageData(apiUrls.projects)

/**
 * Returns the projects app data.
 * @returns The projects app data.
 */
export const projectsAppData = async (): Promise<ProjectsAppData> => {
  const page = await projectsPageData(),
    projects = await projectsData(),
    data = await Promise.all([page, projects]).then(([page, projects]) => {
      const { meta, ...newPage } = page,
        newProjects =
          projects?.map(({ component, ...project }) => project) || undefined

      return {
        ...newPage,
        projects: newProjects
      }
    })

  return data
}

/**
 * Returns the about app data.
 * @returns The about app data.
 */
export const aboutPageData = async (): Promise<AboutPageData> =>
  await fetchPageData(apiUrls.about)

/**
 * Returns the about app data.
 * @returns The about app data.
 */
export const aboutAppData = async (): Promise<AboutPageData> => {
  const page = await aboutPageData(),
    social = await socialData(),
    data = await Promise.all([page, social]).then(([page, social]) => {
      const { meta, ...newPage } = page

      return {
        ...newPage,
        social
      }
    })

  return data
}

/**
 * Returns the uses app data.
 * @returns The uses app data.
 */
export const usesPageData = async (): Promise<UsesPageData> =>
  await fetchPageData(apiUrls.uses)

/**
 * Returns the uses app data.
 * @returns The uses app data.
 */
export const usesAppData = async (): Promise<UsesPageData> => {
  const page = await usesPageData(),
    data = await Promise.all([page]).then(([page]) => {
      const { meta, ...newPage } = page

      return {
        ...newPage
      }
    })

  return data
}
