'use client'

import { ForwardedRef, forwardRef, HTMLAttributes, useId } from 'react'

import styled from 'styled-components'

/* eslint-disable-next-line */
export interface SharedHeaderUiProps extends HTMLAttributes<HTMLElement> {}

export type HeaderRef = HTMLElement

const StyledSharedHeaderUi = styled.header``

/**
 * Render the shared header component.
 * @param children - The children of the shared header.
 * @param rest - The rest of the props of the shared header.
 * @param ref - Ref forwarding from parent component.
 * @returns The rendered shared header component.
 */
const SharedHeaderUi = forwardRef<HeaderRef, SharedHeaderUiProps>(
  ({ children, ...rest }, ref: ForwardedRef<HeaderRef>) => {
    // Generates a unique ID that can be used for accessibility attributes
    const customId = useId()

    return (
      <StyledSharedHeaderUi ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </StyledSharedHeaderUi>
    )
  }
)

// Set a display name for debugging purposes
SharedHeaderUi.displayName = 'Header'

export default SharedHeaderUi
