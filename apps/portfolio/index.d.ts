import { ReactNode, SVGProps } from 'react'

import { TCommonComponentReturnType } from '@guy-romelle-magayano/portfolio/types/common'

/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.svg' {
  const content: ReactNode<SVGProps<SVGSVGElement>>
  export default content
}

declare module 'focus-visible' {
  const focusVisible: () => void
  export default focusVisible
}

declare module '*.mdx' {
  let MDXComponent: (props: any) => TCommonComponentReturnType
  export default MDXComponent
}
