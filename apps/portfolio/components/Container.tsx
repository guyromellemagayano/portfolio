'use client'

import clsx from 'clsx'
import { forwardRef } from 'react'
import { DivRef, TContainerProps, TContainerType } from 'types/components'

/**
 * A container component that wraps its children with an outer container.
 * @param {String} className - Additional class name(s) for custom styling.
 * @param {React.ReactNode} children - The children to be wrapped by the container.
 * @returns {JSX.Element} The rendered
 */
const OuterContainer = forwardRef<DivRef, TContainerProps>(
  function OuterContainer({ className, children, ...rest }, ref): JSX.Element {
    return (
      <div ref={ref} className={clsx('sm:px-8', className)} {...rest}>
        <div className="mx-auto max-w-7xl lg:px-8">{children}</div>
      </div>
    )
  }
)

/**
 * A container component that wraps its children with an inner container.
 * @param {String} className - Additional class name(s) for custom styling.
 * @param {React.ReactNode} children - The children to be wrapped by the container.
 * @returns {JSX.Element} The rendered component.
 */
const InnerContainer = forwardRef<DivRef, TContainerProps>(
  function InnerContainer({ className, children, ...rest }, ref): JSX.Element {
    return (
      <div
        ref={ref}
        className={clsx('relative px-4 sm:px-8 lg:px-12', className)}
        {...rest}
      >
        <div className="mx-auto max-w-2xl lg:max-w-5xl">{children}</div>
      </div>
    )
  }
)

/**
 * A container component that wraps its children with an outer and inner container.
 * @param {String} className - Additional class name(s) for custom styling.
 * @param {React.ReactNode} children - The children to be wrapped by the container.
 * @returns {JSX.Element} The rendered component.
 */
const ContainerWithRef = forwardRef<DivRef, TContainerProps>(
  function ContainerWithRef({ children, ...rest }, ref): JSX.Element {
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
