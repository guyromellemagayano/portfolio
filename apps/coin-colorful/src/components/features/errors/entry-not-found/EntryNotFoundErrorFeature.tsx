import { useTranslations } from 'next-intl'

import { ErrorBoxShared } from '@guy-romelle-magayano/coin-colorful/components'

export type EntryNotFoundErrorFeatureProps = {
  className?: string
}

/**
 * Renders the entry not found error feature component.
 * @param {EntryNotFoundErrorFeatureProps} props - The properties to render the component with.
 * @returns The rendered feature component.
 */
const EntryNotFoundErrorFeature = (props: EntryNotFoundErrorFeatureProps) => {
  const { className } = props

  const t = useTranslations()

  return (
    <ErrorBoxShared className={className}>
      {t('error.componentNotFound')}
    </ErrorBoxShared>
  )
}

EntryNotFoundErrorFeature.displayName = 'EntryNotFoundErrorFeature'

export default EntryNotFoundErrorFeature
