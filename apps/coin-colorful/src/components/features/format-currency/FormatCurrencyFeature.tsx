import { useContentfulContext } from '@guy-romelle-magayano/coin-colorful/hooks'

export type FormatCurrencyFeatureProps = {
  value: number
  locale?: string
  style?: string
  currency?: string
}

/**
 * Renders the formatted currency value feature component.
 * @param {FormatCurrencyFeatureProps} props - The properties to render the component with.
 * @returns The formatted currency value feature component.
 */
const FormatCurrencyFeature = (props: FormatCurrencyFeatureProps) => {
  const { value, locale, style = 'currency', currency = 'EUR' } = props

  const { locale: localeFromRouter } = useContentfulContext()

  return (
    <>
      {new Intl.NumberFormat(locale || localeFromRouter, {
        style,
        currency
      })?.format(value) || value}
    </>
  )
}

FormatCurrencyFeature.displayName = 'FormatCurrencyFeature'

export default FormatCurrencyFeature
