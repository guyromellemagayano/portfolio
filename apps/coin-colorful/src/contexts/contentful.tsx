import { ReactNode, createContext } from 'react'

import { isStringType } from '@guy-romelle-magayano/react-utils'

import { CONTENTFUL_CONFIG } from '@guy-romelle-magayano/coin-colorful/configs'

export type ContentfulContextValueProps = {
  locale: string
  spaceIds: {
    main: string
  }
  previewActive: boolean
}

export const contentfulContextValues = {
  locale: 'en',
  spaceIds: {
    main: CONTENTFUL_CONFIG.contentful.space_id
  },
  previewActive: false
}

export type ContentfulContentProviderProps = {
  children: ReactNode
  router: any
}

export const ContentfulContext = createContext<ContentfulContextValueProps>(
  contentfulContextValues
)

/**
 * Provides content from Contentful to the application.
 * @param children - The child components to render.
 * @param router - The router object containing the query parameters.
 * @returns The contentful context provider.
 */
export const ContentfulContentProvider = ({
  children,
  router
}: ContentfulContentProviderProps) => {
  const previewActive = !!router.query.preview

  return (
    <ContentfulContext.Provider
      value={{
        locale: typeof router.locale === 'string' ? router.locale : 'en',
        spaceIds: contentfulContextValues.spaceIds,
        previewActive
      }}
    >
      {children}
    </ContentfulContext.Provider>
  )
}
