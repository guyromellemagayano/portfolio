import { ForwardedRef, HTMLAttributes, forwardRef, useId } from 'react'

import { TCommonSharedComponentsProps } from '../../components'

type SharedListRef = HTMLUListElement & HTMLOListElement

type TSharedListProps = HTMLAttributes<SharedListRef> &
  TCommonSharedComponentsProps & {
    as?: 'ul' | 'ol'
  }

/**
 * Render the shared list component.
 * @param as - The type of list to render.
 * @param children - The children of the shared list.
 * @param rest - The rest of the props of the shared list.
 * @param ref - Ref forwarding from parent component.
 * @returns The rendered shared list component.
 */
export const SharedList = forwardRef<SharedListRef, TSharedListProps>(
  (
    { as: Component = 'ul', children, ...rest },
    ref: ForwardedRef<SharedListRef>
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

SharedList.displayName = 'SharedList'

type SharedListItemRef = HTMLLIElement

type TSharedListItemProps = HTMLAttributes<SharedListItemRef> &
  TCommonSharedComponentsProps & {}

export const SharedListItem = forwardRef<
  SharedListItemRef,
  TSharedListItemProps
>(({ children, ...rest }, ref: ForwardedRef<SharedListItemRef>) => {
  // Generates a unique ID that can be used for accessibility attributes
  const customId = useId()

  return (
    <li ref={ref} {...rest} id={rest.id ?? customId}>
      {children}
    </li>
  )
})

SharedListItem.displayName = 'SharedListItem'
