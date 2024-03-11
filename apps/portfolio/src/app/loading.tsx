import { SharedReactComponent } from '@guy-romelle-magayano/react-components/server'

/**
 * Render the loading page.
 * @returns The loading page component.
 */
const Loading = async () => {
  const loadingMessage = 'Loading...'

  return (
    <SharedReactComponent.Layout className="flex min-h-full items-end justify-center px-6 py-24 sm:py-32 lg:px-8">
      <SharedReactComponent.Layout className="text-center">
        <SharedReactComponent.Paragraph className="text-base font-semibold">
          {loadingMessage}
        </SharedReactComponent.Paragraph>
      </SharedReactComponent.Layout>
    </SharedReactComponent.Layout>
  )
}

export default Loading
