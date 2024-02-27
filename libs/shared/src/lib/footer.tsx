'use client'

import { ForwardedRef, forwardRef, HTMLAttributes, useId } from 'react'

import styled from 'styled-components'

type SharedFooterRef = HTMLElement

/* eslint-disable-next-line */
export interface SharedFooterProps extends HTMLAttributes<SharedFooterRef> {}

const StyledSharedFooter = styled.footer``

/**
 * Render the shared footer component.
 * @param children - The children of the shared footer.
 * @param rest - The rest of the props of the shared footer.
 * @param ref - Ref forwarding from parent component.
 * @returns The rendered shared footer component.
 */
export const SharedFooter = forwardRef<SharedFooterRef, SharedFooterProps>(
  ({ children, ...rest }, ref: ForwardedRef<SharedFooterRef>) => {
    // Generates a unique ID that can be used for accessibility attributes
    const customId = useId()

    return (
      <StyledSharedFooter ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </StyledSharedFooter>
    )
  }
)

// Set a display name for debugging purposes
SharedFooter.displayName = 'Footer'

export default SharedFooter
