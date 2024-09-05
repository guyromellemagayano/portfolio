'use client'

import React from 'react'

export type MapRef = HTMLMapElement
export type MapProps = React.MapHTMLAttributes<MapRef>

/**
 * Render the map component.
 * @param {MapProps} props - The map component properties
 * @param {MapRef} ref - The map component reference
 * @returns The rendered map component
 */
const Map = React.forwardRef<MapRef, MapProps>(({ children, ...rest }, ref) => {
  return (
    <map ref={ref} {...rest}>
      {children}
    </map>
  )
})

Map.displayName = 'Map'

export default Map
