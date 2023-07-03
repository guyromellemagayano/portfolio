import Seo from '@/components/Seo'
import SimpleLayout from '@/components/SimpleLayout'
import ThankYouData from '@/data/thank-you'
import type { NextPage } from 'next'

// Thank you page
const ThankYou: NextPage = (): React.ReactNode => {
  const { meta, hero } = ThankYouData()

  return (
    <>
      <Seo meta={meta} />

      <SimpleLayout title={hero.heading} intro={hero.description} />
    </>
  )
}

export default ThankYou
