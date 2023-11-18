import { Metadata } from 'next'

export function useMetaData({ title, description, keywords }): Metadata {
  return {
    title: title || 'Sample Title',
    description: description || 'Sample Description',
    keywords: keywords || 'Sample Keywords'
  }
}
