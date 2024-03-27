'use client'

import { MapHTMLAttributes, forwardRef } from 'react'

export type MapRef = HTMLMapElement
export type MapProps = MapHTMLAttributes<MapRef>

/**
 * Render the map component.
 * @param children - The children of the map.
 * @param rest - The rest of the props of the map.
 * @returns The rendered map component.
 */
export const Map = forwardRef<MapRef, MapProps>(
  ({ children, ...rest }, ref) => {
    return (
      <map ref={ref} {...rest}>
        {children}
      </map>
    )
  }
)

Map.displayName = 'Map'

export default Map
