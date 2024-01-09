import { Metadata } from 'next'

/**
 * Custom hook that returns metadata for a page.
 * @param {Object} options - The options for the metadata.
 * @param {string} options.title - The title of the page.
 * @param {string} options.description - The description of the page.
 * @param {string} options.keywords - The keywords of the page.
 * @returns {Metadata} The metadata object.
 */
const useMetaData = ({ title, description, keywords }: Metadata): Metadata => {
  return {
    title: title || 'Sample Title',
    description: description || 'Sample Description',
    keywords: keywords || 'Sample Keywords'
  }
}

export default useMetaData
