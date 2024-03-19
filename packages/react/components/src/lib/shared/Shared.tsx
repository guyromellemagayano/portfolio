import {
  ElementType,
  ForwardRefExoticComponent,
  ForwardedRef,
  Fragment,
  HTMLAttributes,
  RefAttributes,
  forwardRef
} from 'react'

import { TCommonSharedComponentsProps } from '@guy-romelle-magayano/react-components/server'

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
 * A shared React component (RC) that provides a consistent API for rendering HTML elements.
 * @param as - The HTML element to render
 * @param children - The content to render
 * @param rest - Additional HTML attributes
 * @returns The rendered shared component
 */
const RC = forwardRef<SharedRef, ISharedProps>(
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

RC.A = Hyperlink
RC.Abbr = Abbreviation
RC.Address = Address
RC.Area = Area
RC.Article = Article
RC.Aside = Aside
RC.Audio = Audio
RC.Base = Base
RC.Bdi = BiDirectionalIsolation
RC.Bdo = BiDirectionalOverride
RC.Blockquote = Blockquote
RC.Body = Body
RC.Bold = Bold
RC.Br = LineBreak
RC.Button = Button
RC.Canvas = Canvas
RC.Caption = Caption
RC.Cite = Cite
RC.Code = Code
RC.Colgroup = ColumnGroup
RC.Column = Column
RC.Data = Data
RC.Datalist = Datalist
RC.Dd = DescriptionDetails
RC.Del = DeletedText
RC.Details = Details
RC.Dfn = DefinitionTerm
RC.Dialog = Dialog
RC.Div = Division
RC.Dl = DescriptionList
RC.Dt = DescriptionTerm
RC.Em = EmphasizedText
RC.Fieldset = Fieldset
RC.Figcaption = Figcaption
RC.Figure = Figure
RC.Footer = Footer
RC.Form = Form
RC.Head = Head
RC.Header = Header
RC.Heading = Heading
RC.Hgroup = HeadingGroup
RC.Hr = HorizontalRule
RC.Html = Html
RC.I = Italic
RC.Iframe = Iframe
RC.Img = Image
RC.Input = Input
RC.Ins = InsertedText
RC.Kbd = KeyboardInput
RC.Legend = Legend
RC.Li = List
RC.Link = Link
RC.Main = Main
RC.Map = Map
RC.Mark = Mark
RC.Menu = Menu
RC.Meta = Meta
RC.Meter = Meter
RC.Nav = Nav
RC.Noscript = NoScript
RC.Ol = OrderedList
RC.Optgroup = Optgroup
RC.Option = Option
RC.Output = Output
RC.P = Paragraph
RC.Path = SvgPath
RC.Picture = Picture
RC.Pre = PreformattedText
RC.Progress = Progress
RC.Q = Quote
RC.Rp = RubyParentheses
RC.Rt = RubyText
RC.Ruby = Ruby
RC.S = Strikethrough
RC.Samp = Sample
RC.Script = Script
RC.Search = Search
RC.Section = Section
RC.Select = Select
RC.Small = Small
RC.Source = Source
RC.Span = Span
RC.Strong = Strong
RC.Style = Style
RC.Sub = Subscript
RC.Summary = Summary
RC.Sup = Superscript
RC.Svg = Svg
RC.Table = Table
RC.TableFooter = TableFooter
RC.Tbody = TableBody
RC.Td = TableData
RC.Template = Template
RC.Textarea = Textarea
RC.Th = TableHeader
RC.THead = TableHead
RC.Time = Time
RC.Title = Title
RC.Tr = TableRow
RC.Track = Track
RC.Ul = UnorderedList
RC.Var = Variable
RC.Video = Video
RC.Wbr = WordBreakOpportunity

RC.displayName = 'RC'

export default RC
