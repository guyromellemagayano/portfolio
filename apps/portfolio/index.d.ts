// *.png module declaration
declare module '*.png'

// *.svg module declaration
declare module '*.svg' {
  import { FC, SVGProps } from 'react'
  const content: FC<SVGProps<SVGElement>>
  export default content
}

// *.svg?url module declaration
declare module '*.svg?url' {
  const content: any
  export default content
}

// *.mdx module declaration
declare module '*.mdx' {
  import { ReactNode } from 'react'
  let MDXComponent: (props: any) => ReactNode
  export default MDXComponent
}

// `next-intl` module declaration
type Messages = typeof import('./messages/en.json')
declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}
}
