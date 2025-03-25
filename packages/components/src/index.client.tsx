"use client";

import { forwardRef, memo } from "react";

import {
  A,
  Abbr,
  Address,
  Area,
  Article,
  Aside,
  Audio,
  B,
  Base,
  Bdi,
  Bdo,
  Blockquote,
  Body,
  Br,
  Canvas,
  Caption,
  Cite,
  Code,
  Col,
  Colgroup,
  Data,
  Datalist,
  Dd,
  Del,
  Details,
  Dfn,
  Dialog,
  Div,
  Dl,
  Dt,
  Em,
  Embed,
  Fieldset,
  Figcaption,
  Figure,
  Footer,
  Form,
  Head,
  Header,
  Heading,
  Hgroup,
  Hr,
  Html,
  I,
  Iframe,
  Img,
  Input,
  Ins,
  Kbd,
  Label,
  Legend,
  Li,
  Link,
  Main,
  Map,
  Mark,
  Menu,
  Meta,
  Meter,
  Nav,
  Noscript,
  Object,
  Ol,
  Optgroup,
  Option,
  Output,
  Paragraph,
  Picture,
  Pre,
  Progress,
  Q,
  Rp,
  Rt,
  Ruby,
  S,
  Samp,
  Script,
  Search,
  Section,
  Select,
  Slot,
  Small,
  Source,
  Span,
  Strong,
  Style,
  Sub,
  Summary,
  Sup,
  Svg,
  Table,
  Tbody,
  Td,
  Template,
  Textarea,
  Tfoot,
  Th,
  Thead,
  type AbbrProps,
  type AbbrRef,
  type AddressProps,
  type AddressRef,
  type AProps,
  type AreaProps,
  type AreaRef,
  type ARef,
  type ArticleProps,
  type ArticleRef,
  type AsideProps,
  type AsideRef,
  type AudioProps,
  type AudioRef,
  type BaseProps,
  type BaseRef,
  type BdiProps,
  type BdiRef,
  type BdoProps,
  type BdoRef,
  type BlockquoteProps,
  type BlockquoteRef,
  type BodyProps,
  type BodyRef,
  type BProps,
  type BRef,
  type BrProps,
  type BrRef,
  type ButtonProps,
  type ButtonRef,
  type CanvasProps,
  type CanvasRef,
  type CaptionProps,
  type CaptionRef,
  type CiteProps,
  type CiteRef,
  type CodeProps,
  type CodeRef,
  type ColgroupProps,
  type ColgroupRef,
  type ColProps,
  type ColRef,
  type DatalistProps,
  type DatalistRef,
  type DataProps,
  type DataRef,
  type DdProps,
  type DdRef,
  type DelProps,
  type DelRef,
  type DetailsProps,
  type DetailsRef,
  type DfnProps,
  type DfnRef,
  type DialogProps,
  type DialogRef,
  type DivProps,
  type DivRef,
  type DlProps,
  type DlRef,
  type DtProps,
  type DtRef,
  type EmbedProps,
  type EmbedRef,
  type EmProps,
  type EmRef,
  type FieldsetProps,
  type FieldsetRef,
  type FigcaptionProps,
  type FigcaptionRef,
  type FigureProps,
  type FigureRef,
  type FooterProps,
  type FooterRef,
  type FormProps,
  type FormRef,
  type HeaderProps,
  type HeaderRef,
  type HeadingProps,
  type HeadingRef,
  type HeadProps,
  type HeadRef,
  type HgroupProps,
  type HgroupRef,
  type HrProps,
  type HrRef,
  type HtmlProps,
  type HtmlRef,
  type IframeProps,
  type IframeRef,
  type ImgProps,
  type ImgRef,
  type InputProps,
  type InputRef,
  type InsProps,
  type InsRef,
  type IProps,
  type IRef,
  type KbdProps,
  type KbdRef,
  type LabelProps,
  type LabelRef,
  type LegendProps,
  type LegendRef,
  type LinkProps,
  type LinkRef,
  type LiProps,
  type LiRef,
  type MainProps,
  type MainRef,
  type MapProps,
  type MapRef,
  type MarkProps,
  type MarkRef,
  type MenuProps,
  type MenuRef,
  type MetaProps,
  type MetaRef,
  type MeterProps,
  type MeterRef,
  type NavProps,
  type NavRef,
  type NoscriptProps,
  type NoscriptRef,
  type ObjectProps,
  type ObjectRef,
  type OlProps,
  type OlRef,
  type OptgroupProps,
  type OptgroupRef,
  type OptionProps,
  type OptionRef,
  type OutputProps,
  type OutputRef,
  type ParagraphProps,
  type ParagraphRef,
  type PictureProps,
  type PictureRef,
  type PreProps,
  type PreRef,
  type ProgressProps,
  type ProgressRef,
  type QProps,
  type QRef,
  type RpProps,
  type RpRef,
  type RtProps,
  type RtRef,
  type RubyProps,
  type RubyRef,
  type SampProps,
  type SampRef,
  type ScriptProps,
  type ScriptRef,
  type SearchProps,
  type SearchRef,
  type SectionProps,
  type SectionRef,
  type SelectProps,
  type SelectRef,
  type SlotProps,
  type SlotRef,
  type SmallProps,
  type SmallRef,
  type SourceProps,
  type SourceRef,
  type SpanProps,
  type SpanRef,
  type SProps,
  type SRef,
  type StrongProps,
  type StrongRef,
  type StyleProps,
  type StyleRef,
  type SubProps,
  type SubRef,
  type SummaryProps,
  type SummaryRef,
  type SupProps,
  type SupRef,
  type SvgProps,
  type SvgRef,
  type TableProps,
  type TableRef,
  type TbodyProps,
  type TbodyRef,
  type TdProps,
  type TdRef,
  type TemplateProps,
  type TemplateRef,
  type TextareaProps,
  type TextareaRef,
  type TfootProps,
  type TfootRef,
  type TheadProps,
  type TheadRef,
  type ThProps,
  type ThRef,
  type TimeProps,
  type TimeRef,
  type TitleProps,
  type TitleRef,
  type TrackProps,
  type TrackRef,
  type TrProps,
  type TrRef,
  type UlProps,
  type UlRef,
  type UProps,
  type URef,
  type VarProps,
  type VarRef,
  type VideoProps,
  type VideoRef,
  type WbrProps,
  type WbrRef,
} from ".";

/**
 * Render the anchor client component.
 * @param {AProps} props - The anchor client component properties
 * @param {ARef} ref - The anchor client component reference
 * @returns The rendered anchor client component
 */
export const AClient = forwardRef<ARef, AProps>(
  ({ as: Component = A, href, children, ...rest }, ref) => {
    return (
      <Component ref={ref} href={href} {...rest}>
        {children}
      </Component>
    );
  }
);
AClient.displayName = "AClient";

// Memoized version of `AClient`
export const MemoizedAClient = memo(AClient);

