/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import * as Sentry from '@sentry/nextjs'
import fs from 'fs'
import { GraphQLScalarType, Kind } from 'graphql'
import gql from 'graphql-tag'
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

  serialize(value) {
    if (typeof value === 'object') {
      return value
    }
    throw new Error('CommonScalar can only serialize objects.')
  },

  parseValue(value) {
    if (typeof value === 'object') {
      return value
    }

    throw new Error('CommonScalar can only parse objects.')
  },

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
  skills: () => readJSONData('public/data/skills.json'),
  work: () => readJSONData('public/data/work.json'),
  pageAbout: () => readJSONData('public/data/page-about.json'),
  pageArticles: () => readJSONData('public/data/page-articles.json'),
  pageError: () => readJSONData('public/data/page-error.json'),
  pageHome: () => readJSONData('public/data/page-home.json'),
  pageNotFound: () => readJSONData('public/data/page-not-found.json'),
  pageProjects: () => readJSONData('public/data/page-projects.json'),
  pageThankYou: () => readJSONData('public/data/page-thank-you.json'),
  pages: () => readJSONData('public/data/pages.json'),
  pageSkills: () => readJSONData('public/data/page-skills.json'),
  pageWorkExperiences: () =>
    readJSONData('public/data/page-work-experiences.json'),
  pageUses: () => readJSONData('public/data/page-uses.json')
}

// Define your GraphQL schema
const typeDefs = gql`
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
    openGraph: OpenGraph
  }

  type OpenGraph {
    title: String!
    description: String!
    type: String!
    url: String!
    siteName: String!
    images: [OpenGraphImages!]
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
    cta: [Cta!]
  }

  type Cta {
    id: ID!
    link: String
    slug: String!
    buttonType: String!
  }

  type HomePage {
    id: ID!
    meta: Meta!
    structuredData: StructuredData
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

  type SkillsPage {
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
    cta: [Cta!]
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
    common: Common!
    images: Images!
    links: Links!
    page(id: ID!): PageData
    pages: Pages!
    skills: [Skills!]!
    work: Work!
    aboutPage: AboutPage!
    articlesPage: ArticlesPage!
    errorPage: ErrorPage!
    homePage: HomePage!
    notFoundPage: NotFoundPage!
    projectsPage: ProjectsPage!
    skillsPage: SkillsPage!
    thankYouPage: ThankYouPage!
    usesPage: UsesPage!
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
    skillsPage: () => getData.pageSkills(),
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
        '5d6f8a9b-4d91-4b33-9d8b-1e2f91778f32': getData.pageUses(),
        'd4f7b6a1-5e3f-4c9b-8f7e-31b2f7d9c8a2': getData.pageWorkExperiences(),
        'abc12345-6def-7890-abcd-1234567890ef': getData.skills()
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
        '5d6f8a9b-4d91-4b33-9d8b-1e2f91778f32': getData.pageUses(),
        'd4f7b6a1-5e3f-4c9b-8f7e-31b2f7d9c8a2': getData.pageWorkExperiences(),
        'abc12345-6def-7890-abcd-1234567890ef': getData.skills()
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
