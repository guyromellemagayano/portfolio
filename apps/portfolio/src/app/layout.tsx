import { ReactNode } from 'react'

import { BaseLayout } from '@guy-romelle-magayano/portfolio/components/layout/base'

import '@guy-romelle-magayano/portfolio/styles/tailwind.css'

import 'focus-visible'

type TRootLayoutProps = {
  children: ReactNode
}

/**
 * Serves as the root layout of the application.
 * @param children - The children of the root layout.
 * @returns The rendered root layout component.
 */
const RootLayout = ({ children }: TRootLayoutProps) => {
  return <BaseLayout>{children}</BaseLayout>
}

export default RootLayout
