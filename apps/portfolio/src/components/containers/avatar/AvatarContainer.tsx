import { forwardRef } from 'react'

import { Div, type TDivisionProps, type TDivisionRef } from '@react-components'

import { cn } from '@react-utils'

export type AvatarContainerRef = TDivisionRef
export type AvatarContainerProps = TDivisionProps

/**
 * Renders avatar container component.
 * @param {AvatarContainerProps} props - The component props
 * @param {AvatarContainerRef} ref - The component reference
 * @returns The rendered avatar container component
 */
const AvatarContainer = forwardRef<AvatarContainerRef, AvatarContainerProps>(
  ({ className, ...rest }, ref) => {
    return (
      <Div
        ref={ref}
        className={cn(
          'h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10',
          className
        )}
        {...rest}
      />
    )
  }
)

AvatarContainer.displayName = 'AvatarContainer'

export default AvatarContainer
