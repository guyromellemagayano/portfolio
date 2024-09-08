/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { CSSProperties, forwardRef, useEffect, useRef } from 'react'

import { usePathname } from 'next/navigation'

import {
  Div,
  Header,
  type DivisionRef,
  type HeaderProps,
  type HeaderRef
} from '@react-components'

import { clamp, cn } from '@react-utils'

import {
  Avatar,
  AvatarContainer,
  BaseContainer,
  DarkModeButton,
  DesktopNavigation,
  MobileNavigation
} from '@portfolio/components'
import { PagesData } from '@portfolio/types'

export type HeaderLayoutRef = HeaderRef
export type HeaderLayoutProps = HeaderProps & {
  data: PagesData[]
}

/**
 * Render the header layout component.
 * @param {HeaderLayoutProps} props - The component props
 * @param {HeaderLayoutRef} ref - The component reference
 * @returns The rendered header layout component
 */
const HeaderLayout = forwardRef<HeaderLayoutRef, HeaderLayoutProps>(
  ({ data, className, ...rest }, ref) => {
    const pathname = usePathname()
    const headerRef = useRef<DivisionRef | null>(null)
    const avatarRef = useRef<DivisionRef | null>(null)
    const isInitial = useRef<boolean>(true)
    const isHomePage = pathname === '/'

    const setProperty = (property: string, value: string): void => {
      document.documentElement.style.setProperty(property, value)
    }

    const removeProperty = (property: string): void => {
      document.documentElement.style.removeProperty(property)
    }

    const updateHeaderStyles = (downDelay: number, upDelay: number) => {
      const header = headerRef.current
      if (!header) return

      const { top, height } = header.getBoundingClientRect()
      const scrollY = clamp({
        number: window.scrollY,
        min: 0,
        max: document.body.scrollHeight - window.innerHeight
      })

      if (isInitial.current) setProperty('--header-position', 'sticky')

      setProperty('--content-offset', `${downDelay}px`)

      if (scrollY < downDelay) {
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

    const updateAvatarStyles = (downDelay: number) => {
      if (!isHomePage || !avatarRef.current) return

      const fromScale = 1
      const toScale = 36 / 64
      const scrollY = downDelay - window.scrollY
      let scale = (scrollY * (fromScale - toScale)) / downDelay + toScale
      scale = clamp({ number: scale, min: fromScale, max: toScale })

      let x = (scrollY * (0 - 2 / 16)) / downDelay + 2 / 16
      x = clamp({ number: x, min: 0, max: 2 / 16 })

      setProperty(
        '--avatar-image-transform',
        `translate3d(${x}rem, 0, 0) scale(${scale})`
      )
      const borderScale = 1 / (toScale / scale)
      const borderX = (-2 / 16 + x) * borderScale
      setProperty(
        '--avatar-border-transform',
        `translate3d(${borderX}rem, 0, 0) scale(${borderScale})`
      )
      setProperty('--avatar-border-opacity', scale === toScale ? '1' : '0')
    }

    useEffect(() => {
      const downDelay = avatarRef.current?.offsetTop ?? 0
      const upDelay = 64

      const handleScroll = () => {
        updateHeaderStyles(downDelay, upDelay)
        updateAvatarStyles(downDelay)
        isInitial.current = false
      }

      window.addEventListener('scroll', handleScroll, { passive: true })
      window.addEventListener('resize', handleScroll)

      return () => {
        window.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', handleScroll)
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
        <Header
          className={cn(
            'pointer-events-none relative z-50 flex flex-none flex-col',
            className
          )}
          ref={ref}
          style={{
            height: 'var(--header-height)',
            marginBottom: 'var(--header-mb)'
          }}
          {...rest}
        >
          {isHomePage && (
            <>
              <Div
                ref={avatarRef}
                className="order-last mt-[calc(theme(spacing.16)-theme(spacing.3))]"
              />
              <BaseContainer
                className="top-0 order-last -mb-3 pt-3"
                style={headerPosition}
              >
                <Div
                  className="top-[var(--avatar-top,theme(spacing.3))] w-full"
                  style={headerInnerPosition}
                >
                  <Div className="relative">
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
                  </Div>
                </Div>
              </BaseContainer>
            </>
          )}

          <Div
            ref={headerRef}
            className="top-0 z-10 h-16 pt-6"
            style={headerPosition}
          >
            <BaseContainer
              className="top-[var(--header-top,theme(spacing.6))] w-full"
              style={headerInnerPosition}
            >
              <Div className="relative flex gap-4">
                <Div className="flex flex-1">
                  {!isHomePage && (
                    <AvatarContainer>
                      <Avatar />
                    </AvatarContainer>
                  )}
                </Div>
                <Div className="flex flex-1 justify-end md:justify-center">
                  <MobileNavigation
                    className="pointer-events-auto md:hidden"
                    data={data}
                  />
                  <DesktopNavigation
                    className="pointer-events-auto hidden md:block"
                    data={data}
                  />
                </Div>
                <Div className="flex justify-end md:flex-1">
                  <Div className="pointer-events-auto">
                    <DarkModeButton />
                  </Div>
                </Div>
              </Div>
            </BaseContainer>
          </Div>
        </Header>

        {isHomePage && (
          <Div
            className="flex-none"
            style={{ height: 'var(--content-offset)' }}
          />
        )}
      </>
    )
  }
)

HeaderLayout.displayName = 'HeaderLayout'

export default HeaderLayout
