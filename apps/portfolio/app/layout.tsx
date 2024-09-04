import { ReactNode } from 'react'

import { BaseLayout } from '@portfolio/components/layouts/base'

export type RootLayoutProps = {
  children: ReactNode
}

/**
 * Renders the root app layout.
 * @param {RootLayoutProps} props - The component props
 * @returns The rendered JSX component
 */
const RootLayout = ({ children }: RootLayoutProps) => {
  return <BaseLayout>{children}</BaseLayout>
}

RootLayout.displayName = 'RootLayout'

export default RootLayout
