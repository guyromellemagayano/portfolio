/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'focus-visible' {
  const focusVisible: () => void
  export default focusVisible
}

declare module '*.mdx' {
  let MDXComponent: (props: any) => React.ReactNode
  export default MDXComponent
}
