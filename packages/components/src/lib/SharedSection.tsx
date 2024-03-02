import { ForwardedRef, HTMLAttributes, forwardRef, useId } from 'react'

type SharedSectionRef = HTMLElement

interface SharedSectionProps extends HTMLAttributes<SharedSectionRef> {}

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
      <section ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </section>
    )
  }
)

SharedSection.displayName = 'SharedSection'
