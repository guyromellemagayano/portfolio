import { ReactNode } from 'react'

declare module '*.png'

declare module '*.svg' {
  const content: any
  export const ReactComponent: any
  export default content
}

declare module '*.mdx' {
  let MDXComponent: (props: any) => ReactNode
  export default MDXComponent
}
