'use client'

import { Suspense } from 'react'

import { Skeleton } from '@/components'

import { useLazyLoading } from '@/hooks'

import { TAvatarProps } from '@/types/components'

/**
 * Render avatar component
 * @param {Boolean} large - Render a large avatar.
 * @param {String} className - Extend css classes to override default styling.
 * @param {any} rest - Other props to pass down to the component.
 * @returns {JSX.Element} The rendered component.
 */
const Avatar = ({
  large = false,
  className,
  ...rest
}: TAvatarProps): JSX.Element => {
  const AvatarContent = useLazyLoading({
    importFunction: () => import('./Content')
  })

  return (
    <Suspense fallback={<Skeleton.Avatar large={large} />}>
      <AvatarContent large={large} className={className} {...rest} />
    </Suspense>
  )
}

export default Avatar
