'use client'

import { ReactNode } from 'react'

import clsx from 'clsx'

import {
  TBlockProps,
  TWithChildren,
  TWithClassName,
  TWithIDAndClass
} from '@/types/common'

export type TAvatarProps<T = object> = T &
  TWithIDAndClass<T> &
  TWithChildren<T> & { large?: boolean; style?: React.CSSProperties }

/**
 * Renders the skeleton component.
 * @param as - The component to render.
 * @param className - Additional CSS classes to apply to the skeleton component.
 * @param children - The content to render inside the skeleton.
 * @returns The rendered skeleton component.
 */
const Skeleton = ({
  as: Component = 'div',
  className,
  children
}: TBlockProps): ReactNode => {
  return (
    <Component role="status" className={className}>
      {children}
    </Component>
  )
}

/**
 * Renders the avatar skeleton component.
 * @param className - Additional CSS classes to apply to the avatar skeleton component.
 * @param large - Whether the avatar is large.
 * @returns The rendered avatar skeleton component.
 */
const Avatar = ({ className, large }: TAvatarProps): ReactNode => {
  return (
    <main role="status" className={className}>
      <div
        className={clsx(
          'animate-pulse rounded-full bg-gray-200 dark:bg-gray-700',
          large ? 'h-16 w-16' : 'h-9 w-9'
        )}
      />
    </main>
  )
}

/**
 * Renders the social link skeleton component.
 * @param className - Additional CSS classes to apply to the social link skeleton component.
 * @returns The rendered social link skeleton component.
 */
const SocialLink = ({ className }: TWithClassName): ReactNode => {
  return (
    <main role="status" className={className}>
      <div className="animate-pulse">
        <div className="mt-4 group -m-1 p-1 flex ">
          <span className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded" />
          <span className="ml-4 w-28 h-6 bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="mt-4 group -m-1 p-1 flex ">
          <span className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded" />
          <span className="ml-4 w-28 h-6 bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="mt-4 group -m-1 p-1 flex ">
          <span className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded" />
          <span className="ml-4 w-28 h-6 bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </main>
  )
}

/**
 * Renders the photo layout skeleton component.
 * @param className - Additional CSS classes to apply to the photo layout skeleton component.
 * @returns The rendered photo layout skeleton component.
 */
const PhotoLayout = ({ className }: TWithClassName): ReactNode => {
  return (
    <main role="status" className={className}>
      <div className="mt-16 sm:mt-20">
        <div className="animate-pulse -my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
          <div className="h-80 bg-gray-200 dark:bg-gray-700 relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl sm:w-72 sm:rounded-2xl" />
          <div className="h-80 bg-gray-200 dark:bg-gray-700 relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl sm:w-72 sm:rounded-2xl" />
          <div className="h-80 bg-gray-200 dark:bg-gray-700 relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl sm:w-72 sm:rounded-2xl" />
          <div className="h-80 bg-gray-200 dark:bg-gray-700 relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl sm:w-72 sm:rounded-2xl" />
          <div className="h-80 bg-gray-200 dark:bg-gray-700 relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl sm:w-72 sm:rounded-2xl" />
        </div>
      </div>
    </main>
  )
}

/**
 * Renders the resume layout skeleton component.
 * @param className - Additional CSS classes to apply to the resume layout skeleton component.
 * @returns The rendered resume layout skeleton component.
 */
const ResumeLayout = ({ className }: TWithClassName): ReactNode => {
  return (
    <main role="status" className={className}>
      <div className="animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-700 w-full p-6 h-96" />
    </main>
  )
}

/**
 * Renders the section layout skeleton component.
 * @param className - Additional CSS classes to apply to the section layout skeleton component.
 * @returns The rendered section layout skeleton component.
 */
