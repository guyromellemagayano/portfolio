'use client'

import { forwardRef } from 'react'

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

import { cn } from '@react-utils'

import { BaseContainer } from '@portfolio/components'

export type NewsletterFormRef = TDivisionRef
export type NewsletterFormProps = TDivisionProps & TFormProps

const strings = {
  stayUpToDate: 'Want product news and updates?',
  getNotified:
    'Get notified when I publish something new, and unsubscribe at any time.',
  emailAddress: 'Email Address',
  email: 'Enter you email',
  notifyMe: 'Notify me'
}
const thankYouPageLink = '/thank-you'

/**
 * Renders the newsletter form component.
 * @param {NewsletterFormProps} props - The component props
 * @param {NewsletterFormRef} ref - The component reference
 * @returns The rendered newsletter form component
 */
const NewsletterForm = forwardRef<NewsletterFormRef, NewsletterFormProps>(
  ({ ...rest }, ref) => {
    return (
      <BaseContainer ref={ref} {...rest}>
        <Div
          className={cn(
            'mx-auto max-w-7xl rounded-2xl bg-white px-6 py-12 shadow-md lg:py-6 dark:bg-zinc-900'
          )}
        >
          <Div className={cn('p-6 lg:px-8')}>
            <Div
              className={cn('flex flex-auto flex-wrap gap-y-3 md:flex-none')}
            >
              <Heading
                as="h2"
                className={cn(
                  'mx-auto text-center text-3xl font-bold tracking-tight text-zinc-900 sm:block sm:text-4xl dark:text-zinc-100'
                )}
              >
                {strings.stayUpToDate}
              </Heading>{' '}
              <P
                className={cn(
                  'mx-auto text-center text-base leading-5 text-zinc-600 sm:block dark:text-zinc-400'
                )}
              >
                {strings.getNotified}
              </P>
            </Div>
            <Form
              action={thankYouPageLink}
              className={cn('mx-auto mt-10 grid max-w-md gap-4 md:flex')}
            >
              <Label className="sr-only" htmlFor="email-address">
                {strings.emailAddress}
              </Label>
              <Input
                aria-required
                required
                aria-label={strings.email}
                autoComplete="email"
                className={cn(
                  'inline-flex min-w-0 flex-auto rounded-md border-0 bg-white/5 px-4 py-3 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-zinc-400 sm:text-sm sm:leading-6 md:px-3.5 md:py-2 dark:ring-gray-600 dark:ring-transparent dark:focus:ring-zinc-600/50'
                )}
                id="email-address"
                name="email-address"
                placeholder={strings.email}
                type="email"
              />
              <Button
                className={cn(
                  'inline-flex w-auto flex-none items-center justify-center gap-2 rounded-full bg-zinc-800 px-5 py-2.5 text-sm font-semibold text-zinc-100 shadow-sm outline-offset-2 transition hover:bg-zinc-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600 active:bg-zinc-600 active:text-zinc-300/70 active:transition-none md:flex-none dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-300 dark:active:bg-zinc-300 dark:active:text-zinc-300/70'
                )}
                type="submit"
              >
                {strings.notifyMe}
              </Button>
            </Form>
          </Div>
        </Div>
      </BaseContainer>
    )
  }
)

NewsletterForm.displayName = 'NewsletterForm'

export default NewsletterForm
