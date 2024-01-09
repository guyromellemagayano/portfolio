import { Button, ContentLayout } from '@/components'
import { TErrorProps } from '@/types/components'

/**
 * Render an error page
 * @param statusCode - The status code of the error
 * @param heading - The heading of the error
 * @param message - The message of the error
 * @param children - The children of the error
 * @param className - The class name of the error
 * @returns An error page component
 */
const ErrorApp = ({
  statusCode,
  heading,
  message,
  children,
  className
}: TErrorProps): JSX.Element => {
  return (
    <ContentLayout
      id="hero"
      title={`Error: ${statusCode + ': ' + heading}`}
      intro={message}
      className={className}
    >
      <main>
        <div className="mt-10 flex-none">
          {children ? (
            children
          ) : (
            <Button href="/" variant="primary">
              Go back home
            </Button>
          )}
        </div>
      </main>
    </ContentLayout>
  )
}

export default ErrorApp
