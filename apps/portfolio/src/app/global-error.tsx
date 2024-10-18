'use client'

import { useEffect } from 'react'

import * as Sentry from '@sentry/nextjs'
import Error from 'next/error'

import { ApolloQueryResult } from '@apollo/client'
import type { TCustomErrorPageProps } from '@portfolio/app/error'
import { ErrorMetaDataQuery, getErrorMetaDataQuery } from '@portfolio/graphql'
import { getClient } from '@portfolio/libs'
import { Metadata } from 'next'

/**
 * Generates the metadata for the home page.
 * @returns The metadata for the home page.
 */
export const generateMetadata = async (): Promise<Metadata> => {
  const { data } = (await getClient().query({
    query: getErrorMetaDataQuery
  })) as ApolloQueryResult<ErrorMetaDataQuery>

  return {
    title: data?.errorPage?.meta?.title || undefined,
    description: data?.errorPage?.meta?.description || undefined
  }
}

export type TGlobalErrorPageProps = TCustomErrorPageProps

/**
 * Render the global error page.
 * @param {TGlobalErrorPageProps} props - The page props
 * @returns The rendered global error page
 */
const GlobalErrorPage = ({ error }: TGlobalErrorPageProps) => {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return <Error statusCode={0} />
}

GlobalErrorPage.displayName = 'GlobalErrorPage'

export default GlobalErrorPage
