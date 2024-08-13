'use client'

import { FormHTMLAttributes, forwardRef } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'

import { Input } from '@guy-romelle-magayano/react-components'

export type FormRef = HTMLFormElement
export type FormProps = FormHTMLAttributes<FormRef>

/**
 * Render the form component.
 * @param {FormProps} props - The form component properties
 * @param {FormRef} ref - The form component reference
 * @returns The rendered form component
 */
export const Form = forwardRef<FormRef, FormProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <form ref={ref} {...rest}>
      {children}
    </form>
  )
})

Form.displayName = 'Form'

export type ReactFormRef = HTMLFormElement
export type ReactFormProps = FormHTMLAttributes<FormRef> & {
  formInputs?: any
}

/**
 * Render a form based on React Hook Form.
 * @param {ReactFormProps} props - The form component properties
 * @param {ReactFormRef} ref - The form component reference
 * @returns The rendered form component
 */
export const ReactHookForm = forwardRef<ReactFormRef, ReactFormProps>(
  (props, ref) => {
    const { formInputs = {}, children, ...rest } = props

    const { register, handleSubmit, watch } = useForm<typeof formInputs>()
    const onFormSubmit: SubmitHandler<typeof formInputs> = data =>
      console.log(data)

    console.log(watch('example'))

    return (
      <Form onSubmit={handleSubmit(onFormSubmit)} {...rest}>
        <Input
          defaultValue="test"
          {...register('example')}
          className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-500/10 sm:text-sm dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
        />
        <Input
          type="submit"
          className="ml-4 inline-flex flex-none items-center justify-center gap-2 rounded-md bg-zinc-800 px-3 py-2 text-sm font-semibold text-zinc-100 outline-offset-2 transition hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 active:transition-none dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70"
        />
      </Form>
    )
  }
)
