'use client'

import {
  ElementType,
  ForwardRefExoticComponent,
  ForwardedRef,
  Fragment,
  HTMLAttributes,
  RefAttributes,
  forwardRef
} from 'react'

import { TCommonSharedComponentsProps } from '@guy-romelle-magayano/react-components'

import { Abbreviation } from '../Abbreviation'
import { Address } from '../Address'
import { Area } from '../Area'
import { Article } from '../Article'
import { Aside } from '../Aside'
import { Audio } from '../Audio'
import { Base } from '../Base'
import { BiDirectionalIsolation } from '../BiDirectionalIsolation'
import { BiDirectionalOverride } from '../BiDirectionalOverride'
import { Blockquote } from '../Blockquote'
import { Body } from '../Body'
import { Bold } from '../Bold'
import { Button } from '../Button'
import { Canvas } from '../Canvas'
import { Caption } from '../Caption'
import { Cite } from '../Cite'
import { Code } from '../Code'
import { Column } from '../Column'
import { ColumnGroup } from '../ColumnGroup'
import { Data } from '../Data'
import { Datalist } from '../Datalist'
import { DefinitionTerm } from '../DefinitionTerm'
import { DeletedText } from '../DeletedText'
import { DescriptionDetails } from '../DescriptionDetails'
import { DescriptionList } from '../DescriptionList'
import { DescriptionTerm } from '../DescriptionTerm'
import { Details } from '../Details'
import { Dialog } from '../Dialog'
import { Division } from '../Division'
import { EmphasizedText } from '../EmphasizedText'
import { Fieldset } from '../Fieldset'
import { Figcaption } from '../Figcaption'
import { Figure } from '../Figure'
import { Footer } from '../Footer'
import { Form } from '../Form'
import { Head } from '../Head'
import { Header } from '../Header'
import { Heading } from '../Heading'
import { HeadingGroup } from '../HeadingGroup'
import { HorizontalRule } from '../HorizontalRule'
import { Html } from '../Html'
import { Hyperlink } from '../Hyperlink'
import { Iframe } from '../Iframe'
import { Image } from '../Image'
import { Input } from '../Input'
import { InsertedText } from '../InsertedText'
import { Italic } from '../Italic'
import { KeyboardInput } from '../KeyboardInput'
import { Legend } from '../Legend'
import { LineBreak } from '../LineBreak'
import { Link } from '../Link'
import { List } from '../List'
import { Main } from '../Main'
import { Map } from '../Map'
import { Mark } from '../Mark'
import { Menu } from '../Menu'
import { Meta } from '../Meta'
import { Meter } from '../Meter'
import { Nav } from '../Nav'
import { NoScript } from '../NoScript'
import { Optgroup } from '../Optgroup'
import { Option } from '../Option'
import { OrderedList } from '../OrderedList'
import { Output } from '../Output'
import { Paragraph } from '../Paragraph'
import { Picture } from '../Picture'
import { PreformattedText } from '../PreformattedText'
import { Progress } from '../Progress'
import { Quote } from '../Quote'
import { Ruby } from '../Ruby'
import { RubyParentheses } from '../RubyParentheses'
import { RubyText } from '../RubyText'
import { Sample } from '../Sample'
import { Script } from '../Script'
import { Search } from '../Search'
import { Section } from '../Section'
import { Select } from '../Select'
import { Small } from '../Small'
import { Source } from '../Source'
import { Span } from '../Span'
import { Strikethrough } from '../Strikethrough'
import { Strong } from '../Strong'
import { Style } from '../Style'
import { Subscript } from '../Subscript'
import { Summary } from '../Summary'
import { Superscript } from '../Superscript'
import { Svg, SvgPath } from '../Svg'
import { Table } from '../Table'
import { TableBody } from '../TableBody'
import { TableData } from '../TableData'
import { TableFooter } from '../TableFooter'
import { TableHead } from '../TableHead'
import { TableHeader } from '../TableHeader'
import { TableRow } from '../TableRow'
import { Template } from '../Template'
import { Textarea } from '../Textarea'
import { Time } from '../Time'
import { Title } from '../Title'
import { Track } from '../Track'
import { UnorderedList } from '../UnorderedList'
import { Variable } from '../Variable'
import { Video } from '../Video'
import { WordBreakOpportunity } from '../WordBreakOpportunity'

