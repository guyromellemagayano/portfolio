import 'react'

import { CSSProp, css as cssImport, styledImport } from 'styled-components'
import 'twin.macro'

import { TCommonComponentReturnType } from '@guy-romelle-magayano/portfolio/types/common'

declare module 'focus-visible' {
  const focusVisible: () => void
  export default focusVisible
}

declare module '*.mdx' {
  let MDXComponent: (props: any) => TCommonComponentReturnType
  export default MDXComponent
}

declare module 'twin.macro' {
  // The styled and css imports
  const styled: typeof styledImport
  const css: typeof cssImport
}

declare module 'react' {
  // The css prop
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: CSSProp
    tw?: string
  }

  // The inline svg css prop
  interface SVGProps<T> extends SVGProps<SVGSVGElement> {
    css?: CSSProp
    tw?: string
  }
}

// The 'as' prop on styled components
declare global {
  namespace JSX {
    interface IntrinsicAttributes<T> extends DOMAttributes<T> {
      as?: string | Element
    }
  }
}
