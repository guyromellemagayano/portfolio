'use client'

import { ReactNode, createContext } from 'react'

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
} as ContentfulContextValueProps

export const ContentfulContext = createContext<ContentfulContextValueProps>(
  contentfulContextValues
)

export type ContentfulContentProviderProps = {
  children: ReactNode
  router: any
}

/**
 * Provides content from Contentful to the application.
 * @param {ContentfulContentProviderProps} props - The properties of the contentful content provider.
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

ContentfulContentProvider.displayName = 'ContentfulContentProvider'
