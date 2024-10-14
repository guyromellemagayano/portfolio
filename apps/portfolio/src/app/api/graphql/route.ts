/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import * as Sentry from '@sentry/nextjs'
import fs from 'fs'
import { GraphQLScalarType, Kind } from 'graphql'
import path from 'path'

// In-memory cache for JSON data
const cache: Record<string, any> = {}

// Helper function to read and cache JSON data
const readJSONData = (filePath: string): any => {
  if (!cache[filePath]) {
    try {
      const jsonData = fs.readFileSync(
        path.join(process.cwd(), filePath),
        'utf8'
      )
      cache[filePath] = JSON.parse(jsonData)
    } catch (error) {
      Sentry.captureException(error)
      throw new Error(`Error reading or parsing JSON data from ${filePath}`)
    }
  }

  return cache[filePath]
}

// Create a custom GraphQL scalar for handling JSON
const CommonScalar = new GraphQLScalarType({
  name: 'Common',
  description: 'Custom scalar for handling JSON-like Common data',

  // Serialize: how to output data from the server to the client
  serialize(value) {
    if (typeof value === 'object') {
      return value
    }
    throw new Error('CommonScalar can only serialize objects.')
  },

  // ParseValue: how to handle input from the client (optional for this case)
  parseValue(value) {
    if (typeof value === 'object') {
      return value
    }
    throw new Error('CommonScalar can only parse objects.')
  },

  // ParseLiteral: parse GraphQL literals directly (used in queries)
  parseLiteral(ast) {
    if (ast.kind === Kind.OBJECT) {
      return ast.fields
    }
    throw new Error('CommonScalar can only parse object literals.')
  }
})

// Function to sanitize inputs
const sanitize = (value: any) => {
  if (typeof value === 'string') {
    return value.replace(/</g, '&lt;').replace(/>/g, '&gt;') // Basic XSS prevention
  }
  return value
}

// Lazy load page data
const getData = {
  common: () => readJSONData('public/data/common.json'),
  images: () => readJSONData('public/data/images.json'),
  links: () => readJSONData('public/data/links.json'),
  pageAbout: () => readJSONData('public/data/page-about.json'),
  pageArticles: () => readJSONData('public/data/page-articles.json'),
  pageError: () => readJSONData('public/data/page-error.json'),
  pageHome: () => readJSONData('public/data/page-home.json'),
  pageNotFound: () => readJSONData('public/data/page-not-found.json'),
  pageProjects: () => readJSONData('public/data/page-projects.json'),
  pageThankYou: () => readJSONData('public/data/page-thank-you.json'),
  pageWorkExperiences: () =>
    readJSONData('public/data/page-work-experiences.json'),
  pageUses: () => readJSONData('public/data/page-uses.json'),
  pages: () => readJSONData('public/data/pages.json'),
  skills: () => readJSONData('public/data/skills.json'),
  work: () => readJSONData('public/data/work.json')
}

// Define your GraphQL schema
const typeDefs = `#graphql
  scalar Common

  union PageData =
    | HomePage
    | AboutPage
    | WorkExperiencesPage
    | ProjectsPage
    | ArticlesPage
    | UsesPage
    | ThankYouPage
    | ErrorPage
    | NotFoundPage

  interface Image {
    id: ID
    src: String!
    alt: String!
    width: Int
    height: Int
  }

  type Meta {
    title: String!
    description: String!
    openGraph: OpenGraph!
  }

  type OpenGraph {
    title: String!
    description: String!
    type: String!
    url: String!
    siteName: String!
    images: [OpenGraphImages!]!
  }

  type OpenGraphImages {
    id: ID
    url: String!
    alt: String!
    width: Int!
    height: Int!
  }

  type StructuredData {
    context: String!
    type: String!
    name: String!
    description: String!
    publisher: Publisher!
    sameAs: [String!]!
  }

  type Publisher {
    type: String!
    name: String!
  }

  type Hero {
    heading: String!
    description: [String!]!
  }

  type HomePage {
    id: ID!
    meta: Meta!
    structuredData: StructuredData!
    hero: Hero!
    sections: [Sections!]!
  }

  type AboutPage {
    id: ID!
    meta: Meta!
    structuredData: StructuredData!
    hero: Hero!
  }

  type WorkExperiencesPage {
    id: ID!
    meta: Meta!
    structuredData: StructuredData!
    hero: Hero!
  }

  type ProjectsPage {
    id: ID!
    meta: Meta!
    structuredData: StructuredData!
    hero: Hero!
  }

  type ArticlesPage {
    id: ID!
    meta: Meta!
    structuredData: StructuredData!
    hero: Hero!
  }

  type UsesPage {
    id: ID!
    meta: Meta!
    structuredData: StructuredData!
    hero: Hero!
  }

  type ThankYouPage {
    id: ID!
    meta: Meta!
    structuredData: StructuredData!
    hero: Hero!
  }

  type ErrorPage {
    id: ID!
    meta: Meta!
    structuredData: StructuredData!
    hero: Hero!
  }

  type NotFoundPage {
    id: ID!
    meta: Meta!
    structuredData: StructuredData!
    hero: Hero!
  }

  type Sections {
    id: ID!
    contentType: String!
    heading: String
    description: [String]
  }

  type Images {
    slideImages: [SlideImages!]!
    aboutImage: AboutImage
    avatarImage: AvatarImage
  }

  type SlideImages implements Image {
    id: ID!
    src: String!
    alt: String!
    width: Int
    height: Int
  }

  type AboutImage implements Image {
    id: ID
    src: String!
    alt: String!
    width: Int
    height: Int
  }

  type AvatarImage implements Image {
    id: ID
    src: String!
    alt: String!
    width: Int
    height: Int
  }

  type Pages {
    links: [PageLinks!]!
  }

  type PageLinks {
    id: ID!
    title: String!
    link: String!
    slug: String!
    page: PageData
  }

  type Skills {
    id: ID!
    name: String!
    type: [String!]!
    isFeatured: Boolean!
    image: SkillsImageSet!
  }

  type SkillsImageSet {
    default: SkillsImage!
    dark: SkillsImage
  }

  type SkillsImage {
    alt: String!
    src: String!
  }

  type Links {
    social: [LinksSocial!]!
  }

  type LinksSocial {
    id: ID!
    href: String!
    label: String!
    icon: String!
  }

  type Work {
    experiences: [Experiences!]!
    cvFile: String!
  }

  type Experiences {
    id: ID!
    company: String!
    country: String!
    title: String!
    src: String
    alt: String
    start: String!
    end: String!
    contributions: [String!]!
    skills: [String!]!
  }

  type Query {
    aboutPage: AboutPage!
    articlesPage: ArticlesPage!
    common: Common!
    errorPage: ErrorPage!
    homePage: HomePage!
    images: Images!
    links: Links!
    notFoundPage: NotFoundPage!
    page(id: ID!): PageData
    pages: Pages!
    projectsPage: ProjectsPage!
    skills: [Skills!]!
    thankYouPage: ThankYouPage!
    usesPage: UsesPage!
    work: Work!
    workExperiencesPage: WorkExperiencesPage!
  }
`

