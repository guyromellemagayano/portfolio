/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronRightSvgIcon } from '@/components'
import {
    ICardCommonProps,
    ICardCtaProps,
    ICardEyebrowProps,
    ICardLinkProps,
    ICardProps,
    ICardTitleProps,
} from '@/interfaces'
import clsx from 'clsx'
import Link from 'next/link'

// Card component
const Card = ({ as: Component = 'div', className, children }: ICardProps & ICardCommonProps): React.ReactNode => {
    return <Component className={clsx('group relative flex flex-col items-start', className)}>{children}</Component>
}

// Card link component
Card.Link = function CardLink({ children, ...rest }: ICardLinkProps & ICardCommonProps & any): React.ReactNode {
    return (
        <>
            <div className="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl" />
            <Link {...rest}>
                <span className="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl" />
                <span className="relative z-10">{children}</span>
            </Link>
        </>
    )
}

// Card title component
Card.Title = function CardTitle({
    as: Component = 'h2',
    href,
    children,
    title,
    className,
}: ICardTitleProps & ICardCommonProps): React.ReactNode {
    return (
        <Component
            className={clsx('text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100', className)}
        >
            {href ? (
                <Card.Link href={href} title={title}>
                    {children}
                </Card.Link>
            ) : (
                children
            )}
        </Component>
    )
}

// Card description component
Card.Description = function CardDescription({ children, className }: ICardCommonProps): React.ReactNode {
    return <p className={clsx('relative z-10 my-2 text-sm text-zinc-600 dark:text-zinc-400', className)}>{children}</p>
}

// Card CTA component
Card.Cta = function CardCta({ title, children, href = '#' }: ICardCtaProps & ICardCommonProps): React.ReactNode {
    return (
        <div aria-hidden="true" className="relative z-10 mt-2 text-sm font-medium flex items-start text-amber-500">
            <Link
                href={href}
                title={title}
                className="transition hover:text-amber-600 dark:hover:text-amber-600 flex items-center"
            >
                {children}
                <ChevronRightSvgIcon className="ml-1 h-4 w-4 stroke-current" />
            </Link>
        </div>
    )
}

// Card eyebrow component
Card.Eyebrow = function CardEyebrow({
    as: Component = 'p',
    decorate = false,
    className,
    children,
    ...rest
}: ICardEyebrowProps & ICardCommonProps & any): React.ReactNode {
    return (
        <Component
            className={clsx('relative z-10 my-1 flex items-center text-sm font-medium', className, decorate && 'pl-3')}
            {...rest}
        >
            {decorate && (
                <span className="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
                    <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                </span>
            )}
            {children}
        </Component>
    )
}

export default Card
