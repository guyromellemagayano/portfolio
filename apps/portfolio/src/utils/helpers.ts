'use server'

import { headers } from 'next/headers'

import { withFetch } from '@react-libs'

/**
 * Returns the full server URL with its protocol, host, and pathname.
 * @param pathname - The pathname to use.
 * @returns The full server URL.
 */
export const fullServerUrl = async (pathname: string): Promise<string> => {
  const headersList = headers()

  return (
    `${headersList.get('x-forwarded-proto') + '://' + headersList.get('host') + '/'}` +
    pathname
  )
}

/**
 * Returns the full server URL with its protocol, host, and pathname.
 * @param url - The URL to fetch.
 * @param retries - The number of times to retry the request if it fails.
 * @param delay - The delay between retries in milliseconds.
 * @returns The page data
 */
export const fetchData = async (
  url: string,
  retries = 3,
  delay = 1000
): Promise<any> => {
  const fullUrl = await fullServerUrl(url)

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const data = await withFetch(fullUrl)

      return data
    } catch (error) {
      console.error(`Attempt ${attempt + 1} failed:`, error)

      // If the last attempt fails, throw the error
      if (attempt === retries) {
        console.error('Max retries reached. Throwing error.')
        throw new Error(
          `Failed to fetch data after ${retries + 1} attempts: ${error}`
        )
      }

      // Wait for a specified delay before retrying
      await new Promise(res => setTimeout(res, delay))
    }
  }

  // This return is just a safeguard; the function should never reach here
  return {}
}
