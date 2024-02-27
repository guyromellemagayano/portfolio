import { Metadata } from 'next'

/**
 * Custom hook that returns metadata for a page.
 * @param title - The title of the page.
 * @param description - The description of the page.
 * @param keywords - The keywords of the page.
 * @returns The metadata object.
 */
export const useMetaData = ({
  title,
  description,
  keywords
}: Metadata): Metadata => {
  return {
    title: title || 'Sample Title',
    description: description || 'Sample Description',
    keywords: keywords || 'Sample Keywords'
  }
}
