import { FunctionComponent, SVGProps } from 'react'

import GitHubSvgImage from '@guy-romelle-magayano/portfolio/components/images/svg/Github'
import LinkedInSvgImage from '@guy-romelle-magayano/portfolio/components/images/svg/LinkedIn'
import MailSvgImage from '@guy-romelle-magayano/portfolio/components/images/svg/Mail'
import TwitterSvgImage from '@guy-romelle-magayano/portfolio/components/images/svg/Twitter'

import type { TCommonAdditionalProps } from '@guy-romelle-magayano/portfolio/types/common'

export type TSocialLinksData = TCommonAdditionalProps & {
  url: string
  ariaLabel: string
  icon: FunctionComponent<SVGProps<SVGSVGElement>>
}

/**
 * Social links data
 * @returns An array of objects containing social links data.
 */
const SocialLinksData = [
  {
    url: 'https://twitter.com/mguyromelle',
    ariaLabel: 'Follow on Twitter',
    icon: TwitterSvgImage
  },
  {
    url: 'https://github.com/guyromellemagayano',
    ariaLabel: 'Follow on GitHub',
    icon: GitHubSvgImage
  },
  {
    url: 'https://www.linkedin.com/in/mguyromelle/',
    ariaLabel: 'Follow on LinkedIn',
    icon: LinkedInSvgImage
  },
  {
    url: 'mailto:aspiredtechie2010@gmail.com',
    ariaLabel: 'aspiredtechie2010@gmail.com',
    icon: MailSvgImage
  }
] as TSocialLinksData[]

export default SocialLinksData