// Resolvers
const resolvers = {
  Common: CommonScalar,
  Query: {
    homePage: () => getData.pageHome(),
    aboutPage: () => getData.pageAbout(),
    workExperiencesPage: () => getData.pageWorkExperiences(),
    projectsPage: () => getData.pageProjects(),
    articlesPage: () => getData.pageArticles(),
    usesPage: () => getData.pageUses(),
    thankYouPage: () => getData.pageThankYou(),
    errorPage: () => getData.pageError(),
    notFoundPage: () => getData.pageNotFound(),
    common: () => sanitize(getData.common()),
    images: () => sanitize(getData.images()),
    pages: () => getData.pages(),
    skills: () => getData.skills(),
    links: () => getData.links(),
    work: () => getData.work(),
    page: (_: any, { id }: { id: string }) => {
      const pageMap: Record<string, any> = {
        'e3f7b6b1-8e3f-4c2a-8f8e-41c2f7d9b9b1': getData.pageAbout(),
        'f673e9d4-2a3c-4b14-b2b9-50d9a3b4d7f3': getData.pageArticles(),
        'c21e1b45-ff64-4c3f-9b1e-50a217841b1f': getData.pageHome(),
        'a98f3d92-2a3e-4bfc-b1be-42a4bdf8c1e9': getData.pageProjects(),
        'c4b3e4d1-29a6-41d6-b5a7-9532a1b70e39': getData.pageThankYou(),
        '5d6f8a9b-4d91-4b33-9d8b-1e2f91778f32': getData.pageUses(),
        'd4f7b6a1-5e3f-4c9b-8f7e-31b2f7d9c8a2': getData.pageWorkExperiences()
      }

      const page = pageMap[id]

      if (!page) {
        throw new Error(`Page with ID ${id} not found.`)
      }

      return page
    }
  },
  PageLinks: {
    page: (parent: { id: string }) => {
      const pageMap: Record<string, any> = {
        'e3f7b6b1-8e3f-4c2a-8f8e-41c2f7d9b9b1': getData.pageAbout(),
        'f673e9d4-2a3c-4b14-b2b9-50d9a3b4d7f3': getData.pageArticles(),
        'c21e1b45-ff64-4c3f-9b1e-50a217841b1f': getData.pageHome(),
        'a98f3d92-2a3e-4bfc-b1be-42a4bdf8c1e9': getData.pageProjects(),
        'c4b3e4d1-29a6-41d6-b5a7-9532a1b70e39': getData.pageThankYou(),
        '5d6f8a9b-4d91-4b33-9d8b-1e2f91778f32': getData.pageUses(),
        'd4f7b6a1-5e3f-4c9b-8f7e-31b2f7d9c8a2': getData.pageWorkExperiences()
      }

      return pageMap[parent.id] || null
    }
  },
  StructuredData: {
    context: (parent: any) => sanitize(parent.context),
    type: (parent: any) => sanitize(parent.type),
    name: (parent: any) => sanitize(parent.name),
    description: (parent: any) => sanitize(parent.description),
    publisher: (parent: any) => parent.publisher,
    sameAs: () => {
      // Sanitize and return social media URLs from links data
      return getData.links().social.map((link: any) => sanitize(link.href))
    }
  }
}

// Initialize Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers
})

// Create handler for GraphQL API
const handler = startServerAndCreateNextHandler(server)

export async function GET(request: Request) {
  return handler(request)
}

export async function POST(request: Request) {
  return handler(request)
}
