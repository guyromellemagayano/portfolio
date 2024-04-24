import { ReactNode } from 'react'

import { BaseLayout } from '@guy-romelle-magayano/portfolio/components/Layouts/Base'

export type RootLayoutProps = {
  children: ReactNode
}

/**
 * Serves as the root layout of the application.
 * @param children - The children of the root layout.
 * @returns The rendered root layout component.
 */
const RootLayout = ({ children }: RootLayoutProps) => {
  return <BaseLayout>{children}</BaseLayout>
}

RootLayout.displayName = 'RootLayout'

export default RootLayout
