import { ImgHTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type ImageRef = HTMLImageElement
export type ImageProps = ImgHTMLAttributes<ImageRef>

/**
 * Render the image component.
 * @param src - The source of the image.
 * @param alt - The alternate text of the image.
 * @param rest - The rest of the props of the image.
 * @returns The rendered  image component.
 */
const Image = forwardRef<ImageRef, ImageProps>(
  ({ src = '#', alt = '', ...rest }, ref) => {
    return (
      <img ref={ref} src={src} alt={alt} {...rest} id={rest.id ?? customId} />
    )
  }
)

Image.displayName = 'Image'

export default Image