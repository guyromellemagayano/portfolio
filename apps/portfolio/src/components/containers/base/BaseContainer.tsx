import { forwardRef, memo } from 'react'

import { Div, type TDivisionProps, type TDivisionRef } from '@react-components'

import { cn } from '@react-utils'

export type BaseContainerRef = TDivisionRef
export type BaseContainerProps = TDivisionProps

/**
 * Render the outer container component.
 * @param {BaseContainerProps} props - The component props
 * @param {BaseContainerRef} ref - The component reference
 * @returns The rendered outer container component
 */
const OuterContainer = memo(
  forwardRef<BaseContainerRef, BaseContainerProps>(
    ({ children, className, ...rest }, ref) => {
      return (
        <Div ref={ref} className={cn('sm:px-8', className)} {...rest}>
          <Div className={cn('mx-auto w-full max-w-7xl lg:px-8')}>
            {children}
          </Div>
        </Div>
      )
    }
  )
)

OuterContainer.displayName = 'OuterContainer'

/**
 * Render the inner container component.
 * @param {BaseContainerProps} props - The component props
 * @param {BaseContainerRef} ref - The component reference
 * @returns The rendered inner container component
 */
const InnerContainer = memo(
  forwardRef<BaseContainerRef, BaseContainerProps>(
    ({ children, className, ...rest }, ref) => {
      return (
        <Div
          ref={ref}
          className={cn('relative px-4 sm:px-8 lg:px-12', className)}
          {...rest}
        >
          <Div className={cn('mx-auto w-full max-w-2xl lg:max-w-4xl')}>
            {children}
          </Div>
        </Div>
      )
    }
  )
)

InnerContainer.displayName = 'InnerContainer'

/**
 * Render the base container component.
 * @param {BaseContainerProps} props - The component props
 * @param {BaseContainerRef} ref - The component reference
 * @returns The rendered base container component
 */
const BaseContainerWithRef = memo(
  forwardRef<BaseContainerRef, BaseContainerProps>(
    ({ children, ...rest }, ref) => {
      return (
        <OuterContainer ref={ref} {...rest}>
          <InnerContainer>{children}</InnerContainer>
        </OuterContainer>
      )
    }
  )
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
