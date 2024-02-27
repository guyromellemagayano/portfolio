'use client'

import { ForwardedRef, forwardRef, HTMLAttributes, useId } from 'react'

import styled from 'styled-components'

type SharedHeaderRef = HTMLElement

/* eslint-disable-next-line */
export interface SharedHeaderProps extends HTMLAttributes<HTMLElement> {}

const StyledSharedHeader = styled.header``

/**
 * Render the shared header component.
 * @param children - The children of the shared header.
 * @param rest - The rest of the props of the shared header.
 * @param ref - Ref forwarding from parent component.
 * @returns The rendered shared header component.
 */
export const SharedHeader = forwardRef<SharedHeaderRef, SharedHeaderProps>(
  ({ children, ...rest }, ref: ForwardedRef<SharedHeaderRef>) => {
    // Generates a unique ID that can be used for accessibility attributes
    const customId = useId()

    return (
      <StyledSharedHeader ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </StyledSharedHeader>
    )
  }
)

// Set a display name for debugging purposes
SharedHeader.displayName = 'SharedHeader'

export default SharedHeader
