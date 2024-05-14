import { useMemo } from 'react'

import { Box } from '@mui/material'

import {
  isNotNullOrUndefined,
  isObjectType
} from '@guy-romelle-magayano/react-utils'

import {
  componentGqlMap,
  componentMap
} from '@guy-romelle-magayano/coin-colorful/configs'
import { useContentfulContext } from '@guy-romelle-magayano/coin-colorful/hooks'

let previousComponent: string | null = null

export type ComponentResolverSharedProps = {
  componentProps: {
    sys: { id: string }
    __typename: string
    [k: string]: any
  }

  /**
   * forces to do a graqhql request to get its content, instead
   * of expecting content is provided trough `props.componentProps`:
   */
  forceGql?: boolean

  className?: string
  inline?: boolean
}

/**
 * Renders the shared component resolver component for the `contentful` API to consume.
 * @param {ComponentResolverSharedProps} props - The properties to render the component with.
 * @returns The rendered component.
 */
const ComponentResolverShared = (props: ComponentResolverSharedProps) => {
  const { componentProps, inline = false, forceGql, className } = props

  const { previewActive, locale } = useContentfulContext()

  const ComponentGql = componentGqlMap[componentProps.__typename]

  const shouldForceGql = useMemo(() => {
    if (isNotNullOrUndefined(forceGql) && forceGql) {
      return true
    }

    if (!ComponentGql) {
      return false
    }

    if (componentProps && Object.keys(componentProps).length > 3) {
      // We expect components with no fragments set up to only contain 2 object
      // props. If there are more, it means we are providing fragments manually
      return false
    }

    if (!componentProps.__typename || !componentProps.sys) {
      // We expect exactly these keys to be present in the returned props if the
      // fragment was not specified for this component
      return false
    }

    return true
  }, [ComponentGql, componentProps, forceGql])

  const Component = !shouldForceGql && componentMap[componentProps.__typename],
    previousComponentProp = previousComponent

  previousComponent = componentProps.__typename

  if (!Component && !ComponentGql) {
    return null
  }

  return (
    <Box
      position="relative"
      component={inline ? 'span' : 'div'}
      className={componentProps.__typename}
    >
      {Component ? (
        <Component
          {...componentProps}
          locale={locale}
          className={className}
          previousComponent={previousComponentProp}
        />
      ) : (
        <ComponentGql
          id={componentProps.sys.id}
          __typename={componentProps.__typename}
          className={className}
          preview={previewActive}
          locale={locale}
          previousComponent={previousComponentProp}
        />
      )}
    </Box>
  )
}

ComponentResolverShared.displayName = 'ComponentResolverShared'

export default ComponentResolverShared