/**
 * Render the abbreviation client component.
 * @param {AbbrProps} props - The abbreviation client component properties
 * @param {AbbrRef} ref - The abbreviation client component reference
 * @returns The rendered abbreviation client component
 */
export const AbbrClient = forwardRef<AbbrRef, AbbrProps>(
  ({ as: Component = Abbr, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
AbbrClient.displayName = "AbbrClient";

// Memoized version of `AbbrClient`.
export const MemoizedAbbrClient = memo(AbbrClient);

/**
 * Render the address client component.
 * @param {AddressProps} props - The address client component properties
 * @param {AddressRef} ref - The address client component reference
 * @returns The rendered address client component
 */
export const AddressClient = forwardRef<AddressRef, AddressProps>(
  ({ as: Component = Address, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
AddressClient.displayName = "AddressClient";

// Memoized version of `AddressClient`.
export const MemoizedAddressClient = memo(AddressClient);

/**
 * Render the area client component.
 * @param {AreaProps} props - The area client component properties
 * @param {AreaRef} ref - The area client component reference
 * @returns The rendered area client component
 */
export const AreaClient = forwardRef<AreaRef, AreaProps>(
  ({ as: Component = Area, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
AreaClient.displayName = "AreaClient";

// Memoized version of `AreaClient`.
export const MemoizedAreaClient = memo(AreaClient);

/**
 * Render the article client component.
 * @param {ArticleProps} props - The article client component properties
 * @param {ArticleRef} ref - The article client component reference
 * @returns The rendered article client component
 */
export const ArticleClient = forwardRef<ArticleRef, ArticleProps>(
  ({ as: Component = Article, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
ArticleClient.displayName = "ArticleClient";

// Memoized version of `ArticleClient`.
export const MemoizedArticleClient = memo(ArticleClient);

/**
 * Render the aside client component.
 * @param {AsideProps} props - The aside client component properties
 * @param {AsideRef} ref - The aside client component reference
 * @returns The rendered aside client component
 */
export const AsideClient = forwardRef<AsideRef, AsideProps>(
  ({ as: Component = Aside, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
AsideClient.displayName = "AsideClient";

// Memoized version of `AsideClient`.
export const MemoizedAsideClient = memo(AsideClient);

/**
 * Render the audio client component.
 * @param {AudioProps} props - The audio client component properties
 * @param {AudioRef} ref - The audio client component reference
 * @returns The rendered audio client component
 */
export const AudioClient = forwardRef<AudioRef, AudioProps>(
  ({ as: Component = Audio, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
AudioClient.displayName = "AudioClient";

// Memoized version of `AudioClient`.
export const MemoizedAudioClient = memo(AudioClient);

/**
 * Render the bring attention to client component.
 * @param {BProps} props - The bring attention to client component properties
 * @param {BRef} ref - The bring attention to client component reference
 * @returns The rendered bring attention to client component
 */
export const BClient = forwardRef<BRef, BProps>(
  ({ as: Component = B, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
BClient.displayName = "BClient";

// Memoized version of `BClient`.
export const MemoizedBClient = memo(BClient);

/**
 * Render the base client component.
 * @param {BaseProps} props - The base client component properties
 * @param {BaseRef} ref - The base client component reference
 * @returns The rendered base client component
 */
export const BaseClient = forwardRef<BaseRef, BaseProps>(
  ({ as: Component = Base, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
BaseClient.displayName = "BaseClient";

// Memoized version of `BaseClient`.
export const MemoizedBaseClient = memo(BaseClient);

/**
 * Render the bidirectional isolate client component.
 * @param {BdiProps} props - The bidirectional isolate client component properties
 * @param {BdiRef} ref - The bidirectional isolate client component reference
 * @returns The rendered bidirectional isolate client component
 */
export const BdiClient = forwardRef<BdiRef, BdiProps>(
  ({ as: Component = Bdi, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
BdiClient.displayName = "BdiClient";

// Memoized version of `BdiClient`.
export const MemoizedBdiClient = memo(BdiClient);

/**
 * Render the bidirectional text override client component.
 * @param {BdoProps} props - The bidirectional text override client component properties
 * @param {BdoRef} ref - The bidirectional text override client component reference
 * @returns The rendered bidirectional text override client component
 */
export const BdoClient = forwardRef<BdoRef, BdoProps>(
  ({ as: Component = Bdo, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
BdoClient.displayName = "BdoClient";

// Memoized version of `BdoClient`.
export const MemoizedBdoClient = memo(BdoClient);

/**
 * Render the blockquote client component.
 * @param {BlockquoteProps} props - The blockquote client component properties
 * @param {BlockquoteRef} ref - The blockquote client component reference
 * @returns The rendered blockquote client component
 */
export const BlockquoteClient = forwardRef<BlockquoteRef, BlockquoteProps>(
  ({ as: Component = Blockquote, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
BlockquoteClient.displayName = "BlockquoteClient";

// Memoized version of `BlockquoteClient`.
export const MemoizedBlockquoteClient = memo(BlockquoteClient);

/**
 * Render the document body client component.
 * @param {BodyProps} props - The document body client component properties
 * @param {BodyRef} ref - The document body client component reference
 * @returns The rendered document body client component
 */
export const BodyClient = forwardRef<BodyRef, BodyProps>(
  ({ as: Component = Body, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
BodyClient.displayName = "BodyClient";

// Memoized version of `BodyClient`.
export const MemoizedBodyClient = memo(BodyClient);

/**
 * Render the document line break client component.
 * @param {BrProps} props - The document line break client component properties
 * @param {BrRef} ref - The document line break client component reference
 * @returns The rendered document line break client component
 */
export const BrClient = forwardRef<BrRef, BrProps>(
  ({ as: Component = Br, ...rest }, ref) => {
    return <Component ref={ref} {...rest} />;
  }
);
BrClient.displayName = "BrClient";

// Memoized version of `BrClient`.
export const MemoizedBrClient = memo(BrClient);

/**
 * Render the button client component.
 * @param {ButtonProps} props - The button client component properties
 * @param {ButtonRef} ref - The button client component reference
 * @returns The rendered button client component
 */
export const ButtonClient = forwardRef<ButtonRef, ButtonProps>(
  ({ as: Component = "button", type, children, ...rest }, ref) => {
    return (
      <Component ref={ref} type={type} {...rest}>
        {children}
      </Component>
    );
  }
);
ButtonClient.displayName = "ButtonClient";

// Memoized version of `ButtonClient`.
export const MemoizedButtonClient = memo(ButtonClient);

/**
 * Render the canvas client component.
 * @param {CanvasProps} props - The canvas client component properties
 * @param {CanvasRef} ref - The canvas client component reference
 * @returns The rendered canvas client component
 */
export const CanvasClient = forwardRef<CanvasRef, CanvasProps>(
  ({ as: Component = Canvas, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
CanvasClient.displayName = "CanvasClient";

// Memoized version of `CanvasClient`.
export const MemoizedCanvasClient = memo(CanvasClient);

/**
 * Render the caption client component.
 * @param {CaptionProps} props - The caption client component properties
 * @param {CaptionRef} ref - The caption client component reference
 * @returns The rendered caption client component
 */
export const CaptionClient = forwardRef<CaptionRef, CaptionProps>(
  ({ as: Component = Caption, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
CaptionClient.displayName = "CaptionClient";

// Memoized version of `CaptionClient`.
export const MemoizedCaptionClient = memo(CaptionClient);

/**
 * Render the cite client component.
 * @param {CiteProps} props - The cite client component properties
 * @param {CiteRef} ref - The cite client component reference
 * @returns The rendered cite client component
 */
export const CiteClient = forwardRef<CiteRef, CiteProps>(
  ({ as: Component = Cite, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
CiteClient.displayName = "CiteClient";

// Memoized version of `CiteClient`.
export const MemoizedCiteClient = memo(CiteClient);

/**
 * Render the code client component.
 * @param {CodeProps} props - The code client component properties
 * @param {CodeRef} ref - The code client component reference
 * @returns The rendered code client component
 */
export const CodeClient = forwardRef<CodeRef, CodeProps>(
  ({ as: Component = Code, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
CodeClient.displayName = "CodeClient";

// Memoized version of `CodeClient`.
export const MemoizedCodeClient = memo(CodeClient);

/**
 * Render the column client component.
 * @param {ColProps} props - The column client component properties
 * @param {ColRef} ref - The column client component reference
 * @returns The rendered column client component
 */
export const ColClient = forwardRef<ColRef, ColProps>(
  ({ as: Component = Col, ...rest }, ref) => {
    return <Component ref={ref} {...rest} />;
  }
);
ColClient.displayName = "ColClient";

// Memoized version of `ColClient`.
export const MemoizedColClient = memo(ColClient);

/**
 * Render the table column group client component.
 * @param {ColgroupProps} props - The table column group client component properties
 * @param {ColgroupRef} ref - The table column group client component reference
 * @returns The rendered table column group client component
 */
export const ColgroupClient = forwardRef<ColgroupRef, ColgroupProps>(
  ({ as: Component = Colgroup, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
ColgroupClient.displayName = "ColgroupClient";

// Memoized version of `ColgroupClient`.
export const MemoizedColgroupClient = memo(ColgroupClient);

/**
 * Render the data client component.
 * @param {DataProps} props - The data client component properties
 * @param {DataRef} ref - The data client component reference
 * @returns The rendered data client component
 */
export const DataClient = forwardRef<DataRef, DataProps>(
  ({ as: Component = Data, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
DataClient.displayName = "DataClient";

// Memoized version of `DataClient`.
export const MemoizedDataClient = memo(DataClient);

/**
 * Render the datalist client component.
 * @param {DatalistProps} props - The datalist client component properties
 * @param {DatalistRef} ref - The datalist client component reference
 * @returns The rendered datalist client component
 */
export const DatalistClient = forwardRef<DatalistRef, DatalistProps>(
  ({ as: Component = Datalist, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
DatalistClient.displayName = "DatalistClient";

// Memoized version of `DatalistClient`.
export const MemoizedDatalistClient = memo(DatalistClient);

/**
 * Render the description details client component.
 * @param {DdProps} props - The description details client component properties
 * @param {DdRef} ref - The description details client component reference
 * @returns The rendered description details client component
 */
export const DdClient = forwardRef<DdRef, DdProps>(
  ({ as: Component = Dd, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
DdClient.displayName = "DdClient";

// Memoized version of `DdClient`.
export const MemoizedDdClient = memo(DdClient);

/**
 * Render the deleted text client component.
 * @param {DelProps} props - The deleted text client component properties
 * @param {DelRef} ref - The deleted text client component reference
 * @returns The rendered deleted text client component
 */
export const DelClient = forwardRef<DelRef, DelProps>(
  ({ as: Component = Del, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
DelClient.displayName = "DelClient";

// Memoized version of `DelClient`.
export const MemoizedDelClient = memo(DelClient);

/**
 * Render the details disclosure client component.
 * @param {DetailsProps} props - The details disclosure client component properties
 * @param {DetailsRef} ref - The details disclosure client component reference
 * @returns The rendered details disclosure client component
 */
export const DetailsClient = forwardRef<DetailsRef, DetailsProps>(
  ({ as: Component = Details, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
DetailsClient.displayName = "DetailsClient";

// Memoized version of `DetailsClient`.
export const MemoizedDetailsClient = memo(DetailsClient);

/**
 * Render the definition element client component.
 * @param {DfnProps} props - The definition element client component properties
 * @param {DfnRef} ref - The definition element client component reference
 * @returns The rendered definition element client component
 */
export const DfnClient = forwardRef<DfnRef, DfnProps>(
  ({ as: Component = Dfn, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
DfnClient.displayName = "DfnClient";

// Memoized version of `DfnClient`.
export const MemoizedDfnClient = memo(DfnClient);

/**
 * Render the dialog client component.
 * @param {DialogProps} props - The dialog client component properties
 * @param {DialogRef} ref - The dialog client component reference
 * @returns The rendered dialog client component
 */
export const DialogClient = forwardRef<DialogRef, DialogProps>(
  ({ as: Component = Dialog, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
DialogClient.displayName = "DialogClient";

// Memoized version of `DialogClient`.
export const MemoizedDialogClient = memo(DialogClient);

/**
 * Render the content division client component.
 * @param {DivProps} props - The content division client component properties
 * @param {DivRef} ref - The content division client component reference
 * @returns The rendered content division client component
 */
export const DivClient = forwardRef<DivRef, DivProps>(
  ({ as: Component = Div, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
DivClient.displayName = "DivClient";

// Memoized version of `DivClient`.
export const MemoizedDivClient = memo(DivClient);

/**
 * Render the description list client component.
 * @param {DlProps} props - The description list client component properties
 * @param {DlRef} ref - The description list client component reference
 * @returns The rendered description list client component
 */
export const DlClient = forwardRef<DlRef, DlProps>(
  ({ as: Component = Dl, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
DlClient.displayName = "DlClient";

// Memoized version of `DlClient`.
export const MemoizedDlClient = memo(DlClient);

/**
 * Render the description term client component.
 * @param {DtProps} props - The description term client component properties
 * @param {DtRef} ref - The description term client component reference
 * @returns The rendered description term client component
 */
export const DtClient = forwardRef<DtRef, DtProps>(
  ({ as: Component = Dt, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
DtClient.displayName = "DtClient";

// Memoized version of `DtClient`.
export const MemoizedDtClient = memo(DtClient);

/**
 * Render the emphasis client component.
 * @param {EmProps} props - The emphasis client component properties
 * @param {EmRef} ref - The emphasis client component reference
 * @returns The rendered emphasis client component
 */
export const EmClient = forwardRef<EmRef, EmProps>(
  ({ as: Component = Em, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
EmClient.displayName = "EmClient";

// Memoized version of `EmClient`.
export const MemoizedEmClient = memo(EmClient);

/**
 * Render the embed external content client component.
 * @param {EmbedProps} props - The embed external content client component properties
 * @param {EmbedRef} ref - The embed external content client component reference
 * @returns The rendered embed external content client component
 */
export const EmbedClient = forwardRef<EmbedRef, EmbedProps>(
  ({ as: Component = Embed, ...rest }, ref) => {
    return <Component ref={ref} {...rest} />;
  }
);
EmbedClient.displayName = "EmbedClient";

// Memoized version of `EmbedClient`.
export const MemoizedEmbedClient = memo(EmbedClient);

/**
 * Render the field set client component.
 * @param {FieldsetProps} props - The field set client component properties
 * @param {FieldsetRef} ref - The field set client component reference
 * @returns The rendered field set client component
 */
export const FieldsetClient = forwardRef<FieldsetRef, FieldsetProps>(
  ({ as: Component = Fieldset, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
FieldsetClient.displayName = "FieldsetClient";

// Memoized version of `FieldsetClient`.
export const MemoizedFieldsetClient = memo(FieldsetClient);

/**
 * Render the figure caption client component.
 * @param {FigcaptionProps} props - The figure caption client component properties
 * @param {FigcaptionRef} ref - The figure caption client component reference
 * @returns The rendered figure caption client component
 */
export const FigcaptionClient = forwardRef<FigcaptionRef, FigcaptionProps>(
  ({ as: Component = Figcaption, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
FigcaptionClient.displayName = "FigcaptionClient";

// Memoized version of `FigcaptionClient`.
export const MemoizedFigcaptionClient = memo(FigcaptionClient);

/**
 * Render the figure with optional caption client component.
 * @param {FigureProps} props - The figure with optional caption client component properties
 * @param {FigureRef} ref - The figure with optional caption client component reference
 * @returns The rendered figure with optional caption client component
 */
export const FigureClient = forwardRef<FigureRef, FigureProps>(
  ({ as: Component = Figure, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
FigureClient.displayName = "FigureClient";

// Memoized version of `FigureClient`.
export const MemoizedFigureClient = memo(FigureClient);

/**
 * Render the footer client component.
 * @param {FooterProps} props - The footer client component properties
 * @param {FooterRef} ref - The footer client component reference
 * @returns The rendered footer client component
 */
export const FooterClient = forwardRef<FooterRef, FooterProps>(
  ({ as: Component = Footer, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
FooterClient.displayName = "FooterClient";

// Memoized version of `FooterClient`.
export const MemoizedFooterClient = memo(FooterClient);

/**
 * Render the form client component.
 * @param {FormProps} props - The form client component properties
 * @param {FormRef} ref - The form client component reference
 * @returns The rendered form client component
 */
export const FormClient = forwardRef<FormRef, FormProps>(
  ({ as: Component = Form, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
FormClient.displayName = "FormClient";

// Memoized version of `FormClient`.
export const MemoizedFormClient = memo(FormClient);

/**
 * Render the document metadata (header) client component.
 * @param {HeadProps} props - The document metadata (header) client component properties
 * @param {HeadRef} ref - The document metadata (header) client component reference
 * @returns The rendered document metadata (header) client component
 */
export const HeadClient = forwardRef<HeadRef, HeadProps>(
  ({ as: Component = Head, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
HeadClient.displayName = "HeadClient";

// Memoized version of `HeadClient`.
export const MemoizedHeadClient = memo(HeadClient);

/**
 * Render the header client component.
 * @param {HeaderProps} props - The header client component properties
 * @param {HeaderRef} ref - The header client component reference
 * @returns The rendered header client component
 */
export const HeaderClient = forwardRef<HeaderRef, HeaderProps>(
  ({ as: Component = Header, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
HeaderClient.displayName = "HeaderClient";

// Memoized version of `HeaderClient`.
export const MemoizedHeaderClient = memo(HeaderClient);

/**
 * Render the HTML section heading client component.
 * @param {HeadingProps} props - The HTML section heading client component properties
 * @param {HeadingRef} ref - The HTML section heading client component reference
 * @returns The rendered HTML section heading client component
 */
export const HeadingClient = forwardRef<HeadingRef, HeadingProps>(
  ({ as: Component = Heading, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
HeadingClient.displayName = "HeadingClient";

// Memoized version of `HeadingClient`.
export const MemoizedHeadingClient = memo(HeadingClient);

/**
 * Render the heading group client component.
 * @param {HgroupProps} props - The heading group client component properties
 * @param {HgroupRef} ref - The heading group client component reference
 * @returns The rendered heading group client component
 */
export const HgroupClient = forwardRef<HgroupRef, HgroupProps>(
  ({ as: Component = Hgroup, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
HgroupClient.displayName = "HgroupClient";

// Memoized version of `HgroupClient`.
export const MemoizedHgroupClient = memo(HgroupClient);

/**
 * Render the thematic break (horizontal rule) client component.
 * @param {HrProps} props - The thematic break (horizontal rule) client component properties
 * @param {HrRef} ref - The thematic break (horizontal rule) client component reference
 * @returns The rendered thematic break (horizontal rule) client component
 */
export const HrClient = forwardRef<HrRef, HrProps>(
  ({ as: Component = Hr, ...rest }, ref) => {
    return <Component ref={ref} {...rest} />;
  }
);
HrClient.displayName = "HrClient";

// Memoized version of `HrClient`.
export const MemoizedHrClient = memo(HrClient);

/**
 * Render the HTML document/root client component.
 * @param {HtmlProps} props - The HTML document/root client component properties
 * @param {HtmlRef} ref - The HTML document/root client component reference
 * @returns The rendered HTML document/root client component
 */
export const HtmlClient = forwardRef<HtmlRef, HtmlProps>(
  ({ as: Component = Html, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
HtmlClient.displayName = "HtmlClient";

// Memoized version of `HtmlClient`.
export const MemoizedHtmlClient = memo(HtmlClient);

/**
 * Render the idiomatic text client component.
 * @param {IProps} props - The idiomatic text client component properties
 * @param {IRef} ref - The idiomatic text client component reference
 * @returns The rendered idiomatic text client component
 */
export const IClient = forwardRef<IRef, IProps>(
  ({ as: Component = I, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
IClient.displayName = "IClient";

// Memoized version of `IClient`.
export const MemoizedIClient = memo(IClient);

/**
 * Render the inline frame client component.
 * @param {IframeProps} props - The inline frame client component properties
 * @param {IframeRef} ref - The inline frame client component reference
 * @returns The rendered inline frame client component
 */
export const IframeClient = forwardRef<IframeRef, IframeProps>(
  ({ as: Component = Iframe, ...rest }, ref) => {
    return <Component ref={ref} {...rest} />;
  }
);
IframeClient.displayName = "IframeClient";

// Memoized version of `IframeClient`.
export const MemoizedIframeClient = memo(IframeClient);

/**
 * Render the image embed client component.
 * @param {ImgProps} props - The image embed client component properties
 * @param {ImgRef} ref - The image embed client component reference
 * @returns The rendered image embed client component
 */
export const ImgClient = forwardRef<ImgRef, ImgProps>(
  ({ as: Component = Img, src, alt, ...rest }, ref) => {
    return <Component ref={ref} src={src} alt={alt} {...rest} />;
  }
);
ImgClient.displayName = "ImgClient";

// Memoized version of `ImgClient`.
export const MemoizedImgClient = memo(ImgClient);

/**
 * Render the HTML input client component.
 * @param {InputProps} props - The HTML input client component properties
 * @param {InputRef} ref - The HTML input client component reference
 * @returns The rendered HTML input client component
 */
export const InputClient = forwardRef<InputRef, InputProps>(
  ({ as: Component = Input, type, ...rest }, ref) => {
    return <Component ref={ref} type={type} {...rest} />;
  }
);
InputClient.displayName = "InputClient";

// Memoized version of `InputClient`.
export const MemoizedInputClient = memo(InputClient);

/**
 * Render the inserted text client component.
 * @param {InsProps} props - The inserted text client component properties
 * @param {InsRef} ref - The inserted text client component reference
 * @returns The rendered inserted text client component
 */
export const InsClient = forwardRef<InsRef, InsProps>(
  ({ as: Component = Ins, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
InsClient.displayName = "InsClient";

// Memoized version of `InsClient`.
export const MemoizedInsClient = memo(InsClient);

/**
 * Render the keyboard input client component.
 * @param {KbdProps} props - The keyboard input client component properties
 * @param {KbdRef} ref - The keyboard input client component reference
 * @returns The rendered keyboard input client component
 */
export const KbdClient = forwardRef<KbdRef, KbdProps>(
  ({ as: Component = Kbd, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
KbdClient.displayName = "KbdClient";

// Memoized version of `KbdClient`.
export const MemoizedKbdClient = memo(KbdClient);

/**
 * Render the label client component.
 * @param {LabelProps} props - The label client component properties
 * @param {LabelRef} ref - The label client component reference
 * @returns The rendered label client component
 */
export const LabelClient = forwardRef<LabelRef, LabelProps>(
  ({ as: Component = Label, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
LabelClient.displayName = "LabelClient";

// Memoized version of `LabelClient`.
export const MemoizedLabelClient = memo(LabelClient);

/**
 * Render the field set legend client component.
 * @param {LegendProps} props - The field set legend client component properties
 * @param {LegendRef} ref - The field set legend client component reference
 * @returns The rendered field set legend client component
 */
export const LegendClient = forwardRef<LegendRef, LegendProps>(
  ({ as: Component = Legend, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
LegendClient.displayName = "LegendClient";

// Memoized version of `LegendClient`.
export const MemoizedLegendClient = memo(LegendClient);

/**
 * Render the list item client component.
 * @param {LiProps} props - The list item client component properties
 * @param {LiRef} ref - The list item client component reference
 * @returns The rendered list item client component
 */
export const LiClient = forwardRef<LiRef, LiProps>(
  ({ as: Component = Li, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
LiClient.displayName = "LiClient";

// Memoized version of `LiClient`.
export const MemoizedLiClient = memo(LiClient);

/**
 * Render the external resource link client component.
 * @param {LinkProps} props - The external resource link client component properties
 * @param {LinkRef} ref - The external resource link client component reference
 * @returns The rendered external resource link client component
 */
export const LinkClient = forwardRef<LinkRef, LinkProps>(
  ({ as: Component = Link, ...rest }, ref) => {
    return <Component ref={ref} {...rest} />;
  }
);
LinkClient.displayName = "LinkClient";

// Memoized version of `LinkClient`.
export const MemoizedLinkClient = memo(LinkClient);

/**
 * Render the main client component.
 * @param {MainProps} props - The main client component properties
 * @param {MainRef} ref - The main client component reference
 * @returns The rendered main client component
 */
export const MainClient = forwardRef<MainRef, MainProps>(
  ({ as: Component = Main, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
MainClient.displayName = "MainClient";

// Memoized version of `MainClient`.
export const MemoizedMainClient = memo(MainClient);

/**
 * Render the image map client component.
 * @param {MapProps} props - The image map client component properties
 * @param {MapRef} ref - The image map client component reference
 * @returns The rendered image map client component
 */
export const MapClient = forwardRef<MapRef, MapProps>(
  ({ as: Component = Map, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
MapClient.displayName = "MapClient";

// Memoized version of `MapClient`.
export const MemoizedMapClient = memo(MapClient);

/**
 * Render the mark text client component.
 * @param {MarkProps} props - The mark text client component properties
 * @param {MarkRef} ref - The mark text client component reference
 * @returns The rendered mark text client component
 */
export const MarkClient = forwardRef<MarkRef, MarkProps>(
  ({ as: Component = Mark, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
MarkClient.displayName = "MarkClient";

// Memoized version of `MarkClient`.
export const MemoizedMarkClient = memo(MarkClient);

/**
 * Render the menu client component.
 * @param {MenuProps} props - The menu client component properties
 * @param {MenuRef} ref - The menu client component reference
 * @returns The rendered menu client component
 */
export const MenuClient = forwardRef<MenuRef, MenuProps>(
  ({ as: Component = Menu, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
MenuClient.displayName = "MenuClient";

// Memoized version of `MenuClient`.
export const MemoizedMenuClient = memo(MenuClient);

/**
 * Render the meta client component.
 * @param {MetaProps} props - The meta client component properties
 * @param {MetaRef} ref - The meta client component reference
 * @returns The rendered meta client component
 */
export const MetaClient = forwardRef<MetaRef, MetaProps>(
  ({ as: Component = Meta, ...rest }, ref) => {
    return <Component ref={ref} {...rest} />;
  }
);
MetaClient.displayName = "MetaClient";

// Memoized version of `MetaClient`.
export const MemoizedMetaClient = memo(MetaClient);

/**
 * Render the HTML meter client component.
 * @param {MeterProps} props - The HTML meter client component properties
 * @param {MeterRef} ref - The HTML meter client component reference
 * @returns The rendered HTML meter client component
 */
export const MeterClient = forwardRef<MeterRef, MeterProps>(
  ({ as: Component = Meter, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
MeterClient.displayName = "MeterClient";

// Memoized version of `MeterClient`.
export const MemoizedMeterClient = memo(MeterClient);

/**
 * Render the navigation section client component.
 * @param {NavProps} props - The navigation section client component properties
 * @param {NavRef} ref - The navigation section client component reference
 * @returns The rendered navigation section client component
 */
export const NavClient = forwardRef<NavRef, NavProps>(
  ({ as: Component = Nav, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
NavClient.displayName = "NavClient";

// Memoized version of `NavClient`.
export const MemoizedNavClient = memo(NavClient);

/**
 * Render the noscript client component.
 * @param {NoscriptProps} props - The noscript client component properties
 * @param {NoscriptRef} ref - The noscript client component reference
 * @returns The rendered noscript client component
 */
export const NoscriptClient = forwardRef<NoscriptRef, NoscriptProps>(
  ({ as: Component = Noscript, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
NoscriptClient.displayName = "NoscriptClient";

// Memoized version of `NoscriptClient`.
export const MemoizedNoscriptClient = memo(NoscriptClient);

/**
 * Render the object client component.
 * @param {ObjectProps} props - The object client component properties
 * @param {ObjectRef} ref - The object client component reference
 * @returns The rendered object client component
 */
export const ObjectClient = forwardRef<ObjectRef, ObjectProps>(
  ({ as: Component = Object, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
ObjectClient.displayName = "ObjectClient";

// Memoized version of `ObjectClient`.
export const MemoizedObjectClient = memo(ObjectClient);

/**
 * Render the ordered list client component.
 * @param {OlProps} props - The ordered list client component properties
 * @param {OlRef} ref - The ordered list client component reference
 * @returns The rendered ordered list client component
 */
export const OlClient = forwardRef<OlRef, OlProps>(
  ({ as: Component = Ol, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
OlClient.displayName = "OlClient";

// Memoized version of `OlClient`.
export const MemoizedOlClient = memo(OlClient);

/**
 * Render the option group client component.
 * @param {OptgroupProps} props - The option group client component properties
 * @param {OptgroupRef} ref - The option group client component reference
 * @returns The rendered option group client component
 */
export const OptgroupClient = forwardRef<OptgroupRef, OptgroupProps>(
  ({ as: Component = Optgroup, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
OptgroupClient.displayName = "OptgroupClient";

// Memoized version of `OptgroupClient`.
export const MemoizedOptgroupClient = memo(OptgroupClient);

/**
 * Render the HTML option client component.
 * @param {OptionProps} props - The HTML option client component properties
 * @param {OptionRef} ref - The HTML option client component reference
 * @returns The rendered HTML option client component
 */
export const OptionClient = forwardRef<OptionRef, OptionProps>(
  ({ as: Component = Option, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
OptionClient.displayName = "OptionClient";

// Memoized version of `OptionClient`.
export const MemoizedOptionClient = memo(OptionClient);

/**
 * Render the output client component.
 * @param {OutputProps} props - The output client component properties
 * @param {OutputRef} ref - The output client component reference
 * @returns The rendered output client component
 */
export const OutputClient = forwardRef<OutputRef, OutputProps>(
  ({ as: Component = Output, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
OutputClient.displayName = "OutputClient";

// Memoized version of `OutputClient`.
export const MemoizedOutputClient = memo(OutputClient);

/**
 * Render the paragraph client component.
 * @param {ParagraphProps} props - The paragraph client component properties
 * @param {ParagraphRef} ref - The paragraph client component reference
 * @returns The rendered paragraph client component
 */
export const ParagraphClient = forwardRef<ParagraphRef, ParagraphProps>(
  ({ as: Component = Paragraph, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
ParagraphClient.displayName = "ParagraphClient";

// Memoized version of `ParagraphClient`.
export const MemoizedParagraphClient = memo(ParagraphClient);

/**
 * Render the picture client component.
 * @param {PictureProps} props - The picture client component properties
 * @param {PictureRef} ref - The picture client component reference
 * @returns The rendered picture client component
 */
export const PictureClient = forwardRef<PictureRef, PictureProps>(
  ({ as: Component = Picture, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
PictureClient.displayName = "PictureClient";

// Memoized version of `PictureClient`.
export const MemoizedPictureClient = memo(PictureClient);

/**
 * Render the preformatted text client component.
 * @param {PreProps} props - The preformatted text client component properties
 * @param {PreRef} ref - The preformatted text client component reference
 * @returns The rendered preformatted text client component
 */
export const PreClient = forwardRef<PreRef, PreProps>(
  ({ as: Component = Pre, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
PreClient.displayName = "PreClient";

// Memoized version of `PreClient`.
export const MemoizedPreClient = memo(PreClient);

/**
 * Render the progress indicator client component.
 * @param {ProgressProps} props - The progress indicator client component properties
 * @param {ProgressRef} ref - The progress indicator client component reference
 * @returns The rendered progress indicator client component
 */
export const ProgressClient = forwardRef<ProgressRef, ProgressProps>(
  ({ as: Component = Progress, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
ProgressClient.displayName = "ProgressClient";

// Memoized version of `ProgressClient`.
export const MemoizedProgressClient = memo(ProgressClient);

/**
 * Render the inline quotation client component.
 * @param {QProps} props - The inline quotation client component properties
 * @param {QRef} ref - The inline quotation client component reference
 * @returns The rendered inline quotation client component
 */
export const QClient = forwardRef<QRef, QProps>(
  ({ as: Component = Q, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
QClient.displayName = "QClient";

// Memoized version of `QClient`.
export const MemoizedQClient = memo(QClient);

/**
 * Render the ruby fallback parenthesis client component.
 * @param {RpProps} props - The ruby fallback parenthesis client component properties
 * @param {RpRef} ref - The ruby fallback parenthesis client component reference
 * @returns The rendered ruby fallback parenthesis client component
 */
export const RpClient = forwardRef<RpRef, RpProps>(
  ({ as: Component = Rp, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
RpClient.displayName = "RpClient";

// Memoized version of `RpClient`.
export const MemoizedRpClient = memo(RpClient);

/**
 * Render the ruby text client component.
 * @param {RtProps} props - The ruby text client component properties
 * @param {RtRef} ref - The ruby text client component reference
 * @returns The rendered ruby text client component
 */
export const RtClient = forwardRef<RtRef, RtProps>(
  ({ as: Component = Rt, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
RtClient.displayName = "RtClient";

// Memoized version of `RtClient`.
export const MemoizedRtClient = memo(RtClient);

/**
 * Render the ruby annotation client component.
 * @param {RubyProps} props - The ruby annotation client component properties
 * @param {RubyRef} ref - The ruby annotation client component reference
 * @returns The rendered ruby annotation client component
 */
export const RubyClient = forwardRef<RubyRef, RubyProps>(
  ({ as: Component = Ruby, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
RubyClient.displayName = "RubyClient";

// Memoized version of `RubyClient`.
export const MemoizedRubyClient = memo(RubyClient);

/**
 * Render the strikethrough client component.
 * @param {SProps} props - The strikethrough client component properties
 * @param {SRef} ref - The strikethrough client component reference
 * @returns The rendered strikethrough client component
 */
export const SClient = forwardRef<SRef, SProps>(
  ({ as: Component = S, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
SClient.displayName = "SClient";

// Memoized version of `SClient`.
export const MemoizedSClient = memo(SClient);

/**
 * Render the sample output client component.
 * @param {SampProps} props - The sample output client component properties
 * @param {SampRef} ref - The sample output client component reference
 * @returns The rendered sample output client component
 */
export const SampClient = forwardRef<SampRef, SampProps>(
  ({ as: Component = Samp, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
SampClient.displayName = "SampClient";

// Memoized version of `SampClient`.
export const MemoizedSampClient = memo(SampClient);

/**
 * Render the script client component.
 * @param {ScriptProps} props - The script client component properties
 * @param {ScriptRef} ref - The script client component reference
 * @returns The rendered script client component
 */
export const ScriptClient = forwardRef<ScriptRef, ScriptProps>(
  ({ as: Component = Script, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
ScriptClient.displayName = "ScriptClient";

// Memoized version of `ScriptClient`.
export const MemoizedScriptClient = memo(ScriptClient);

/**
 * Render the generic search client component.
 * @param {SearchProps} props - The generic search client component properties
 * @param {SearchRef} ref - The generic search client component reference
 * @returns The rendered generic search client component
 */
export const SearchClient = forwardRef<SearchRef, SearchProps>(
  ({ as: Component = Search, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
SearchClient.displayName = "SearchClient";

// Memoized version of `SearchClient`.
export const MemoizedSearchClient = memo(SearchClient);

/**
 * Render the generic section client component.
 * @param {SectionProps} props - The generic section client component properties
 * @param {SectionRef} ref - The generic section client component reference
 * @returns The rendered generic section client component
 */
export const SectionClient = forwardRef<SectionRef, SectionProps>(
  ({ as: Component = Section, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
SectionClient.displayName = "SectionClient";

// Memoized version of `SectionClient`.
export const MemoizedSectionClient = memo(SectionClient);

/**
 * Render the HTML select client component.
 * @param {SelectProps} props - The HTML select client component properties
 * @param {SelectRef} ref - The HTML select client component reference
 * @returns The rendered HTML select client component
 */
export const SelectClient = forwardRef<SelectRef, SelectProps>(
  ({ as: Component = Select, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
SelectClient.displayName = "SelectClient";

// Memoized version of `SelectClient`.
export const MemoizedSelectClient = memo(SelectClient);

/**
 * Render the web component slot client component.
 * @param {SlotProps} props - The web component slot client component properties
 * @param {SlotRef} ref - The web component slot client component reference
 * @returns The rendered web component slot client component
 */
export const SlotClient = forwardRef<SlotRef, SlotProps>(
  ({ as: Component = Slot, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
SlotClient.displayName = "SlotClient";

// Memoized version of `SlotClient`.
export const MemoizedSlotClient = memo(SlotClient);

/**
 * Render the side comment client component.
 * @param {SmallProps} props - The side comment client component properties
 * @param {SmallRef} ref - The side comment client component reference
 * @returns The rendered side comment client component
 */
export const SmallClient = forwardRef<SmallRef, SmallProps>(
  ({ as: Component = Small, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
SmallClient.displayName = "SmallClient";

// Memoized version of `SmallClient`.
export const MemoizedSmallClient = memo(SmallClient);

/**
 * Render the media or image source client component.
 * @param {SourceProps} props - The media or image source client component properties
 * @param {SourceRef} ref - The media or image source client component reference
 * @returns The rendered media or image source client component
 */
export const SourceClient = forwardRef<SourceRef, SourceProps>(
  ({ as: Component = Source, ...rest }, ref) => {
    return <Component ref={ref} {...rest} />;
  }
);
SourceClient.displayName = "SourceClient";

// Memoized version of `SourceClient`.
export const MemoizedSourceClient = memo(SourceClient);

/**
 * Render the content span client component.
 * @param {SpanProps} props - The content span client component properties
 * @param {SpanRef} ref - The content span client component reference
 * @returns The rendered content span client component
 */
export const SpanClient = forwardRef<SpanRef, SpanProps>(
  ({ as: Component = Span, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
SpanClient.displayName = "SpanClient";

// Memoized version of `SpanClient`.
export const MemoizedSpanClient = memo(SpanClient);

/**
 * Render the strong importance client component.
 * @param {StrongProps} props - The strong importance client component properties
 * @param {StrongRef} ref - The strong importance client component reference
 * @returns The rendered strong importance client component
 */
export const StrongClient = forwardRef<StrongRef, StrongProps>(
  ({ as: Component = Strong, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
StrongClient.displayName = "StrongClient";

// Memoized version of `StrongClient`.
export const MemoizedStrongClient = memo(StrongClient);

/**
 * Render the style information client component.
 * @param {StyleProps} props - The style information client component properties
 * @param {StyleRef} ref - The style information client component reference
 * @returns The rendered style information client component
 */
export const StyleClient = forwardRef<StyleRef, StyleProps>(
  ({ as: Component = Style, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
StyleClient.displayName = "StyleClient";

// Memoized version of `StyleClient`.
export const MemoizedStyleClient = memo(StyleClient);

/**
 * Render the subscript client component.
 * @param {SubProps} props - The subscript client component properties
 * @param {SubRef} ref - The subscript client component reference
 * @returns The rendered subscript client component
 */
export const SubClient = forwardRef<SubRef, SubProps>(
  ({ as: Component = Sub, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
SubClient.displayName = "SubClient";

// Memoized version of `SubClient`.
export const MemoizedSubClient = memo(SubClient);

/**
 * Render the disclosure summary client component.
 * @param {SummaryProps} props - The disclosure summary client component properties
 * @param {SummaryRef} ref - The disclosure summary client component reference
 * @returns The rendered disclosure summary client component
 */
export const SummaryClient = forwardRef<SummaryRef, SummaryProps>(
  ({ as: Component = Summary, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
SummaryClient.displayName = "SummaryClient";

// Memoized version of `SummaryClient`.
export const MemoizedSummaryClient = memo(SummaryClient);

/**
 * Render the superscript client component.
 * @param {SupProps} props - The superscript client component properties
 * @param {SupRef} ref - The superscript client component reference
 * @returns The rendered superscript client component
 */
export const SupClient = forwardRef<SupRef, SupProps>(
  ({ as: Component = Sup, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
SupClient.displayName = "SupClient";

// Memoized version of `SupClient`.
export const MemoizedSupClient = memo(SupClient);

/**
 * Render the scalable vector graphics client component.
 * @param {SvgProps} props - The scalable vector graphics client component properties
 * @param {SvgRef} ref - The scalable vector graphics client component reference
 * @returns The rendered scalable vector graphics client component
 */
export const SvgClient = forwardRef<SvgRef, SvgProps>(
  ({ as: Component = Svg, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
SvgClient.displayName = "SvgClient";

// Memoized version of `SvgClient`.
export const MemoizedSvgClient = memo(SvgClient);

/**
 * Render the table client component.
 * @param {TableProps} props - The table client component properties
 * @param {TableRef} ref - The table client component reference
 * @returns The rendered table client component
 */
export const TableClient = forwardRef<TableRef, TableProps>(
  ({ as: Component = Table, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
TableClient.displayName = "TableClient";

// Memoized version of `TableClient`.
export const MemoizedTableClient = memo(TableClient);

/**
 * Render the table body client component.
 * @param {TbodyProps} props - The table body client component properties
 * @param {TbodyRef} ref - The table body client component reference
 * @returns The rendered table body client component
 */
export const TbodyClient = forwardRef<TbodyRef, TbodyProps>(
  ({ as: Component = Tbody, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
TbodyClient.displayName = "TbodyClient";

// Memoized version of `TbodyClient`.
export const MemoizedTbodyClient = memo(TbodyClient);

/**
 * Render the table data cell client component.
 * @param {TdProps} props - The table data cell client component properties
 * @param {TdRef} ref - The table data cell client component reference
 * @returns The rendered table data cell client component
 */
export const TdClient = forwardRef<TdRef, TdProps>(
  ({ as: Component = Td, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
TdClient.displayName = "TdClient";

// Memoized version of `TdClient`.
export const MemoizedTdClient = memo(TdClient);

/**
 * Render the content template client component.
 * @param {TemplateProps} props - The content template client component properties
 * @param {TemplateRef} ref - The content template client component reference
 * @returns The rendered content template client component
 */
export const TemplateClient = forwardRef<TemplateRef, TemplateProps>(
  ({ as: Component = Template, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
TemplateClient.displayName = "TemplateClient";

// Memoized version of `TemplateClient`.
export const MemoizedTemplateClient = memo(TemplateClient);

/**
 * Render the textarea client component.
 * @param {TextareaProps} props - The textarea client component properties
 * @param {TextareaRef} ref - The textarea client component reference
 * @returns The rendered textarea client component
 */
export const TextareaClient = forwardRef<TextareaRef, TextareaProps>(
  ({ as: Component = Textarea, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
TextareaClient.displayName = "TextareaClient";

// Memoized version of `TextareaClient`.
export const MemoizedTextareaClient = memo(TextareaClient);

/**
 * Render the table foot client component.
 * @param {TfootProps} props - The table foot client component properties
 * @param {TfootRef} ref - The table foot client component reference
 * @returns The rendered table foot client component
 */
export const TfootClient = forwardRef<TfootRef, TfootProps>(
  ({ as: Component = Tfoot, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
TfootClient.displayName = "TfootClient";

// Memoized version of `TfootClient`.
export const MemoizedTfootClient = memo(TfootClient);

/**
 * Render the table header client component.
 * @param {ThProps} props - The table header client component properties
 * @param {ThRef} ref - The table header client component reference
 * @returns The rendered table header client component
 */
export const ThClient = forwardRef<ThRef, ThProps>(
  ({ as: Component = Th, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
ThClient.displayName = "ThClient";

// Memoized version of `ThClient`.
export const MemoizedThClient = memo(ThClient);

/**
 * Render the table head client component.
 * @param {TheadProps} props - The table head client component properties
 * @param {TheadRef} ref - The table head client component reference
 * @returns The rendered table head client component
 */
export const TheadClient = forwardRef<TheadRef, TheadProps>(
  ({ as: Component = Thead, children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);
TheadClient.displayName = "TheadClient";

// Memoized version of `TheadClient`.
export const MemoizedTheadClient = memo(TheadClient);

/**
 * Render the (date) time client component.
 * @param {TimeProps} props - The (date) time client component properties
 * @param {TimeRef} ref - The (date) time client component reference
 * @returns The rendered (date) time client component
 */
export const TimeClient = forwardRef<TimeRef, TimeProps>(
  ({ children, ...rest }, ref) => {
    return (
      <time ref={ref} {...rest}>
        {children}
      </time>
    );
  }
);

TimeClient.displayName = "TimeClient";

/**
 * Render the document title client component.
 * @param {TitleProps} props - The document title client component properties
 * @param {TitleRef} ref - The document title client component reference
 * @returns The rendered document title client component
 */
export const TitleClient = forwardRef<TitleRef, TitleProps>(
  ({ children, ...rest }, ref) => {
    return (
      <title ref={ref} {...rest}>
        {children}
      </title>
    );
  }
);

TitleClient.displayName = "TitleClient";

/**
 * Render the table row client component.
 * @param {TrProps} props - The table row client component properties
 * @param {TrRef} ref - The table row client component reference
 * @returns The rendered table row client component
 */
export const TrClient = forwardRef<TrRef, TrProps>(
  ({ children, ...rest }, ref) => {
    return (
      <tr ref={ref} {...rest}>
        {children}
      </tr>
    );
  }
);

TrClient.displayName = "TrClient";

/**
 * Render the embed text track client component.
 * @param {TrackProps} props - The embed text track client component properties
 * @param {TrackRef} ref - The embed text track client component reference
 * @returns The rendered embed text track client component
 */
export const TrackClient = forwardRef<TrackRef, TrackProps>(
  ({ ...rest }, ref) => {
    return <track ref={ref} {...rest} />;
  }
);

TrackClient.displayName = "TrackClient";

/**
 * Render the unarticulated annotation (underline) client component.
 * @param {UProps} props - The unarticulated annotation (underline) client component properties
 * @param {URef} ref - The unarticulated annotation (underline) client component reference
 * @returns The rendered unarticulated annotation (underline) client component
 */
export const UClient = forwardRef<URef, UProps>(
  ({ children, ...rest }, ref) => {
    return (
      <u ref={ref} {...rest}>
        {children}
      </u>
    );
  }
);

UClient.displayName = "UClient";

/**
 * Render the unordered list client component.
 * @param {UlProps} props - The unordered list client component properties
 * @param {UlRef} ref - The unordered list client component reference
 * @returns The rendered unordered list client component
 */
export const UlClient = forwardRef<UlRef, UlProps>(
  ({ children, ...rest }, ref) => {
    return (
      <ul ref={ref} {...rest}>
        {children}
      </ul>
    );
  }
);

UlClient.displayName = "UlClient";

/**
 * Render the variable client component.
 * @param {VarProps} props - The variable client component properties
 * @param {VarRef} ref - The variable client component reference
 * @returns The rendered variable client component
 */
export const VarClient = forwardRef<VarRef, VarProps>(
  ({ children, ...rest }, ref) => {
    return (
      <var ref={ref} {...rest}>
        {children}
      </var>
    );
  }
);

VarClient.displayName = "VarClient";

/**
 * Render the video embed client component.
 * @param {VideoProps} props - The video embed client component properties
 * @param {VideoRef} ref - The video embed client component reference
 * @returns The rendered video embed client component
 */
export const VideoClient = forwardRef<VideoRef, VideoProps>(
  ({ children, ...rest }, ref) => {
    return (
      <video ref={ref} {...rest}>
        {children}
      </video>
    );
  }
);

VideoClient.displayName = "VideoClient";

/**
 * Render the line break opportunity client component.
 * @param {WbrProps} props - The line break opportunity client component properties
 * @param {WbrRef} ref - The line break opportunity client component reference
 * @returns The rendered line break opportunity client component
 */
export const WbrClient = forwardRef<WbrRef, WbrProps>(({ ...rest }, ref) => {
  return <wbr ref={ref} {...rest} />;
});

WbrClient.displayName = "WbrClient";
