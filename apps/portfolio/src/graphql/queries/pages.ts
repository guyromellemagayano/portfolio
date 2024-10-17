import gql from 'graphql-tag'

export const getPagesDataQuery = gql`
  query PagesData {
    pages {
      links {
        id
        title
        link
        slug
      }
    }
    common
    images {
      avatarImage {
        id
        src
        alt
        width
        height
      }
    }
  }
`

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
        cta {
          id
          link
          slug
          buttonType
        }
      }
      sections {
        id
        contentType
        heading
        description
        cta {
          id
          link
          slug
          buttonType
        }
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
  query ErrorMetaData {
    errorPage {
      meta {
        description
        title
      }
    }
  }
`

export const getErrorPageDataQuery = gql`
  query ErrorPageData {
    errorPage {
      hero {
        description
        heading
      }
    }
  }
`

export const getNotFoundMetaDataQuery = gql`
  query NotFoundMetaData {
    notFoundPage {
      meta {
        description
        title
      }
    }
  }
`

export const getNotFoundPageDataQuery = gql`
  query NotFoundPageData {
    notFoundPage {
      hero {
        description
        heading
      }
    }
  }
`

export const getSkillsPageMetaQuery = gql`
  query SkillsPageMeta {
    skillsPage {
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

export const getSkillsPageAppQuery = gql`
  query SkillsPageAppData {
    common
    skillsPage {
      hero {
        description
        heading
        cta {
          id
          link
          slug
          buttonType
        }
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
