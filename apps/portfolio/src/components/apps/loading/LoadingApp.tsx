import { Div, P } from '@react-components'
import { cn } from '@react-utils'

export const strings = {
  loading: 'Loading...'
}

/**
 * Render the loading app component
 * @returns The rendered loading app component
 */
const LoadingApp = () => {
  return (
    <Div
      className={cn(
        'flex min-h-full items-center justify-center px-6 py-24 sm:py-32 lg:px-8'
      )}
    >
      <Div className={cn('text-center')}>
        <P className={cn('text-base font-semibold')}>{strings.loading}</P>
      </Div>
    </Div>
  )
}

LoadingApp.displayName = 'LoadingApp'

export default LoadingApp
