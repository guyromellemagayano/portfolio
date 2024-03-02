import { ForwardedRef, HTMLAttributes, forwardRef, useId } from 'react'

import { TCommonSharedComponentsProps } from '@guy-romelle-magayano/components/server'

type SharedSectionRef = HTMLElement

export type TSharedSectionProps = HTMLAttributes<SharedSectionRef> &
  TCommonSharedComponentsProps & {}

/**
 * Render the shared section component.
 * @param children - The children of the shared section.
 * @param rest - The rest of the props of the shared section.
 * @param ref - Ref forwarding from parent component.
 * @returns The rendered shared section component.
 */
export const SharedSection = forwardRef<SharedSectionRef, TSharedSectionProps>(
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
