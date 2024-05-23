'use client'

import { ReactNode } from 'react'

import { ContentfulLivePreviewProvider } from '@contentful/live-preview/react'

import { useContentfulContext } from '@guy-romelle-magayano/coin-colorful/hooks'

export type LivePreviewProviderProps = {
  children: ReactNode
}

/**
 * Provides a live preview of content using the Contentful CMS.
 * @param children - The child components to render within the live preview provider.
 * @returns The rendered live preview provider component.
 */
export const LivePreviewProvider = ({ children }: LivePreviewProviderProps) => {
  const { previewActive, locale } = useContentfulContext()

  return (
    <ContentfulLivePreviewProvider
      locale={locale}
      enableInspectorMode={previewActive}
      enableLiveUpdates={previewActive}
    >
      {children}
    </ContentfulLivePreviewProvider>
  )
}

LivePreviewProvider.displayName = 'LivePreviewProvider'
