import React from 'react'

export type TMapRef = HTMLMapElement
export type TMapProps = React.MapHTMLAttributes<TMapRef>

/**
 * Render the map component.
 * @param {TMapProps} props - The map component properties
 * @param {TMapRef} ref - The map component reference
 * @returns The rendered map component
 */
const Map = React.forwardRef<TMapRef, TMapProps>(
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
