import { gql } from '@apollo/client'

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
