import {
  COIN_COLORFUL_SITE_URL,
  CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  CONTENTFUL_SPACE_ID
} from '.'

export type ContentfulConfig = {
  contentful: {
    space_id: string
    cda_token: string
    cpa_token: string
  }
  meta: {
    title: string
    description: string
    url: string
    image: string
  }
  icon: {
    light: string
    dark: string
    width: number
    height: number
  }
}

export const CONTENTFUL_CONFIG = {
  contentful: {
    space_id: CONTENTFUL_SPACE_ID,
    cda_token: CONTENTFUL_ACCESS_TOKEN,
    cpa_token: CONTENTFUL_PREVIEW_ACCESS_TOKEN
  },
  meta: {
    title: 'Digital banking for the new generation | Colorful Coin',
    description: `Enjoy premium banking services wherever you go: instant transfers and best exchange rates, exclusive offers and priority customer support. Apply online at ${COIN_COLORFUL_SITE_URL.replace(
      'https://',
      ''
    ).replace('http://', '')}`,
    url: COIN_COLORFUL_SITE_URL,
    image:
      'https://images.ctfassets.net/w8vf7dk7f259/4bucno7z1xAyVI5MOkU6Pu/ded83d0ec1eb732ae3a81ddab7a18877/fallback-image-03.jpg'
  },
  icon: {
    light:
      'https://images.ctfassets.net/w8vf7dk7f259/llZXwDCnl9NqdyuVvjn1n/d20cea90225e7f53dfbf8a18a46e972d/gocoin-icon-light.svg',
    dark: 'https://images.ctfassets.net/w8vf7dk7f259/i9iu6GU6dFWQJJwJzwxCT/952cc3bab415e28f521c22933072a09c/gocoin-icon.svg',
    width: 66,
    height: 64
  }
} as ContentfulConfig

export type ContentfulFetchConfig = {
  endpoint: string
  params: {
    headers: {
      'Content-Type': string
      Authorization: string
    }
  }
  previewParams: {
    headers: {
      'Content-Type': string
      Authorization: string
    }
  }
}

export const CONTENTFUL_FETCH_CONFIG = {
  endpoint: `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}`,
  params: {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${CONTENTFUL_ACCESS_TOKEN}`
    }
  },
  previewParams: {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${CONTENTFUL_PREVIEW_ACCESS_TOKEN}`
    }
  }
} as ContentfulFetchConfig
