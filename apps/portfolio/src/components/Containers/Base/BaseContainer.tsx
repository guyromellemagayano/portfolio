import { forwardRef } from 'react'

import dynamic from 'next/dynamic'

import {
  DivisionProps,
  DivisionRef
} from '@guy-romelle-magayano/react-components/server'
import { CommonComponentsProps } from '@guy-romelle-magayano/react-components/types'

import { cn } from '@guy-romelle-magayano/react-utils'

// Dynamic imports
const Div = dynamic(() =>
  import('@guy-romelle-magayano/react-components/server').then(mod => mod.Div)
)

export type BaseContainerRef = DivisionRef
export type BaseContainerProps = DivisionProps & CommonComponentsProps

/**
 * Render the outer container component.
 * @param children - The children of the outer container.
 * @param className - The class name of the outer container.
 * @param rest - The rest of the props of the outer container.
 * @returns The rendered outer container component.
 */
const OuterContainer = forwardRef<BaseContainerRef, BaseContainerProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <Div ref={ref} {...rest} className={cn('sm:px-8', className)}>
        <Div className="mx-auto max-w-7xl lg:px-8">{children}</Div>
      </Div>
    )
  }
)

OuterContainer.displayName = 'OuterContainer'

/**
 * Render the inner container component.
 * @param children - The children of the inner container.
 * @param className - The class name of the inner container.
 * @param rest - The rest of the props of the inner container.
 * @returns The rendered inner container component.
 */
const InnerContainer = forwardRef<BaseContainerRef, BaseContainerProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <Div
        ref={ref}
        {...rest}
        className={cn('relative px-4 sm:px-8 lg:px-12', className)}
      >
        <Div className="mx-auto max-w-2xl lg:max-w-5xl">{children}</Div>
      </Div>
    )
  }
)

InnerContainer.displayName = 'InnerContainer'

/**
 * Render the base container component.
 * @param children - The children of the base container.
 * @returns The rendered base container component.
 */
const BaseContainerWithRef = forwardRef<BaseContainerRef, BaseContainerProps>(
  ({ children, ...rest }, ref) => {
    return (
      <OuterContainer ref={ref} {...rest}>
        <InnerContainer>{children}</InnerContainer>
      </OuterContainer>
    )
  }
)

export type BaseContainerType = typeof BaseContainerWithRef & {
  Outer: typeof OuterContainer
  Inner: typeof InnerContainer
}

const BaseContainer = BaseContainerWithRef as BaseContainerType

BaseContainer.displayName = 'BaseContainer'

BaseContainer.Outer = OuterContainer
BaseContainer.Inner = InnerContainer

export default BaseContainer
