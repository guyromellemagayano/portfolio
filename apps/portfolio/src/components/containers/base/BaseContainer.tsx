import { forwardRef } from 'react'

import {
  Div,
  type DivisionProps,
  type DivisionRef
} from '@guy-romelle-magayano/react-components/server'

import { cn } from '@guy-romelle-magayano/react-utils'

export type BaseContainerRef = DivisionRef
export type BaseContainerProps = DivisionProps

/**
 * Render the outer container component.
 * @param {BaseContainerProps} props - The props of the outer container.
 * @param {BaseContainerRef} ref - The reference of the outer container.
 * @returns The rendered outer container component.
 */
const OuterContainer = forwardRef<BaseContainerRef, BaseContainerProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      children && (
        <Div {...rest} ref={ref} className={cn('sm:px-8', className)}>
          <Div className="mx-auto w-full max-w-7xl lg:px-8">{children}</Div>
        </Div>
      )
    )
  }
)

OuterContainer.displayName = 'OuterContainer'

/**
 * Render the inner container component.
 * @param {BaseContainerProps} props - The props of the inner container.
 * @param {BaseContainerRef} ref - The reference of the inner container.
 * @returns The rendered inner container component.
 */
const InnerContainer = forwardRef<BaseContainerRef, BaseContainerProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      children && (
        <Div
          {...rest}
          ref={ref}
          className={cn('relative px-4 sm:px-8 lg:px-12', className)}
        >
          <Div className="mx-auto w-full max-w-2xl lg:max-w-5xl">
            {children}
          </Div>
        </Div>
      )
    )
  }
)

InnerContainer.displayName = 'InnerContainer'

/**
 * Render the base container component.
 * @param {BaseContainerProps} props - The props of the base container.
 * @param {BaseContainerRef} ref - The reference of the base container.
 * @returns The rendered base container component.
 */
const BaseContainerWithRef = forwardRef<BaseContainerRef, BaseContainerProps>(
  ({ children, ...rest }, ref) => {
    return (
      children && (
        <OuterContainer {...rest} ref={ref}>
          <InnerContainer>{children}</InnerContainer>
        </OuterContainer>
      )
    )
  }
)

BaseContainerWithRef.displayName = 'BaseContainerWithRef'

export type BaseContainerType = typeof BaseContainerWithRef & {
  Outer: typeof OuterContainer
  Inner: typeof InnerContainer
}

const BaseContainer = BaseContainerWithRef as BaseContainerType

BaseContainer.displayName = 'BaseContainer'

BaseContainer.Outer = OuterContainer
BaseContainer.Inner = InnerContainer

export default BaseContainer
