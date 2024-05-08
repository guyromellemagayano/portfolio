'use client'

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

export type ComponentResolverProps = {
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
 * Renders a component based on the provided props and GraphQL configuration.
 * @param componentProps - The props for the component.
 * @param [inline=false] - Indicates whether the component should be rendered inline.
 * @param forceGql - Indicates whether to force the use of GraphQL for the component.
 * @param className - The CSS class name for the component.
 * @returns The rendered component.
 */
const ComponentResolver = ({
  componentProps,
  inline = false,
  forceGql,
  className
}: ComponentResolverProps) => {
  const { previewActive, locale } = useContentfulContext()

  const ComponentGql = componentGqlMap[componentProps.__typename]

  const shouldForceGql = useMemo(() => {
    if (forceGql === true) {
      return true
    }

    if (!ComponentGql) {
      return false
    }

    if (
      isObjectType(componentProps) &&
      Object.keys(componentProps).length > 3
    ) {
      // We expect components with no fragments set up to only contain 2 object
      // props. If there are more, it means we are providing fragments manually
      return false
    }

    if (
      !isNotNullOrUndefined(componentProps.__typename) ||
      !isNotNullOrUndefined(componentProps.sys)
    ) {
      // We expect exactly these keys to be present in the returned props if the
      // fragment was not specified for this component
      return false
    }

    return true
  }, [ComponentGql, componentProps, forceGql])

  const Component = !shouldForceGql && componentMap[componentProps.__typename]

  const previousComponentProp = previousComponent

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

ComponentResolver.displayName = 'ComponentResolver'

export default ComponentResolver
