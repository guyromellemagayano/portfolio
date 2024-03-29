import { forwardRef } from 'react'

import dynamic from 'next/dynamic'

import {
  DivisionProps,
  DivisionRef
} from '@guy-romelle-magayano/react-components/server'
import { CommonComponentsProps } from '@guy-romelle-magayano/react-components/types'

import { cn } from '@guy-romelle-magayano/react-utils'

// Dynamic imports
const Div = dynamic(() =>
  import('@guy-romelle-magayano/react-components/server').then(mod => mod.Div)
)

export type AvatarContainerRef = DivisionRef
export type AvatarContainerProps = DivisionProps & CommonComponentsProps

/**
 * Renders avatar container component
 * @param className - The class name of the component.
 * @param rest - Other props to pass down to the component.
 * @returns The avatar container component.
 */
const AvatarContainer = forwardRef<AvatarContainerRef, AvatarContainerProps>(
  ({ className, ...rest }, ref) => {
    return (
      <Div
        ref={ref}
        {...rest}
        className={cn(
          className,
          'h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10'
        )}
      />
    )
  }
)

AvatarContainer.displayName = 'AvatarContainer'

export default AvatarContainer
