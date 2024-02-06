'use client'

import { CSSProperties, ReactNode, forwardRef } from 'react'

import clsx from 'clsx'

import type { TWithChildren, TWithIDAndClass } from '@/types/common'

export type DivRef = HTMLDivElement

export type TContainerProps<T = object> = T &
  TWithChildren<T> &
  TWithIDAndClass<T> & {
    style?: CSSProperties
  }

export type TContainerType = typeof ContainerWithRef & {
  Outer: typeof OuterContainer
  Inner: typeof InnerContainer
}

/**
 * Renders the outer container component.
 * @param className - The class name of the outer container.
 * @param children - The children of the outer container.
 * @param rest - The rest of the props of the outer container.
 * @returns The rendered outer container component.
 */
const OuterContainer = forwardRef<DivRef, TContainerProps>(
  ({ className, children, ...rest }, ref): ReactNode => {
    return (
      <div ref={ref} className={className} {...rest}>
        <div className="mx-auto max-w-7xl">{children}</div>
      </div>
    )
  }
)

/**
 * Renders the inner container component.
 * @param className - The class name of the inner container.
 * @param children - The children of the inner container.
 * @param rest - The rest of the props of the inner container.
 * @returns The rendered inner container component.
 */
const InnerContainer = forwardRef<DivRef, TContainerProps>(
  ({ className, children, ...rest }, ref): ReactNode => {
    return (
      <div ref={ref} className={clsx('relative', className)} {...rest}>
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
  ({ children, ...rest }, ref): ReactNode => {
    return (
      <OuterContainer ref={ref} {...rest}>
        <InnerContainer>{children}</InnerContainer>
      </OuterContainer>
    )
  }
)

// Container component
const Container = ContainerWithRef as TContainerType

Container.Outer = OuterContainer
Container.Inner = InnerContainer

export default Container
