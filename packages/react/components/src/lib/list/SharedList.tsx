import { ForwardedRef, HTMLAttributes, forwardRef, useId } from 'react'

import { TCommonSharedComponentsProps } from '@guy-romelle-magayano/react-components/server'
import { cn } from '@guy-romelle-magayano/react-utils/server'

type TSharedListRef = HTMLUListElement & HTMLOListElement

type TSharedListProps = HTMLAttributes<TSharedListRef> &
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
export const SharedList = forwardRef<TSharedListRef, TSharedListProps>(
  (
    { as: Component = 'ul', children, ...rest },
    ref: ForwardedRef<TSharedListRef>
  ) => {
    // Generates a unique ID that can be used for accessibility attributes
    const customId = useId()

    return (
      <Component
        ref={ref}
        {...rest}
        id={rest.id ?? customId}
        className={cn(rest.className)}
      >
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
    <li
      ref={ref}
      {...rest}
      id={rest.id ?? customId}
      className={cn(rest.className)}
    >
      {children}
    </li>
  )
})

SharedListItem.displayName = 'SharedListItem'
