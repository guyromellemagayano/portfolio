import { HTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type DatalistRef = HTMLDataListElement
export type DatalistProps = HTMLAttributes<DatalistRef>

/**
 * Render the datalist component.
 * @param children - The children of the datalist.
 * @param rest - The rest of the props of the datalist.
 * @returns The rendered datalist component.
 */
const Datalist = forwardRef<DatalistRef, DatalistProps>(
  ({ children, ...rest }, ref) => {
    return (
      <datalist ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </datalist>
    )
  }
)

Datalist.displayName = 'Datalist'

export default Datalist
