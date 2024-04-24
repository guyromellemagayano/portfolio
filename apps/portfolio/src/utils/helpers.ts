import { headers } from 'next/headers'

/**
 * Returns the full server URL with its protocol, host, and pathname.
 * @param pathname - The pathname to use.
 * @returns The full server URL.
 */
export const fullServerUrl = (pathname: string): string => {
  const headersList = headers()

  return (
    `${headersList.get('x-forwarded-proto') + '://' + headersList.get('host') + '/'}` +
    pathname
  )
}
