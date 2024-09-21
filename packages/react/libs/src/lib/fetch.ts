/**
 * A generic fetch function applying all capabilities of the Fetch API with the following features:
 * @param url - The URL to fetch.
 * @param options - Optional configuration for the fetch request (method, headers, body, etc.).
 * @param timeout - Optional timeout duration in milliseconds to cancel the request if it takes too long.
 * @returns A promise that resolves to the response data.
 */
export const withFetch = async (
  url: string,
  options: RequestInit = {},
  timeout = 0
): Promise<any> => {
  const controller = new AbortController()
  const signal = controller.signal

  // If timeout is provided, set a timer to abort the request
  if (timeout > 0) {
    setTimeout(() => controller.abort(), timeout)
  }

  try {
    // Adding the `AbortController` signal to options
    const res = await fetch(url, {
      ...options,
      signal,
      // Cache policy: 'default', 'no-store', 'reload', 'no-cache', 'force-cache', 'only-if-cached'
      cache: options.cache || 'default',

      // Referrer policy: 'no-referrer', 'origin', etc.
      referrerPolicy: options.referrerPolicy || 'no-referrer',

      // Redirect policy: 'follow', 'manual', or 'error'
      redirect: options.redirect || 'follow'
    })

    // Check if the request was redirected
    if (res.redirected) {
      console.warn('Request as redirected to:', res.url)
    }

    // Check if the response was okay (status in the range 200-299)
    if (!res.ok) {
      throw new Error(
        `Request failed with status: ${res.status}, statusText: ${res.statusText}`
      )
    }

    // Handle different response types based on `content-type`
    const contentType = res.headers.get('content-type')
    if (contentType?.includes('application/json')) {
      return await res.json()
    } else if (contentType?.includes('text/')) {
      return await res.text()
    } else if (contentType?.includes('multipart/form-data')) {
      return await res.formData()
    } else if (contentType?.includes('application/octet-stream')) {
      return await res.blob()
    } else {
      // Default fallback to `ArrayBuffer`
      return await res.arrayBuffer()
    }
  } catch (err: any) {
    if (err.name === 'AbortError') {
      throw new Error('Request timed out')
    }

    throw new Error(`Fetch error: ${err.message}`)
  }
}
