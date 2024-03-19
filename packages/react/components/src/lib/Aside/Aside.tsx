import { HTMLAttributes, forwardRef } from 'react'

export type AsideRef = HTMLElement
export type AsideProps = HTMLAttributes<AsideRef>

/**
 * Render the aside component.
 * @param children - The children of the aside.
 * @param rest - The rest of the props of the aside.
 * @returns The rendered aside component.
 */
const Aside = forwardRef<AsideRef, AsideProps>(({ children, ...rest }, ref) => {
  return (
    <aside ref={ref} {...rest}>
      {children}
    </aside>
  )
})

Aside.displayName = 'Aside'

export default Aside
