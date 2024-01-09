'use client'

import * as Sentry from '@sentry/nextjs'
import { NextPageContext } from 'next'
import NextErrorComponent, { ErrorProps } from 'next/error'

type CustomErrorComponentProps = ErrorProps

interface CustomErrorComponentType extends React.FC<CustomErrorComponentProps> {
  getInitialProps: (
    contextData: NextPageContext
  ) => Promise<CustomErrorComponentProps>
}

const CustomErrorComponent: CustomErrorComponentType = props => {
  return <NextErrorComponent statusCode={props.statusCode} />
}

CustomErrorComponent.getInitialProps = async (contextData: NextPageContext) => {
  await Sentry.captureUnderscoreErrorException(contextData)

  return NextErrorComponent.getInitialProps(contextData)
}

export default CustomErrorComponent
