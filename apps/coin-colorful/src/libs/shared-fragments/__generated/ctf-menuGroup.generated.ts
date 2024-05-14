import * as Types from '../../__generated/graphql.types'

import {
  PageLinkFieldsFragment,
  PageLinkFieldsFragmentDoc
} from '../../../components/features/page-link/__generated/page-link-feature.generated'
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