type SharedRef = HTMLElement

interface ISharedProps
  extends HTMLAttributes<SharedRef>,
    TCommonSharedComponentsProps {
  as?: ElementType
}

interface ISharedStaticComponents {
  A: typeof Hyperlink
  Abbr: typeof Abbreviation
  Address: typeof Address
  Area: typeof Area
  Article: typeof Article
  Aside: typeof Aside
  Audio: typeof Audio
  Base: typeof Base
  Bdi: typeof BiDirectionalIsolation
  Bdo: typeof BiDirectionalOverride
  Blockquote: typeof Blockquote
  Body: typeof Body
  Bold: typeof Bold
  Br: typeof LineBreak
  Button: typeof Button
  Canvas: typeof Canvas
  Caption: typeof Caption
  Cite: typeof Cite
  Code: typeof Code
  Colgroup: typeof ColumnGroup
  Column: typeof Column
  Data: typeof Data
  Datalist: typeof Datalist
  Dd: typeof DescriptionDetails
  Del: typeof DeletedText
  Details: typeof Details
  Dfn: typeof DefinitionTerm
  Dialog: typeof Dialog
  Div: typeof Division
  Dl: typeof DescriptionList
  Dt: typeof DescriptionTerm
  Em: typeof EmphasizedText
  Fieldset: typeof Fieldset
  Figcaption: typeof Figcaption
  Figure: typeof Figure
  Footer: typeof Footer
  Form: typeof Form
  Head: typeof Head
  Header: typeof Header
  Heading: typeof Heading
  Hgroup: typeof HeadingGroup
  Hr: typeof HorizontalRule
  Html: typeof Html
  I: typeof Italic
  Iframe: typeof Iframe
  Img: typeof Image
  Input: typeof Input
  Ins: typeof InsertedText
  Kbd: typeof KeyboardInput
  Legend: typeof Legend
  Li: typeof List
  Link: typeof Link
  Main: typeof Main
  Map: typeof Map
  Mark: typeof Mark
  Menu: typeof Menu
  Meta: typeof Meta
  Meter: typeof Meter
  Nav: typeof Nav
  Noscript: typeof NoScript
  Ol: typeof OrderedList
  Optgroup: typeof Optgroup
  Option: typeof Option
  Output: typeof Output
  P: typeof Paragraph
  Path: typeof SvgPath
  Picture: typeof Picture
  Pre: typeof PreformattedText
  Progress: typeof Progress
  Q: typeof Quote
  Rp: typeof RubyParentheses
  Rt: typeof RubyText
  Ruby: typeof Ruby
  S: typeof Strikethrough
  Samp: typeof Sample
  Script: typeof Script
  Search: typeof Search
  Section: typeof Section
  Select: typeof Select
  Small: typeof Small
  Source: typeof Source
  Span: typeof Span
  Strong: typeof Strong
  Style: typeof Style
  Sub: typeof Subscript
  Summary: typeof Summary
  Sup: typeof Superscript
  Svg: typeof Svg
  Table: typeof Table
  TableFooter: typeof TableFooter
  Tbody: typeof TableBody
  Td: typeof TableData
  Template: typeof Template
  Textarea: typeof Textarea
  Th: typeof TableHeader
  THead: typeof TableHead
  Time: typeof Time
  Title: typeof Title
  Tr: typeof TableRow
  Track: typeof Track
  Ul: typeof UnorderedList
  Var: typeof Variable
  Video: typeof Video
  Wbr: typeof WordBreakOpportunity
}

/**
 * A shared React component (SharedRC) that provides a consistent API for rendering HTML elements.
 * @param as - The HTML element to render
 * @param children - The content to render
 * @param rest - Additional HTML attributes
 * @returns The rendered shared component
 */
