import { ForwardedRef, HTMLAttributes, forwardRef, useId } from 'react'

import { TCommonSharedComponentsProps } from '../../components'

type SharedPreformattedTextRef = HTMLPreElement

type TSharedPreformattedTextProps = HTMLAttributes<SharedPreformattedTextRef> &
  TCommonSharedComponentsProps & {}

/**
 * Render the shared preformatted text component.
 * @param children - The children of the shared preformatted text.
 * @param rest - The rest of the props of the shared preformatted text.
 * @param ref - Ref forwarding from parent component.
 * @returns The rendered shared preformatted text component.
 */
export const SharedPreformattedText = forwardRef<
  SharedPreformattedTextRef,
  TSharedPreformattedTextProps
>(({ children, ...rest }, ref: ForwardedRef<SharedPreformattedTextRef>) => {
  // Generates a unique ID that can be used for accessibility attributes
  const customId = useId()

  return (
    <pre ref={ref} {...rest} id={rest.id ?? customId}>
      {children}
    </pre>
  )
})

SharedPreformattedText.displayName = 'SharedPreformattedText'
