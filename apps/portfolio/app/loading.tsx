import { Div, P } from '@react-components'

export const loadingStrings = {
  loading: 'Loading...'
}

/**
 * Render the loading app
 * @returns The rendered app
 */
export const LoadingApp = () => {
  return (
    <Div className="flex min-h-full items-center justify-center px-6 py-24 sm:py-32 lg:px-8">
      <Div className="text-center">
        <P className="text-base font-semibold">{loadingStrings.loading}</P>
      </Div>
    </Div>
  )
}

LoadingApp.displayName = 'LoadingApp'

/**
 * Render the loading page
 * @returns The rendered page
 */
const Loading = () => {
  return <LoadingApp />
}

Loading.displayName = 'Loading'

export default Loading
