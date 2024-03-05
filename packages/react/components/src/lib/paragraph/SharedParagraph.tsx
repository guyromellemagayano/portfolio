import { ForwardedRef, HTMLAttributes, forwardRef, useId } from 'react'

import { TCommonSharedComponentsProps } from '../../components'

type SharedParagraphRef = HTMLParagraphElement

type TSharedParagraphProps = HTMLAttributes<SharedParagraphRef> &
  TCommonSharedComponentsProps & {}

/**
 * Render the shared paragraph component.
 * @param children - The children of the shared paragraph.
 * @param rest - The rest of the props of the shared paragraph.
 * @param ref - Ref forwarding from parent component.
 * @returns The rendered shared paragraph component.
 */
export const SharedParagraph = forwardRef<
  SharedParagraphRef,
  TSharedParagraphProps
>(({ children, ...rest }, ref: ForwardedRef<SharedParagraphRef>) => {
  // Generates a unique ID that can be used for accessibility attributes
  const customId = useId()

  return (
    <p ref={ref} {...rest} id={rest.id ?? customId}>
      {children}
    </p>
  )
})

SharedParagraph.displayName = 'SharedParagraph'
