import { SharedReactComponent } from '@guy-romelle-magayano/react-components/server'

import { cn } from '@guy-romelle-magayano/react-utils/server'

/**
 * Render the loading page.
 * @returns The loading page component.
 */
const Loading = async () => {
  const loadingMessage = 'Loading...'

  return (
    <SharedReactComponent.Layout
      className={cn(
        'flex min-h-full items-end justify-center px-6 py-24 sm:py-32 lg:px-8'
      )}
    >
      <SharedReactComponent.Layout className={cn('text-center')}>
        <p className={cn('text-base font-semibold')}>{loadingMessage}</p>
      </SharedReactComponent.Layout>
    </SharedReactComponent.Layout>
  )
}

export default Loading
