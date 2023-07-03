import React from 'react'

// Arrow down SVG icon
const ArrowDownSvgIcon = (rest: React.SVGProps<SVGSVGElement>): React.ReactNode => {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...rest}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default ArrowDownSvgIcon
