import { SectionLayout } from '@/components'

import { TToolsListProps } from '@/types/components'

/**
 * Renders a list of tools.
 * @param {React.ReactNode} children - The child elements to be rendered.
 * @returns {JSX.Element} The rendered component.
 */
const ToolsList = ({ children, ...rest }: TToolsListProps): JSX.Element => {
  return (
    <SectionLayout {...rest}>
      <ul className="space-y-16">{children}</ul>
    </SectionLayout>
  )
}

export default ToolsList
