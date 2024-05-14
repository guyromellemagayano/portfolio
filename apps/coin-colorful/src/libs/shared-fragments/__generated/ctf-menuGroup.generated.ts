import { PageLinkFieldsFragment } from '@guy-romelle-magayano/coin-colorful/components'

export type MenuGroupFieldsFragment = {
  __typename?: 'MenuGroupFeaturedPagesCollection'
  items: Array<({ __typename?: 'Page' } & PageLinkFieldsFragment) | null>
}

export const MenuGroupFieldsFragmentDoc = `
  fragment MenuGroupFields on MenuGroupFeaturedPagesCollection {
    items {
      ...PageLinkFields
    }
  }
`
