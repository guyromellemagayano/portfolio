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
 * Renders a page container component.
 * @param children - The content to be rendered inside the page container.
 * @param [style] - The inline styles to be applied to the page container.
 * @param [className] - The CSS class name to be applied to the page container.
 * @returns The rendered page container component.
 */
const PageContainer = ({ className, style, children }: PageContainerProps) => {
  const classes = useStyles()

  return (
    <Div style={style} className={clsx(classes.pageContainerRoot, className)}>
      {children}
    </Div>
  )
}

PageContainer.displayName = 'PageContainer'

export default PageContainer
