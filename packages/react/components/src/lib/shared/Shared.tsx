import {
  ElementType,
  ForwardRefExoticComponent,
  ForwardedRef,
  Fragment,
  HTMLAttributes,
  RefAttributes,
  forwardRef,
  useId
} from 'react'

import { TCommonSharedComponentsProps } from '../../components'
import { SharedBlockquote } from '../blockquote'
import { SharedButton } from '../button'
import { SharedHeading } from '../heading'
import { SharedImage } from '../image'
import { SharedLayout } from '../layout'
import { SharedLink } from '../link'
import { SharedList, SharedListItem } from '../list'
import { SharedParagraph } from '../paragraph'
import { SharedPreformattedText } from '../preformatted-text'
import { SharedSvg, SharedSvgPath } from '../svg'

type SharedRef = HTMLElement

interface ISharedProps
  extends HTMLAttributes<SharedRef>,
    TCommonSharedComponentsProps {
  as?: ElementType
}

interface ISharedStaticComponents {
  Blockquote: typeof SharedBlockquote
  Button: typeof SharedButton
  Heading: typeof SharedHeading
  Image: typeof SharedImage
  Layout: typeof SharedLayout
  Link: typeof SharedLink
  Paragraph: typeof SharedParagraph
  PreformattedText: typeof SharedPreformattedText
  Svg: typeof SharedSvg
  SvgPath: typeof SharedSvgPath
  List: typeof SharedList
  ListItem: typeof SharedListItem
}

/**
 * A shared component that provides a consistent API for rendering HTML elements.
 * @param props.as - The HTML element to render
 * @param props.children - The content to render
 * @param props.rest - Additional HTML attributes
 * @returns The rendered shared component
 */
const SharedReactComponent = forwardRef<SharedRef, ISharedProps>(
  (
    { as: Component = Fragment, children, ...rest },
    ref: ForwardedRef<SharedRef>
  ) => {
    // Generates a unique ID that can be used for accessibility attributes
    const customId = useId()

    return (
      <Component ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </Component>
    )
  }
) as ForwardRefExoticComponent<ISharedProps & RefAttributes<SharedRef>> &
  ISharedStaticComponents

SharedReactComponent.Blockquote = SharedBlockquote
SharedReactComponent.Button = SharedButton
SharedReactComponent.Heading = SharedHeading
SharedReactComponent.Image = SharedImage
SharedReactComponent.Layout = SharedLayout
SharedReactComponent.Link = SharedLink
SharedReactComponent.Paragraph = SharedParagraph
SharedReactComponent.PreformattedText = SharedPreformattedText
SharedReactComponent.Svg = SharedSvg
SharedReactComponent.SvgPath = SharedSvgPath
SharedReactComponent.List = SharedList
SharedReactComponent.ListItem = SharedListItem

SharedReactComponent.displayName = 'Shared'

export default SharedReactComponent
