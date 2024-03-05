import {
  ElementType,
  ForwardedRef,
  HTMLAttributes,
  forwardRef,
  useId
} from 'react'

import { TCommonSharedComponentsProps } from '../../components'

type SharedLayoutRef = HTMLElement

type TSharedLayoutProps = HTMLAttributes<SharedLayoutRef> &
  TCommonSharedComponentsProps & {
    as?: ElementType
  }

/**
 * Render the shared layout component.
 * @param as - The type of layout to render.
 * @param children - The children of the shared layout.
 * @param rest - The rest of the props of the shared layout.
 * @param ref - Ref forwarding from parent component.
 * @returns The rendered shared layout component.
 */
export const SharedLayout = forwardRef<SharedLayoutRef, TSharedLayoutProps>(
  (
    { as: Component = 'div', children, ...rest },
    ref: ForwardedRef<SharedLayoutRef>
  ) => {
    // Generates a unique ID that can be used for accessibility attributes
    const customId = useId()

    return (
      <Component ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </Component>
    )
  }
)

SharedLayout.displayName = 'SharedLayout'
