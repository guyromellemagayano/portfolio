import { ReactNode } from 'react'

import { StyledComponentsRegistry } from './registry'

import BaseLayout from '@guy-romelle-magayano/portfolio/components/layout/BaseLayout'

import GlobalStyles from '@guy-romelle-magayano/portfolio/styles/GlobalStyles'

import 'focus-visible'

interface IRootLayoutProps {
  children: ReactNode
}

/**
 * Serves as the root layout of the application.
 * @param children - The children of the root layout.
 * @returns The rendered root layout component.
 */
const RootLayout = ({ children }: IRootLayoutProps) => {
  return (
    <StyledComponentsRegistry>
      <GlobalStyles />
      <BaseLayout>{children}</BaseLayout>
    </StyledComponentsRegistry>
  )
}

export default RootLayout
