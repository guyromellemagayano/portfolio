'use client'

import { createContext, useContext } from 'react'

import { ContentfulLivePreviewProvider } from '@contentful/live-preview/react'
import { useSearchParams } from 'next/navigation'

import { CommonComponentsProps } from '@react-components'

import { CONTENTFUL_SPACE_ID } from '@portfolio/configs'
import { routingDefaults } from '@portfolio/i18n/routing'

export type TCtfContextValue = {
  locale: string
  spaceIds: TCtfContextValueSpaceIds
  previewActive: boolean
}
export type TCtfContextValueSpaceIds = {
  main: string
}

export const ctfContextValue: TCtfContextValue = {
  locale: routingDefaults.defaultLocale,
  spaceIds: {
    main: CONTENTFUL_SPACE_ID
  },
  previewActive: false
}

export const CtfContext = createContext<TCtfContextValue>(ctfContextValue)

export const useCtfContext = () => useContext(CtfContext)

export type TCtfLivePreviewProviderProps = Pick<
  CommonComponentsProps,
  'children'
>

/**
 * Loads the `contentful` live preview provider
 * @param TCtfLivePreviewProviderProps props - The provider props
 * @returns The rendered `contentful` live preview provider
 */
export const CtfLivePreviewProvider = ({
  children
}: TCtfLivePreviewProviderProps) => {
  const { previewActive, locale } = useCtfContext()

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

CtfLivePreviewProvider.displayName = 'CtfLivePreviewProvider'

export type TCtfProviderProps = Pick<CommonComponentsProps, 'children'>

/**
 * Loads the `contentful` provider
 * @param TCtfProviderProps props - The provider props
 * @returns The rendered `contentful` provider
 */
export const CtfProvider = ({ children }: TCtfProviderProps) => {
  const searchParams = useSearchParams()
  const previewActive = !!searchParams.get('preview')
  const locale = routingDefaults.defaultLocale

  return (
    <CtfContext.Provider
      value={{
        locale: locale,
        spaceIds: {
          main: CONTENTFUL_SPACE_ID
        },
        previewActive
      }}
    >
      <ContentfulLivePreviewProvider
        locale={locale}
        enableInspectorMode={previewActive}
        enableLiveUpdates={previewActive}
      >
        {children}
      </ContentfulLivePreviewProvider>
    </CtfContext.Provider>
  )
}

CtfProvider.displayName = 'CtfProvider'
