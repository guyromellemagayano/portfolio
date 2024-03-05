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
import { SharedSvgImage } from '../image/svg'
import { SharedLayout } from '../layout'
import { SharedLink } from '../link'
import { SharedList, SharedListItem } from '../list'
import { SharedParagraph } from '../paragraph'
import { SharedPreformattedText } from '../preformatted-text'

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
  SvgImage: typeof SharedSvgImage
  List: typeof SharedList
  ListItem: typeof SharedListItem
}

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
SharedReactComponent.SvgImage = SharedSvgImage
SharedReactComponent.List = SharedList
SharedReactComponent.ListItem = SharedListItem

SharedReactComponent.displayName = 'Shared'

export default SharedReactComponent
