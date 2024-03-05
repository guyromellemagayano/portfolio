// import * as Sentry from '@sentry/nextjs'

// import { SharedButton } from '@guy-romelle-magayano/components/server'

/**
 * Renders the home page.
 * @returns The home page component.
 */
const Page = async () => {
  return (
    <>
      {/* <SharedButton
        onClick={() => {
          Sentry.startSpan(
            {
              name: 'Example Frontend Span',
              op: 'test'
            },
            async () => {
              const res = await fetch('/api/sentry-example-api')
              if (!res.ok) {
                throw new Error('Sentry Example Frontend Error')
              }
            }
          )
        }}
      />

      <p>
        Next, look for the error on the{' '}
        <a href="https://guy-romelle-magayano.sentry.io/issues/?project=4504692968718336">
          Issues Page
        </a>
        .
      </p>
      <p style={{ marginTop: '24px' }}>
        For more information, see{' '}
        <a href="https://docs.sentry.io/platforms/javascript/guides/nextjs/">
          https://docs.sentry.io/platforms/javascript/guides/nextjs/
        </a>
      </p> */}
    </>
  )
}

export default Page
