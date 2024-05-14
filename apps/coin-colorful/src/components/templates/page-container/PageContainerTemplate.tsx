import { ReactNode } from 'react'

import { CSSProperties } from '@mui/material/styles/createTypography'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'

import { Div } from '@guy-romelle-magayano/react-components/server'

const useStyles = makeStyles(() => ({
  pageContainerRoot: {
    width: '100%'
  }
}))

export type PageContainerProps = {
  className?: string
  style?: CSSProperties
  children?: ReactNode | ReactNode[]
}

/**
 * Renders the page container template component.
 * @param {PageContainerProps} props - The properties to render the component with.
 * @returns The rendered component.
 */
const PageContainer = (props: PageContainerProps) => {
  const { className, style, children } = props

  const classes = useStyles()

  return (
    children && (
      <Div style={style} className={clsx(classes.pageContainerRoot, className)}>
        {children}
      </Div>
    )
  )
}

PageContainer.displayName = 'PageContainer'

export default PageContainer
