import { getLocale } from 'next-intl/server'

import { BaseLayout, NotFoundApp } from '@portfolio/components'

/**
 * Render the custom not found app page.
 * @returns The rendered custom not found app page
 */
const NotFoundPage = async () => {
  const locale = await getLocale()

  return (
    <BaseLayout locale={locale}>
      <NotFoundApp className="flex h-full items-center" />
    </BaseLayout>
  )
}

NotFoundPage.displayName = 'NotFoundPage'

export default NotFoundPage
