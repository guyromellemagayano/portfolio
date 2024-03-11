import { ForwardedRef, HTMLAttributes, forwardRef, useId } from 'react'

import { TCommonSharedComponentsProps } from '@guy-romelle-magayano/react-components/server'
import { cn } from '@guy-romelle-magayano/react-utils/server'

type SharedParagraphRef = HTMLParagraphElement

type TSharedParagraphProps = HTMLAttributes<SharedParagraphRef> &
  TCommonSharedComponentsProps & {}

/**
 * Render the shared paragraph component.
 * @param className - The class name of the shared paragraph.
 * @param children - The children of the shared paragraph.
 * @param rest - The rest of the props of the shared paragraph.
 * @param ref - Ref forwarding from parent component.
 * @returns The rendered shared paragraph component.
 */
export const SharedParagraph = forwardRef<
  SharedParagraphRef,
  TSharedParagraphProps
>(({ className, children, ...rest }, ref: ForwardedRef<SharedParagraphRef>) => {
  // Generates a unique ID that can be used for accessibility attributes
  const customId = useId()

  return (
    <p ref={ref} {...rest} id={rest.id ?? customId} className={cn(className)}>
      {children}
    </p>
  )
})

SharedParagraph.displayName = 'SharedParagraph'
