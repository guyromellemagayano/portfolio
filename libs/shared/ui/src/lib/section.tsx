'use client'

import { ForwardedRef, forwardRef, HTMLAttributes, useId } from 'react'

import styled from 'styled-components'

/* eslint-disable-next-line */
export interface SharedSectionUiProps extends HTMLAttributes<HTMLElement> {}

export type SectionRef = HTMLElement

const StyledSharedSectionUi = styled.section``

/**
 * Render the shared section component.
 * @param children - The children of the shared section.
 * @param rest - The rest of the props of the shared section.
 * @param ref - Ref forwarding from parent component.
 * @returns The rendered shared section component.
 */
const SharedSectionUi = forwardRef<SectionRef, SharedSectionUiProps>(
  ({ children, ...rest }, ref: ForwardedRef<SectionRef>) => {
    // Generates a unique ID that can be used for accessibility attributes
    const customId = useId()

    return (
      <StyledSharedSectionUi ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </StyledSharedSectionUi>
    )
  }
)

// Set a display name for debugging purposes
SharedSectionUi.displayName = 'Section'

export default SharedSectionUi
