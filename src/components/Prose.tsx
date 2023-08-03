import { IProseProps } from '@/interfaces/components'
import clsx from 'clsx'

// Prose component
const Prose = ({ children, className }: IProseProps): React.ReactNode => {
  return <div className={clsx('prose dark:prose-invert', className)}>{children}</div>
}

export default Prose
