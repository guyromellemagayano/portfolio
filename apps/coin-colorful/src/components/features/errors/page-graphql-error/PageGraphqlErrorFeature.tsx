import { Box, Container } from '@mui/material'

import {
  GraphqlErrorShared,
  PageContainerTemplate
} from '@guy-romelle-magayano/coin-colorful/components'

export type PageGraphqlErrorFeatureProps = {
  error: any
}

/**
 * Renders the page graphql error component feature.
 * @param {PageGraphqlErrorFeatureProps} props - The properties to render the component with.
 * @returns The rendered feature component.
 */
const PageGraphqlErrorFeature = ({ error }: PageGraphqlErrorFeatureProps) => (
  <PageContainerTemplate>
    <Container>
      <Box my={12}>
        <GraphqlErrorShared error={error} />
      </Box>
    </Container>
  </PageContainerTemplate>
)

PageGraphqlErrorFeature.displayName = 'PageGraphqlErrorFeature'

export default PageGraphqlErrorFeature
