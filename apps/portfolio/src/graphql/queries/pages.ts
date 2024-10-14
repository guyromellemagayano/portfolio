import { gql } from '@apollo/client'

export const getHomePageMetaQuery = gql`
  query HomePageMeta {
    homePage {
      meta {
        description
        openGraph {
          title
          description
          type
          url
          siteName
          images {
            id
            url
            alt
            width
            height
          }
        }
        title
      }
    }
  }
`

export const getHomePageAppQuery = gql`
  query HomePageAppData {
    common
    homePage {
      hero {
        description
        heading
      }
      sections {
        id
        contentType
        heading
        description
      }
      structuredData {
        context
        description
        name
        publisher {
          name
          type
        }
        type
        sameAs
      }
    }
    links {
      social {
        href
        icon
        id
        label
      }
    }
    images {
      aboutImage {
        alt
        height
        id
        src
        width
      }
      slideImages {
        alt
        height
        id
        src
        width
      }
    }
    work {
      cvFile
      experiences {
        alt
        company
        country
        contributions
        end
        id
        skills
        src
        start
        title
      }
    }
    skills {
      id
      image {
        default {
          alt
          src
        }
        dark {
          alt
          src
        }
      }
      name
      type
      isFeatured
    }
  }
`

export const getErrorMetaDataQuery = gql`
  query getErrorMetaDataQuery {
    errorPage {
      meta {
        description
        title
      }
    }
  }
`

export const getErrorPageDataQuery = gql`
  query getErrorPageDataQuery {
    errorPage {
      hero {
        description
        heading
      }
    }
  }
`

export const getNotFoundMetaDataQuery = gql`
  query getNotFoundMetaDataQuery {
    notFoundPage {
      meta {
        description
        title
      }
    }
  }
`

export const getNotFoundPageDataQuery = gql`
  query getNotFoundPageDataQuery {
    notFoundPage {
      hero {
        description
        heading
      }
    }
  }
`
