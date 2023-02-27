/* eslint-disable @typescript-eslint/no-explicit-any */
import NavItem from '@/components/NavItem'
import NavigationData from '@/data/navigation'

// Main navigation for desktop devices
const DesktopNavigation = (rest: any): JSX.Element => {
  // Destructure the data from the FooterData function
  const { menu } = NavigationData()

  // Page filter
  const pageFilter = ['Skills', 'Work', 'Projects', 'About']

  return (
    <nav {...rest}>
      <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
        {menu
          .filter((item) => pageFilter.includes(item.title))
          .map((item) => (
            <NavItem key={item.link} href={item.link}>
              {item.title}
            </NavItem>
          ))}
      </ul>
    </nav>
  )
}

export default DesktopNavigation
