'use client'

import { SharedReactComponent } from '@guy-romelle-magayano/react-components/server'

const FooterLayout = () => {
  return (
    <SharedReactComponent.Layout as="footer" className="mt-32">
      <SharedReactComponent.Layout className="mx-auto max-w-7xl">
        <SharedReactComponent.Layout className="relative mx-4 border-t border-zinc-100 pb-16 pt-10 sm:mx-8 lg:mx-12 dark:border-zinc-700/40">
          <SharedReactComponent.Layout className="lg:px-6">
            <SharedReactComponent.Layout className="mx-auto max-w-2xl lg:max-w-5xl">
              <SharedReactComponent.Layout className="flex flex-col items-center justify-between gap-6 text-center lg:flex-row lg:text-left"></SharedReactComponent.Layout>
            </SharedReactComponent.Layout>
          </SharedReactComponent.Layout>
        </SharedReactComponent.Layout>
      </SharedReactComponent.Layout>
    </SharedReactComponent.Layout>
  )
}

FooterLayout.displayName = 'FooterLayout'

export default FooterLayout
