import { TGenericPageData } from 'types/common'

export type TThankYouData<T = object> = TGenericPageData<T>

/**
 * Returns an object containing metadata and hero section data for the thank you page.
 * @returns {TThankYouData} Object containing metadata and hero section data.
 */
const ThankYouData = (): TThankYouData => {
  const meta = {
    title: 'You’re subscribed! - Guy Romelle Magayano',
    description: 'Thanks for subscribing to my newsletter.',
    keywords:
      'guy romelle magayano, full stack developer, davao, philippines, custom web application, custom web development, devops, seo, amazon, google, javascript, typescript, html, css, react, react native, wordpress, tailwind, jamstack, gatsby, nextjs, newsletter, subscribe'
  }

  const hero = {
    heading: 'Thanks for subscribing.',
    description: [
      'I’ll send you an email any time I publish a new blog post, release a new project, or have anything interesting to share that I think you’d want to hear about. You can unsubscribe at any time, no hard feelings.'
    ]
  }

  return { meta, hero }
}

export default ThankYouData
