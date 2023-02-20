/* eslint-disable @typescript-eslint/no-explicit-any */
import ToggleDarkMode from '@/components/buttons/ToggleDarkMode'
import Container from '@/components/Container'
import DesktopNavigation from '@/components/DesktopNavigation'
import MobileNavigation from '@/components/MobileNavigation'
import clamp from '@/utils/clamp'
import { useRouter } from 'next/router'
import React from 'react'
import Avatar from '../Avatar'
import AvatarContainer from '../AvatarContainer'

// Header component
const Header = (): JSX.Element => {
  const isHomePage = useRouter().pathname === '/'

  const headerRef = React.useRef<any | null>()
  const avatarRef = React.useRef<any | null>()
  const isInitial = React.useRef<boolean>(true)

  React.useEffect(() => {
    const downDelay = avatarRef.current?.offsetTop ?? 0
    const upDelay = 64

    const setProperty = (property: string, value: string): void => {
      document.documentElement.style.setProperty(property, value)
    }

    const removeProperty = (property: string): void => {
      document.documentElement.style.removeProperty(property)
    }

    const updateHeaderStyles = (): void => {
      const { top, height } = headerRef.current.getBoundingClientRect()
      const scrollY = clamp({ number: window.scrollY, a: 0, b: document.body.scrollHeight - window.innerHeight })

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
    }

    const updateAvatarStyles = (): void => {
      if (!isHomePage) {
        return
      }

      const fromScale = 1
      const toScale = 36 / 64
      const fromX = 0
      const toX = 2 / 16

      const scrollY = downDelay - window.scrollY

      let scale = (scrollY * (fromScale - toScale)) / downDelay + toScale
      scale = clamp({ number: scale, a: fromScale, b: toScale })

      let x = (scrollY * (fromX - toX)) / downDelay + toX
      x = clamp({ number: x, a: fromX, b: toX })

      setProperty('--avatar-image-transform', `translate3d(${x}rem, 0, 0) scale(${scale})`)

      const borderScale = 1 / (toScale / scale)
      const borderX = (-toX + x) * borderScale
      const borderTransform = `translate3d(${borderX}rem, 0, 0) scale(${borderScale})`

      setProperty('--avatar-border-transform', borderTransform)
      setProperty('--avatar-border-opacity', scale === toScale ? '1' : '0')
    }

    const updateStyles = (): void => {
      updateHeaderStyles()
      updateAvatarStyles()
      isInitial.current = false
    }

    updateStyles()
    window.addEventListener('scroll', updateStyles, true)
    window.addEventListener('resize', updateStyles)

    return () => {
      window.removeEventListener('scroll', updateStyles, true)
      window.removeEventListener('resize', updateStyles)
    }
  }, [isHomePage])

  const headerPosition = {
    position: 'var(--header-position)',
  } as unknown as React.CSSProperties

  const headerInnerPosition = {
    position: 'var(--header-inner-position)',
  } as unknown as React.CSSProperties

  return (
    <>
      <header
        className="pointer-events-none relative z-50 flex flex-col"
        style={{
          height: 'var(--header-height)',
          marginBottom: 'var(--header-mb)',
        }}
      >
        {isHomePage && (
          <>
            <div ref={avatarRef} className="order-last mt-[calc(theme(spacing.16)-theme(spacing.3))]" />
            <Container className="top-0 order-last -mb-3 pt-3" style={{ position: 'var(--header-position)' }}>
              <div className="top-[var(--avatar-top,theme(spacing.3))] w-full" style={headerInnerPosition}>
                <div className="relative">
                  <AvatarContainer
                    className="absolute left-0 top-3 origin-left transition-opacity"
                    style={{
                      opacity: 'var(--avatar-border-opacity, 0)',
                      transform: 'var(--avatar-border-transform)',
                    }}
                  />
                  <Avatar
                    large
                    className="block h-16 w-16 origin-left"
                    style={{ transform: 'var(--avatar-image-transform)' }}
                  />
                </div>
              </div>
            </Container>
          </>
        )}

        <div ref={headerRef} className="top-0 z-10 h-16 pt-6" style={headerPosition}>
          <Container
            className="top-[var(--header-top,theme(spacing.6))] w-full"
            style={{ position: 'var(--header-inner-position)' }}
          >
            <div className="relative flex gap-4">
              <div className="flex flex-1">
                {!isHomePage && (
                  <AvatarContainer>
                    <Avatar />
                  </AvatarContainer>
                )}
              </div>
              <div className="flex flex-1 justify-end md:justify-center">
                <MobileNavigation className="pointer-events-auto md:hidden" />
                <DesktopNavigation className="pointer-events-auto hidden md:block" />
              </div>
              <div className="flex justify-end md:flex-1">
                <div className="pointer-events-auto">
                  <ToggleDarkMode />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </header>

      {isHomePage && <div style={{ height: 'var(--content-offset)' }} />}
    </>
  )
}

export default Header
