'use client'

import { forwardRef } from 'react'

import Link from 'next/link'

import {
  Button,
  Form,
  FormProps,
  Input,
  Label
} from '@guy-romelle-magayano/react-components'
import {
  Div,
  DivisionProps,
  DivisionRef,
  Heading,
  P
} from '@guy-romelle-magayano/react-components/server'

import { BaseContainer } from '@guy-romelle-magayano/portfolio/components'

import { cn } from '@guy-romelle-magayano/react-utils'

export type NewsletterFormRef = DivisionRef
export type NewsletterFormProps = DivisionProps & FormProps

const strings = {
  stayUpToDate: 'Want product news and updates?',
  getNotified:
    'Get notified when I publish something new, and unsubscribe at any time.',
  emailAddress: 'Email Address',
  email: 'Enter you email',
  join: 'Join',
  privacyPolicy: 'We care about your data. Read our'
}

const thankYouPageLink = '/thank-you'

/**
 * Renders the newsletter form component.
 * @param {NewsletterFormProps} props - The component props
 * @param {NewsletterFormRef} ref - The component reference
 * @returns The rendered JSX component
 */
const NewsletterForm = forwardRef<NewsletterFormRef, NewsletterFormProps>(
  ({ className, ...rest }, ref) => {
    return (
      <BaseContainer
        ref={ref}
        className={cn(className, 'mt-20 md:mt-24')}
        {...rest}
      >
        <Div className="mx-auto max-w-7xl rounded-2xl border border-zinc-300 p-3 md:p-6 dark:border-zinc-500">
          <Div className="mx-auto max-w-7xl p-6 lg:px-8">
            <Div className="flex max-w-2xl flex-auto flex-wrap gap-y-3 md:flex-none">
              <Heading
                as="h2"
                className="inline text-3xl font-bold tracking-tight text-zinc-900 sm:block sm:text-4xl dark:text-zinc-100"
              >
                {strings.stayUpToDate}
              </Heading>{' '}
              <P className="inline text-base leading-5 text-zinc-600 sm:block dark:text-zinc-400">
                {strings.getNotified}
              </P>
            </Div>
            <Form action={thankYouPageLink} className="mt-10 max-w-md">
              <Div className="flex flex-col flex-wrap gap-3 sm:flex-row">
                <Label htmlFor="email-address" className="sr-only">
                  {strings.emailAddress}
                </Label>
                <Input
                  id="email-address"
                  name="email-address"
                  type="email"
                  required
                  placeholder={strings.email}
                  aria-label={strings.email}
                  aria-required
                  autoComplete="email"
                  className="inline-flex min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-zinc-600 sm:text-sm sm:leading-6 dark:focus:ring-zinc-600/50"
                />
                <Button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-zinc-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm outline-offset-2 transition hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600 active:bg-zinc-700 active:text-zinc-300/70 active:transition-none md:flex-none dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-300 dark:active:bg-zinc-300 dark:active:text-zinc-300/70"
                >
                  {strings.join}
                </Button>
              </Div>
              <P className="mt-4 text-sm leading-5 text-zinc-600 dark:text-zinc-400">
                {strings.privacyPolicy}{' '}
                <Link
                  href="#"
                  className="font-bold text-zinc-700 hover:text-zinc-500 dark:text-zinc-300 dark:hover:text-zinc-100"
                >
                  privacy&nbsp;policy
                </Link>
                .
              </P>
            </Form>
          </Div>
        </Div>
      </BaseContainer>
    )
  }
)

NewsletterForm.displayName = 'NewsletterForm'

export default NewsletterForm
