'use client'

import {
  ComponentResolverShared,
  PageContainerTemplate,
  type CtfPageFieldsFragment
} from '@guy-romelle-magayano/coin-colorful/components'
import {
  LayoutContext,
  layoutContextValues
} from '@guy-romelle-magayano/coin-colorful/contexts'

export type PageCtfComponentFeatureProps = CtfPageFieldsFragment

/**
 * Renders the page feature component for the `contentful` API to consume.
 * @param {PageCtfComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered feature component.
 */
const PageCtfComponentFeature = (props: PageCtfComponentFeatureProps) => {
  const { topSectionCollection, pageContent, extraSectionCollection } = props

  const topSection =
      topSectionCollection?.items?.filter(it => !!it) || undefined,
    content = pageContent,
    extraSection =
      extraSectionCollection?.items?.filter(it => !!it) || undefined

  const layoutConfig = {
    ...layoutContextValues,
    containerWidth: 1262
  }

  return (
    <PageContainerTemplate>
      {topSection?.map(entry => (
        <LayoutContext.Provider value={layoutConfig} key={entry!.sys.id}>
          <ComponentResolverShared componentProps={entry!} />
        </LayoutContext.Provider>
      ))}

      {content && Object.keys(content)?.length > 0 && (
        <LayoutContext.Provider
          value={layoutContextValues}
          key={content.sys?.id}
        >
          <ComponentResolverShared componentProps={content} />
        </LayoutContext.Provider>
      )}

      {extraSection?.map(entry => (
        <LayoutContext.Provider value={layoutConfig} key={entry!.sys.id}>
          <ComponentResolverShared componentProps={entry!} />
        </LayoutContext.Provider>
      ))}
    </PageContainerTemplate>
  )
}

PageCtfComponentFeature.displayName = 'PageCtfComponentFeature'

export default PageCtfComponentFeature
