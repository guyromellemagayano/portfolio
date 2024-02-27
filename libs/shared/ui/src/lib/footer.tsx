import { ForwardedRef, forwardRef, HTMLAttributes, useId } from 'react'

import styled from 'styled-components'

/* eslint-disable-next-line */
export interface SharedFooterUiProps extends HTMLAttributes<HTMLElement> {}

export type FooterRef = HTMLElement

const StyledSharedFooterUi = styled.footer``

/**
 * Render the shared footer component.
 * @param children - The children of the shared footer.
 * @param rest - The rest of the props of the shared footer.
 * @param ref - Ref forwarding from parent component.
 * @returns The rendered shared footer component.
 */
const SharedFooterUi = forwardRef<FooterRef, SharedFooterUiProps>(
  ({ children, ...rest }, ref: ForwardedRef<FooterRef>) => {
    // Generates a unique ID that can be used for accessibility attributes
    const customId = useId()

    return (
      <StyledSharedFooterUi ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </StyledSharedFooterUi>
    )
  }
)

// Set a display name for debugging purposes
SharedFooterUi.displayName = 'Footer'

export default SharedFooterUi
