import { Theme } from '@mui/material/styles'

/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.svg' {
  const content: any
  export const ReactComponent: any
  export default content
}

/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'react-kawaii' {
  const content: any
  export const File: any
  export default content
}

declare module 'catchify' {
  function catchify<E extends Error, T>(a: Promise<T>): Promise<[E, T]>
  export default catchify
}

declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme {}
}
