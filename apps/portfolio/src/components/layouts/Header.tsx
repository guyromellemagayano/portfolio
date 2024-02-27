'use client'

import { CSSProperties, ElementRef, FC, useEffect, useRef } from 'react'

import { usePathname } from 'next/navigation'

import Avatar from '@guy-romelle-magayano/portfolio/components/Avatar'
import Container from '@guy-romelle-magayano/portfolio/components/Container'
import DesktopNavigation from '@guy-romelle-magayano/portfolio/components/Navigation'
import DarkModeButton from '@guy-romelle-magayano/portfolio/components/buttons/DarkMode'
import AvatarContainer from '@guy-romelle-magayano/portfolio/components/container/Avatar'
import MobileNavigation from '@guy-romelle-magayano/portfolio/components/navigation/Mobile'
import { SharedHeaderUi } from '@guy-romelle-magayano/shared-ui'

import clamp from '@guy-romelle-magayano/portfolio/utils/helpers'

import { TCommonComponentProps } from '@guy-romelle-magayano/portfolio/types/common'

export type THeaderLayoutProps = TCommonComponentProps

/**
 * Renders the header layout component.
 * @param className - The additional class name for the component.
 * @param id - The additional ID for the component.
 * @param rest - The rest of the props.
 * @returns The rendered header layout component.
 */
const HeaderLayout: FC<THeaderLayoutProps> = ({ className, id, ...rest }) => {
  const pathname = usePathname(),
    headerRef = useRef<ElementRef<'div'>>(null),
    avatarRef = useRef<ElementRef<'div'>>(null),
    isInitial = useRef<boolean>(true)

  const isHomePage = pathname === '/'

  useEffect(() => {
    const downDelay = avatarRef.current?.offsetTop ?? 0
    const upDelay = 64

    const setProperty = (property: string, value: string): void => {
      document.documentElement.style.setProperty(property, value)
    }

    const removeProperty = (property: string): void => {
      document.documentElement.style.removeProperty(property)
    }

    const updateHeaderStyles = (): void => {
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
    }

    const updateAvatarStyles = (): void => {
      if (!isHomePage) {
        return
      }

      const fromScale = 1,
        toScale = 36 / 64,
        fromX = 0,
        toX = 2 / 16

      const scrollY = downDelay - window.scrollY

      let scale = (scrollY * (fromScale - toScale)) / downDelay + toScale
      scale = clamp({ number: scale, min: fromScale, max: toScale })

      let x = (scrollY * (fromX - toX)) / downDelay + toX
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
    }

    const updateStyles = () => {
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

  const headerPosition = {
    position: 'var(--header-position)'
  } as unknown as CSSProperties

  const headerInnerPosition = {
    position: 'var(--header-inner-position)'
  } as unknown as CSSProperties

  return (
    <>
      <SharedHeaderUi
        className="pointer-events-none relative z-50 flex flex-none flex-col"
        style={{
          height: 'var(--header-height)',
          marginBottom: 'var(--header-mb)'
        }}
        {...rest}
      >
        {isHomePage && (
          <>
            <div
              ref={avatarRef}
              className="order-last mt-[calc(theme(spacing.16)-theme(spacing.3))]"
            />
            <Container
              className="top-0 order-last -mb-3 pt-3"
              style={headerPosition}
            >
              <div
                className="top-[var(--avatar-top,theme(spacing.3))] w-full"
                style={headerInnerPosition}
              >
                <div className="relative">
                  <AvatarContainer
                    className="absolute left-0 top-3 origin-left transition-opacity"
                    style={{
                      opacity: 'var(--avatar-border-opacity, 0)',
                      transform: 'var(--avatar-border-transform)'
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

        <div
          ref={headerRef}
          className="top-0 z-10 h-16 pt-6"
          style={headerPosition}
        >
          <Container
            className="top-[var(--header-top,theme(spacing.6))] w-full"
            style={headerInnerPosition}
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
                  <DarkModeButton />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </SharedHeaderUi>

      {isHomePage && (
        <div
          className="flex-none"
          style={{ height: 'var(--content-offset)' }}
        />
      )}
    </>
  )
}

export default HeaderLayout
