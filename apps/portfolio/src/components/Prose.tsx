'use client'

import { FC, useId } from 'react'

import clsx from 'clsx'

import type { TContainerProps } from '@guy-romelle-magayano/portfolio/types/common'

export type TProseProps = TContainerProps

/**
 * Renders the prose component.
 * @param id - The ID of the prose.
 * @param children - The children of the prose.
 * @param className - The class name of the prose.
 * @param rest - The rest of the prose props.
 * @returns The rendered prose component.
 */
const Prose: FC<TProseProps> = ({ id, children, className, ...rest }) => {
  const customId = useId()

  return (
    <div
      id={id || customId}
      className={clsx('prose dark:prose-invert', className)}
      {...rest}
    >
      {children}
    </div>
  )
}

export default Prose
