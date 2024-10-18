import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import gql from 'graphql-tag'

// Define your GraphQL schema
const typeDefs = gql`
  type Query {
    hello: String
  }
`

// Resolvers
const resolvers = {
  Query: {
    hello: () => 'Hello World'
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
