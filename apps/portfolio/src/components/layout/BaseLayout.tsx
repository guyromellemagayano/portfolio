'use client'

import { ReactNode, useId } from 'react'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Script from 'next/script'
import tw from 'twin.macro'

import {
  NEXT_PUBLIC_GA_MEASUREMENT_ID,
  NEXT_PUBLIC_GA_MEASUREMENT_URL
} from '@guy-romelle-magayano/portfolio/configs/env'

import HeaderLayout from '@guy-romelle-magayano/portfolio/components/layout/HeaderLayout'

import {
  SharedContainer,
  SharedFooter,
  SharedMain
} from '@guy-romelle-magayano/shared'

interface IBaseLayoutProps {
  children: ReactNode
}

const StyledHtml = tw.html`h-full antialiased`,
  StyledBody = tw.body`flex h-full bg-zinc-50 dark:bg-black`,
  StyledBaseLayout = tw.div`flex w-full`

/**
 * Render the base layout component.
 * @param children - The children of the base layout.
 * @returns The rendered base layout component.
 */
const BaseLayout = ({ children }: IBaseLayoutProps) => {
  const customId = useId()

  return (
    <StyledHtml lang="en" suppressHydrationWarning>
      <head>
        <Script
          strategy="afterInteractive"
          src={NEXT_PUBLIC_GA_MEASUREMENT_URL}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', "${NEXT_PUBLIC_GA_MEASUREMENT_ID}");
            `
          }}
        />
      </head>

      <StyledBody>
        <StyledBaseLayout id={customId}>
          <SharedContainer tw="relative flex w-full flex-col">
            <HeaderLayout />
            <SharedMain tw="flex-auto">
              {children}
              <SpeedInsights />
              <Analytics />
            </SharedMain>
            <SharedFooter tw="mt-32" />
          </SharedContainer>
        </StyledBaseLayout>
      </StyledBody>
    </StyledHtml>
  )
}

export default BaseLayout
