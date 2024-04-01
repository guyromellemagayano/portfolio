import { Div, P } from '@guy-romelle-magayano/react-components/server'

/**
 * Render the loading page.
 * @returns The loading page component.
 */
const Loading = async () => {
  const strings = {
    loading: 'Loading...'
  }

  return (
    <Div className="flex min-h-full items-end justify-center px-6 py-24 sm:py-32 lg:px-8">
      <Div className="text-center">
        <P className="text-base font-semibold">{strings.loading}</P>
      </Div>
    </Div>
  )
}

Loading.displayName = 'Loading'

export default Loading
