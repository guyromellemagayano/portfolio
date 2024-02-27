'use client'

import { ForwardedRef, forwardRef, HTMLAttributes, useId } from 'react'

import styled from 'styled-components'

type SharedSectionRef = HTMLElement

/* eslint-disable-next-line */
export interface SharedSectionProps extends HTMLAttributes<SharedSectionRef> {}

const StyledSharedSection = styled.section``

/**
 * Render the shared section component.
 * @param children - The children of the shared section.
 * @param rest - The rest of the props of the shared section.
 * @param ref - Ref forwarding from parent component.
 * @returns The rendered shared section component.
 */
export const SharedSection = forwardRef<SharedSectionRef, SharedSectionProps>(
  ({ children, ...rest }, ref: ForwardedRef<SharedSectionRef>) => {
    // Generates a unique ID that can be used for accessibility attributes
    const customId = useId()

    return (
      <StyledSharedSection ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </StyledSharedSection>
    )
  }
)

// Set a display name for debugging purposes
SharedSection.displayName = 'Section'

export default SharedSection