const SharedRC = forwardRef<SharedRef, ISharedProps>(
  (
    { as: Component = Fragment, children, ...rest },
    ref: ForwardedRef<SharedRef>
  ) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    )
  }
) as ForwardRefExoticComponent<ISharedProps & RefAttributes<SharedRef>> &
  ISharedStaticComponents

SharedRC.A = Hyperlink
SharedRC.Abbr = Abbreviation
SharedRC.Address = Address
SharedRC.Area = Area
SharedRC.Article = Article
SharedRC.Aside = Aside
SharedRC.Audio = Audio
SharedRC.Base = Base
SharedRC.Bdi = BiDirectionalIsolation
SharedRC.Bdo = BiDirectionalOverride
SharedRC.Blockquote = Blockquote
SharedRC.Body = Body
SharedRC.Bold = Bold
SharedRC.Br = LineBreak
SharedRC.Button = Button
SharedRC.Canvas = Canvas
SharedRC.Caption = Caption
SharedRC.Cite = Cite
SharedRC.Code = Code
SharedRC.Colgroup = ColumnGroup
SharedRC.Column = Column
SharedRC.Data = Data
SharedRC.Datalist = Datalist
SharedRC.Dd = DescriptionDetails
SharedRC.Del = DeletedText
SharedRC.Details = Details
SharedRC.Dfn = DefinitionTerm
SharedRC.Dialog = Dialog
SharedRC.Div = Division
SharedRC.Dl = DescriptionList
SharedRC.Dt = DescriptionTerm
SharedRC.Em = EmphasizedText
SharedRC.Fieldset = Fieldset
SharedRC.Figcaption = Figcaption
SharedRC.Figure = Figure
SharedRC.Footer = Footer
SharedRC.Form = Form
SharedRC.Head = Head
SharedRC.Header = Header
SharedRC.Heading = Heading
SharedRC.Hgroup = HeadingGroup
SharedRC.Hr = HorizontalRule
SharedRC.Html = Html
SharedRC.I = Italic
SharedRC.Iframe = Iframe
SharedRC.Img = Image
SharedRC.Input = Input
SharedRC.Ins = InsertedText
SharedRC.Kbd = KeyboardInput
SharedRC.Legend = Legend
SharedRC.Li = List
SharedRC.Link = Link
SharedRC.Main = Main
SharedRC.Map = Map
SharedRC.Mark = Mark
SharedRC.Menu = Menu
SharedRC.Meta = Meta
SharedRC.Meter = Meter
SharedRC.Nav = Nav
SharedRC.Noscript = NoScript
SharedRC.Ol = OrderedList
SharedRC.Optgroup = Optgroup
SharedRC.Option = Option
SharedRC.Output = Output
SharedRC.P = Paragraph
SharedRC.Path = SvgPath
SharedRC.Picture = Picture
SharedRC.Pre = PreformattedText
SharedRC.Progress = Progress
SharedRC.Q = Quote
SharedRC.Rp = RubyParentheses
SharedRC.Rt = RubyText
SharedRC.Ruby = Ruby
SharedRC.S = Strikethrough
SharedRC.Samp = Sample
SharedRC.Script = Script
SharedRC.Search = Search
SharedRC.Section = Section
SharedRC.Select = Select
SharedRC.Small = Small
SharedRC.Source = Source
SharedRC.Span = Span
SharedRC.Strong = Strong
SharedRC.Style = Style
SharedRC.Sub = Subscript
SharedRC.Summary = Summary
SharedRC.Sup = Superscript
SharedRC.Svg = Svg
SharedRC.Table = Table
SharedRC.TableFooter = TableFooter
SharedRC.Tbody = TableBody
SharedRC.Td = TableData
SharedRC.Template = Template
SharedRC.Textarea = Textarea
SharedRC.Th = TableHeader
SharedRC.THead = TableHead
SharedRC.Time = Time
SharedRC.Title = Title
SharedRC.Tr = TableRow
SharedRC.Track = Track
SharedRC.Ul = UnorderedList
SharedRC.Var = Variable
SharedRC.Video = Video
SharedRC.Wbr = WordBreakOpportunity

SharedRC.displayName = 'SharedRC'

export default SharedRC
