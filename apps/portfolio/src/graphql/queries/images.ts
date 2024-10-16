import gql from 'graphql-tag'

export const getAvatarImageQuery = gql`
  query AvatarImage {
    images {
      avatarImage {
        alt
        height
        width
        src
        id
      }
    }
  }
`