const SectionLayout = ({ className }: TWithClassName): ReactNode => {
  return (
    <main role="status" className={className}>
      <div className="md:grid md:grid-cols-4 md:items-baseline animate-pulse">
        <div className="h-6 bg-gray-200 rounded dark:bg-gray-700 w-full max-w-32" />
        <div className="md:col-span-3 group relative flex flex-col items-start">
          <div className="mt-4 mb-1 h-6 bg-gray-200 rounded dark:bg-gray-700 w-full max-w-32" />
          <div className="mt-1 mb-4 h-6 bg-gray-200 rounded dark:bg-gray-700 w-full max-w-48" />
          <div className="my-2 h-6 bg-gray-200 rounded dark:bg-gray-700 w-full max-w-lg" />
          <div className="my-2 h-6 bg-gray-200 rounded dark:bg-gray-700 w-full max-w-xl" />
          <div className="my-2 h-6 bg-gray-200 rounded dark:bg-gray-700 w-full max-w-md" />
          <div className="flex flex-row items-start gap-x-6 mt-4 mb-2 w-full">
            <div className="h-6 bg-gray-200 rounded dark:bg-gray-700 w-full max-w-32" />
            <div className="h-6 relative grid grid-cols-6 col-span-6 gap-6 text-zinc-400 dark:text-zinc-500 w-full">
              <div className="h-6 bg-gray-200 rounded dark:bg-gray-700 w-full max-w-28" />
              <div className="h-6 bg-gray-200 rounded dark:bg-gray-700 w-full max-w-28" />
              <div className="h-6 bg-gray-200 rounded dark:bg-gray-700 w-full max-w-28" />
              <div className="h-6 bg-gray-200 rounded dark:bg-gray-700 w-full max-w-28" />
              <div className="h-6 bg-gray-200 rounded dark:bg-gray-700 w-full max-w-28" />
              <div className="h-6 bg-gray-200 rounded dark:bg-gray-700 w-full max-w-28" />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

/**
 * Rendersthe image layout skeleton content.
 * @param {Object} props - The props object.
 * @returns The image layout skeleton content component.
 */
const ImageLayout = (props: TWithClassName): ReactNode => {
  return (
    <main role="status" className={props?.className || ''}>
      <div className="animate-pulse ">
        <div className="aspect-square rotate-3 rounded-2xl object-cover bg-gray-200 dark:bg-gray-700 w-full h-[34.375rem]" />
      </div>
    </main>
  )
}

/**
 * Renders the content simple layout skeleton content.
 * @param {Object} props - The props object.
 * @returns The content simple layout skeleton content component.
 */
const ContentSimpleLayout = (props: TWithClassName): ReactNode => {
  return (
    <main
      role="status"
      className={clsx('sm:px-8 mt-16 sm:mt-32', props?.className || '')}
    >
      <section className="mx-auto max-w-7xl sm:px-8 animate-pulse">
        <article className="relative px-4 sm:px-8 lg:px-12">
          <div className="mx-auto w-full max-w-2xl lg:max-w-5xl">
            <div className="h-14 bg-gray-200 rounded dark:bg-gray-700 w-full max-w-md" />
            <div className="mt-2 h-14 bg-gray-200 rounded dark:bg-gray-700 w-full max-w-md" />
            <div className="mt-2 h-14 bg-gray-200 rounded dark:bg-gray-700 w-full max-w-xl" />
            <div className="mt-6 h-7 bg-gray-200 rounded dark:bg-gray-700 w-full max-w-lg" />
            <div className="mt-1 h-7 bg-gray-200 rounded dark:bg-gray-700 w-full max-w-2xl" />
            <div className="mt-1 h-7 bg-gray-200 rounded dark:bg-gray-700 w-full max-w-sm" />
            <div className="mt-6 flex gap-6">
              <div className="h-6 bg-gray-200 rounded dark:bg-gray-700 w-8" />
              <div className="h-6 bg-gray-200 rounded dark:bg-gray-700 w-8" />
              <div className="h-6 bg-gray-200 rounded dark:bg-gray-700 w-8" />
              <div className="h-6 bg-gray-200 rounded dark:bg-gray-700 w-8" />
            </div>
          </div>
        </article>
      </section>
    </main>
  )
}

/**
 * Renders the content aside layout skeleton content.
 * @param {Object} props - The props object.
 * @returns The content aside layout skeleton content component.
 */
const ContentAsideLayout = (props: TWithClassName): ReactNode => {
  return (
    <main role="status" className={props?.className || ''}>
      <section className="mx-auto w-full animate-pulse">
        <article className="relative">
          <div className="mx-auto w-full max-w-2xl lg:max-w-5xl">
            <div className="h-14 bg-gray-200 rounded dark:bg-gray-700 w-full max-w-md" />
            <div className="mt-2 h-14 bg-gray-200 rounded dark:bg-gray-700 w-full max-w-xl" />
            <div className="mt-2 h-14 bg-gray-200 rounded dark:bg-gray-700 w-full max-w-sm" />
            <div className="mt-6 h-7 bg-gray-200 rounded dark:bg-gray-700 w-full max-w-md" />
            <div className="mt-1 h-7 bg-gray-200 rounded dark:bg-gray-700 w-full max-w-2xl" />
            <div className="mt-1 h-7 bg-gray-200 rounded dark:bg-gray-700 w-full max-w-sm" />
            <div className="mt-6 h-7 bg-gray-200 rounded dark:bg-gray-700 w-full max-w-md" />
            <div className="mt-1 h-7 bg-gray-200 rounded dark:bg-gray-700 w-full max-w-2xl" />
            <div className="mt-1 h-7 bg-gray-200 rounded dark:bg-gray-700 w-full max-w-sm" />
          </div>
        </article>
      </section>
    </main>
  )
}

/**
 * Renders the social list skeleton component.
 * @param className - Additional CSS classes to apply to the social list skeleton component.
 * @returns The rendered social list skeleton component.
 */
const SocialList = ({ className }: TWithClassName): ReactNode => {
  return (
    <main role="status" className={className}>
      <div className="animate-pulse">
        <div className="mt-4 group -m-1 p-1 flex ">
          <span className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded" />
          <span className="ml-4 w-48 h-6 bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="mt-4 group -m-1 p-1 flex ">
          <span className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded" />
          <span className="ml-4 w-48 h-6 bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="mt-4 group -m-1 p-1 flex ">
          <span className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded" />
          <span className="ml-4 w-48 h-6 bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40 flex" />
        <div className="mt-8 group -m-1 p-1 flex ">
          <span className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded" />
          <span className="ml-4 w-48 h-6 bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </main>
  )
}

Skeleton.Avatar = Avatar
Skeleton.SocialLink = SocialLink
Skeleton.PhotoLayout = PhotoLayout
Skeleton.ResumeLayout = ResumeLayout
Skeleton.SectionLayout = SectionLayout
Skeleton.ImageLayout = ImageLayout
Skeleton.ContentSimpleLayout = ContentSimpleLayout
Skeleton.ContentAsideLayout = ContentAsideLayout
Skeleton.SocialList = SocialList

export default Skeleton
