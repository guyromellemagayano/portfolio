import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'

export const routingDefaults = {
  locales: ['en-US'],
  defaultLocale: 'en-US'
}

export const routing = defineRouting({
  ...routingDefaults
})

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation(routing)
