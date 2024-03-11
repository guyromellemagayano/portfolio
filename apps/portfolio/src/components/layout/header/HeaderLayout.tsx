'use client'

import { CSSProperties, ElementRef, useEffect, useRef } from 'react'

import { usePathname } from 'next/navigation'

import { SharedReactComponent } from '@guy-romelle-magayano/react-components/server'

import { Avatar } from '@guy-romelle-magayano/portfolio/components/avatar'
import imageAvatar from '@guy-romelle-magayano/portfolio/images/avatar.jpg'

import { DarkModeButton } from '@guy-romelle-magayano/portfolio/components/buttons/dark-mode'
import { clamp, cn } from '@guy-romelle-magayano/react-utils/server'

/**
 * Render the header layout component.
 * @returns The rendered header layout component.
 */
const HeaderLayout = () => {
  const pathname = usePathname(),
    headerRef = useRef<ElementRef<'div'>>(null),
    avatarRef = useRef<ElementRef<'div'>>(null),
    isInitial = useRef<boolean>(true),
    isHomePage = pathname === '/',
    headerPosition = {
      position: 'var(--header-position)'
    } as unknown as CSSProperties,
    headerInnerPosition = {
      position: 'var(--header-inner-position)'
    } as unknown as CSSProperties,
    avatar = {
      link: {
        href: '/',
        className: 'block h-16 w-16 origin-left'
      },
      image: {
        src: imageAvatar,
        alt: '',
        large: true
      }
    }

  useEffect(() => {
    const downDelay = avatarRef.current?.offsetTop ?? 0,
      upDelay = 64,
      setProperty = (property: string, value: string): void => {
        document.documentElement.style.setProperty(property, value)
      },
      removeProperty = (property: string): void => {
        document.documentElement.style.removeProperty(property)
      },
      updateHeaderStyles = (): void => {
        if (!headerRef.current) {
          return
        }

        const { top, height } = headerRef.current.getBoundingClientRect()
        const scrollY = clamp({
          number: window.scrollY,
          min: 0,
          max: document.body.scrollHeight - window.innerHeight
        })

        if (isInitial.current) {
          setProperty('--header-position', 'sticky')
        }

        setProperty('--content-offset', `${downDelay}px`)

        if (isInitial.current || scrollY < downDelay) {
          setProperty('--header-height', `${downDelay + height}px`)
          setProperty('--header-mb', `${-downDelay}px`)
        } else if (top + height < -upDelay) {
          const offset = Math.max(height, scrollY - upDelay)
          setProperty('--header-height', `${offset}px`)
          setProperty('--header-mb', `${height - offset}px`)
        } else if (top === 0) {
          setProperty('--header-height', `${scrollY + height}px`)
          setProperty('--header-mb', `${-scrollY}px`)
        }

        if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
          setProperty('--header-inner-position', 'fixed')
          removeProperty('--header-top')
          removeProperty('--avatar-top')
        } else {
          removeProperty('--header-inner-position')
          setProperty('--header-top', '0px')
          setProperty('--avatar-top', '0px')
        }
      },
      updateAvatarStyles = (): void => {
        if (!isHomePage) {
          return
        }

        const fromScale = 1,
          toScale = 36 / 64,
          fromX = 0,
          toX = 2 / 16,
          scrollY = downDelay - window.scrollY

        let scale = (scrollY * (fromScale - toScale)) / downDelay + toScale,
          x = (scrollY * (fromX - toX)) / downDelay + toX

        scale = clamp({ number: scale, min: fromScale, max: toScale })
        x = clamp({ number: x, min: fromX, max: toX })

        setProperty(
          '--avatar-image-transform',
          `translate3d(${x}rem, 0, 0) scale(${scale})`
        )

        const borderScale = 1 / (toScale / scale),
          borderX = (-toX + x) * borderScale,
          borderTransform = `translate3d(${borderX}rem, 0, 0) scale(${borderScale})`

        setProperty('--avatar-border-transform', borderTransform)
        setProperty('--avatar-border-opacity', scale === toScale ? '1' : '0')
      },
      updateStyles = () => {
        updateHeaderStyles()
        updateAvatarStyles()
        isInitial.current = false
      }

    updateStyles()
    window.addEventListener('scroll', updateStyles, { passive: true })
    window.addEventListener('resize', updateStyles)

    return () => {
      window.removeEventListener('scroll', updateStyles)
      window.removeEventListener('resize', updateStyles)
    }
  }, [isHomePage])

  return (
    <>
      <SharedReactComponent.Layout
        as="header"
        className="pointer-events-none relative z-50 flex flex-none flex-col"
        style={{
          height: 'var(--header-height)',
          marginBottom: 'var(--header-mb)'
        }}
      >
        {isHomePage && (
          <>
            <SharedReactComponent.Layout
              ref={avatarRef}
              className="order-last mt-[calc(theme(spacing.16)-theme(spacing.3))]"
            />
            <SharedReactComponent.Layout
              className="top-0 order-last -mb-3 pt-3"
              style={headerPosition}
            >
              <SharedReactComponent.Layout
                className="top-[var(--avatar-top,theme(spacing.3))] w-full"
                style={headerInnerPosition}
              >
                <SharedReactComponent.Layout className="relative">
                  <SharedReactComponent.Layout
                    className="absolute left-0 top-3 h-10 w-10 origin-left rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition-opacity dark:bg-zinc-800/90 dark:ring-white/10"
                    style={{
                      opacity: 'var(--avatar-border-opacity, 0)',
                      transform: 'var(--avatar-border-transform)'
                    }}
                  />
                  <Avatar
                    link={{ ...avatar.link }}
                    image={{ ...avatar.image }}
                  />
                </SharedReactComponent.Layout>
              </SharedReactComponent.Layout>
            </SharedReactComponent.Layout>
          </>
        )}

        <SharedReactComponent.Layout
          ref={headerRef}
          className="top-0 z-10 h-16 pt-6"
          style={headerPosition}
        >
          <SharedReactComponent.Layout
            className="top-[var(--header-top,theme(spacing.6))] w-full"
            style={headerInnerPosition}
          >
            <SharedReactComponent.Layout className="relative flex gap-4">
              <SharedReactComponent.Layout className="flex flex-1">
                {!isHomePage && (
                  <SharedReactComponent.Layout className="h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10">
                    <Avatar
                      link={{ ...avatar.link }}
                      image={{ ...avatar.image }}
                    />
                  </SharedReactComponent.Layout>
                )}
              </SharedReactComponent.Layout>
              <SharedReactComponent.Layout className="flex flex-1 justify-end md:justify-center">
                {/* <MobileNavigation className=)}"pointer-events-auto md:hidden" /> */}
                {/* <DesktopNavigation className=)}"pointer-events-auto hidden md:block" /> */}
              </SharedReactComponent.Layout>
              <SharedReactComponent.Layout className="flex justify-end md:flex-1">
                <SharedReactComponent.Layout className="pointer-events-auto">
                  <DarkModeButton />
                </SharedReactComponent.Layout>
              </SharedReactComponent.Layout>
            </SharedReactComponent.Layout>
          </SharedReactComponent.Layout>
        </SharedReactComponent.Layout>
      </SharedReactComponent.Layout>

      {isHomePage && (
        <SharedReactComponent.Layout
          className="flex-none"
          style={{ height: 'var(--content-offset)' }}
        />
      )}
    </>
  )
}

HeaderLayout.displayName = 'HeaderLayout'

export default HeaderLayout
