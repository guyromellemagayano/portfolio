'use client'

import { forwardRef, useId } from 'react'

import { TContainerProps } from '@/types/common'

export type DivRef = HTMLDivElement

/**
 * Renders the outer container component.
 * @param children - The children of the outer container.
 * @param rest - The rest of the props of the outer container.
 * @returns The rendered outer container component.
 */
const OuterContainer = forwardRef<DivRef, TContainerProps>(
  ({ id, children, ...rest }, ref) => {
    const customId = useId()

    return (
      <div ref={ref} id={id || customId} {...rest}>
        <div className="mx-auto max-w-7xl">{children}</div>
      </div>
    )
  }
)

/**
 * Renders the inner container component.
 * @param children - The children of the inner container.
 * @param rest - The rest of the props of the inner container.
 * @returns The rendered inner container component.
 */
const InnerContainer = forwardRef<DivRef, TContainerProps>(
  ({ id, children, ...rest }, ref) => {
    const customId = useId()

    return (
      <div ref={ref} id={id || customId} {...rest}>
        <div className="mx-auto max-w-2xl lg:max-w-5xl">{children}</div>
      </div>
    )
  }
)

/**
 * Renders the container component.
 * @param children - The children of the container.
 * @param rest - The rest of the props of the container.
 * @returns The rendered container component.
 */
const ContainerWithRef = forwardRef<DivRef, TContainerProps>(
  ({ children, ...rest }, ref) => {
    return (
      <OuterContainer ref={ref} {...rest}>
        <InnerContainer className="relative">{children}</InnerContainer>
      </OuterContainer>
    )
  }
)

export type TContainerType = typeof ContainerWithRef & {
  Outer: typeof OuterContainer
  Inner: typeof InnerContainer
}

// Container component
const Container = ContainerWithRef as TContainerType

Container.Outer = OuterContainer
Container.Inner = InnerContainer

export default Container
