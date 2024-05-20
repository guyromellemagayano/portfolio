'use client'

import { MapHTMLAttributes, forwardRef } from 'react'

export type MapRef = HTMLMapElement
export type MapProps = MapHTMLAttributes<MapRef>

/**
 * Render the map component.
 * @param {MapProps} props - The map component properties.
 * @param {MapRef} ref - The map component reference.
 * @returns The rendered map component.
 */
const Map = forwardRef<MapRef, MapProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <map ref={ref} {...rest}>
      {children}
    </map>
  )
})

Map.displayName = 'Map'

export default Map
