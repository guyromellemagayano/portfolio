/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAvatarContainerProps } from '@/interfaces'
import clsx from 'clsx'

// Avatar container component
const AvatarContainer = ({ className, ...rest }: IAvatarContainerProps & any): React.ReactNode => {
    return (
        <div
            className={clsx(
                className,
                'h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10'
            )}
            {...rest}
        />
    )
}

export default AvatarContainer
