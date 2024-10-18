// import { ApolloQueryResult } from '@apollo/client'
// import { Metadata } from 'next'
// import dynamic from 'next/dynamic'
// import Script from 'next/script'

// import {
//   getSkillsPageAppQuery,
//   getSkillsPageMetaQuery,
//   type SkillsPageAppDataQuery,
//   type SkillsPageMetaQuery
// } from '@portfolio/graphql'
// import { getClient } from '@portfolio/libs'

// export const revalidate = 5

/**
 * Generates the metadata for the home page.
 * @returns The metadata for the home page.
 */
// export const generateMetadata = async (): Promise<Metadata> => {
//   const { data } = (await getClient().query({
//     query: getSkillsPageMetaQuery
//   })) as ApolloQueryResult<SkillsPageMetaQuery>

//   return {
//     title: data?.skillsPage?.meta?.title || undefined,
//     description: data?.skillsPage?.meta?.description || undefined
//   }
// }

// Dynamic imports
// const SkillsApp = dynamic(() =>
//   import('@portfolio/components').then(mod => mod.SkillsApp)
// )

/**
 * Renders the home page.
 * @returns The rendered home page
 */
const SkillsPage = async () => {
  // const { data } = (await getClient().query({
  //   query: getSkillsPageAppQuery
  // })) as ApolloQueryResult<SkillsPageAppDataQuery>

  // if (!data) return null

  return (
    <>
      <h1>Hello Skills</h1>
      {/* <Script
        id="homepage-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            ...(data?.skillsPage?.structuredData || undefined)
          })
        }}
      /> */}
      {/* <SkillsApp data={data} /> */}
    </>
  )
}

SkillsPage.displayName = 'SkillsPage'

export default SkillsPage
