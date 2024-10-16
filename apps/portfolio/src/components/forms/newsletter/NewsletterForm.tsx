'use client'

import { forwardRef, memo } from 'react'

import dynamic from 'next/dynamic'

import {
  Button,
  Div,
  Form,
  Heading,
  Input,
  Label,
  P,
  type TDivisionProps,
  type TDivisionRef,
  type TFormProps
} from '@react-components'

import { commonData } from '@portfolio/data'
import type { HomePageAppDataQuery } from '@portfolio/graphql'
import type { TCommonProps } from '@portfolio/types'

// Dynamic imports
const BaseContainer = dynamic(() =>
  import('@portfolio/components').then(mod => mod.BaseContainer)
)

export type NewsletterFormRef = TDivisionRef
export type NewsletterFormProps = TDivisionProps &
  TFormProps &
  Pick<
    HomePageAppDataQuery['homePage']['sections'][4],
    'heading' | 'description'
  > &
  TCommonProps

const thankYouPageLink = '/thank-you'

/**
 * Renders the newsletter form component.
 * @param {NewsletterFormProps} props - The component props
 * @param {NewsletterFormRef} ref - The component reference
 * @returns The rendered newsletter form component
 */
const NewsletterForm = memo(
  forwardRef<NewsletterFormRef, NewsletterFormProps>(
    ({ heading, description, common, ...rest }, ref) => {
      if (!heading && !description) return null

      return (
        <BaseContainer ref={ref} {...rest}>
          <Div className="mx-auto max-w-7xl rounded-2xl bg-white px-6 py-12 shadow-md lg:py-6 dark:bg-zinc-900">
            <Div className="p-6 lg:px-8">
              <Div className="flex flex-auto flex-wrap gap-y-3 md:flex-none">
                <Heading
                  as="h2"
                  className="mx-auto text-center text-3xl font-bold tracking-tight text-zinc-900 sm:block sm:text-4xl dark:text-zinc-100"
                >
                  {heading}
                </Heading>{' '}
                <P className="mx-auto text-center text-base leading-5 text-zinc-600 sm:block dark:text-zinc-400">
                  {description}
                </P>
              </Div>
              <Form
                action={thankYouPageLink}
                className="mx-auto mt-10 grid max-w-md gap-4 md:flex"
              >
                <Label className="sr-only" htmlFor="email-address">
                  {common.emailAddress || commonData.emailAddress}
                </Label>
                <Input
                  aria-required
                  required
                  aria-label={common.enterEmail || commonData.enterEmail}
                  autoComplete="email"
                  className="inline-flex min-w-0 flex-auto rounded-md border-0 bg-white/5 px-4 py-3 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-zinc-400 sm:text-sm sm:leading-6 md:px-3.5 md:py-2 dark:ring-gray-600 dark:ring-transparent dark:focus:ring-zinc-600/50"
                  id="email-address"
                  name="email-address"
                  placeholder={common.enterEmail || commonData.enterEmail}
                  type="email"
                />
                <Button
                  className="inline-flex w-auto flex-none items-center justify-center gap-2 rounded-full bg-zinc-800 px-5 py-2.5 text-sm font-semibold text-zinc-100 shadow-sm outline-offset-2 transition hover:bg-zinc-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600 active:bg-zinc-600 active:text-zinc-300/70 active:transition-none md:flex-none dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-300 dark:active:bg-zinc-300 dark:active:text-zinc-300/70"
                  type="submit"
                >
                  {common.notifyMe || commonData.notifyMe}
                </Button>
              </Form>
            </Div>
          </Div>
        </BaseContainer>
      )
    }
  )
)

NewsletterForm.displayName = 'NewsletterForm'

export default NewsletterForm
