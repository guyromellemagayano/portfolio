"use client";

import { forwardRef } from "react";

import type {
  AbbrProps,
  AbbrRef,
  AddressProps,
  AddressRef,
  AProps,
  AreaProps,
  AreaRef,
  ARef,
  ArticleProps,
  ArticleRef,
  AsideProps,
  AsideRef,
  AudioProps,
  AudioRef,
  BaseProps,
  BaseRef,
  BdiProps,
  BdiRef,
  BdoProps,
  BdoRef,
  BlockquoteProps,
  BlockquoteRef,
  BodyProps,
  BodyRef,
  BProps,
  BRef,
  BrProps,
  BrRef,
  ButtonProps,
  ButtonRef,
  CanvasProps,
  CanvasRef,
  CaptionProps,
  CaptionRef,
  CiteProps,
  CiteRef,
  CodeProps,
  CodeRef,
  ColgroupProps,
  ColgroupRef,
  ColProps,
  ColRef,
  DatalistProps,
  DatalistRef,
  DataProps,
  DataRef,
  DdProps,
  DdRef,
  DelProps,
  DelRef,
  DetailsProps,
  DetailsRef,
  DfnProps,
  DfnRef,
  DialogProps,
  DialogRef,
  DivProps,
  DivRef,
  DlProps,
  DlRef,
  DtProps,
  DtRef,
  EmbedProps,
  EmbedRef,
  EmProps,
  EmRef,
  FieldsetProps,
  FieldsetRef,
  FigcaptionProps,
  FigcaptionRef,
  FigureProps,
  FigureRef,
  FooterProps,
  FooterRef,
  FormProps,
  FormRef,
  HeaderProps,
  HeaderRef,
  HeadingProps,
  HeadingRef,
  HeadProps,
  HeadRef,
  HgroupProps,
  HgroupRef,
  HrProps,
  HrRef,
  HtmlProps,
  HtmlRef,
  IframeProps,
  IframeRef,
  ImgProps,
  ImgRef,
  InputProps,
  InputRef,
  InsProps,
  InsRef,
  IProps,
  IRef,
  KbdProps,
  KbdRef,
  LabelProps,
  LabelRef,
  LegendProps,
  LegendRef,
  LinkProps,
  LinkRef,
  LiProps,
  LiRef,
  MainProps,
  MainRef,
  MapProps,
  MapRef,
  MarkProps,
  MarkRef,
  MenuProps,
  MenuRef,
  MetaProps,
  MetaRef,
  MeterProps,
  MeterRef,
  NavProps,
  NavRef,
  NoscriptProps,
  NoscriptRef,
  ObjectProps,
  ObjectRef,
  OlProps,
  OlRef,
  OptgroupProps,
  OptgroupRef,
  OptionProps,
  OptionRef,
  OutputProps,
  OutputRef,
  ParagraphProps,
  ParagraphRef,
  PictureProps,
  PictureRef,
  PreProps,
  PreRef,
  ProgressProps,
  ProgressRef,
  QProps,
  QRef,
  RpProps,
  RpRef,
  RtProps,
  RtRef,
  RubyProps,
  RubyRef,
  SampProps,
  SampRef,
  ScriptProps,
  ScriptRef,
  SearchProps,
  SearchRef,
  SectionProps,
  SectionRef,
  SelectProps,
  SelectRef,
  SlotProps,
  SlotRef,
  SmallProps,
  SmallRef,
  SourceProps,
  SourceRef,
  SpanProps,
  SpanRef,
  SProps,
  SRef,
  StrongProps,
  StrongRef,
  StyleProps,
  StyleRef,
  SubProps,
  SubRef,
  SummaryProps,
  SummaryRef,
  SupProps,
  SupRef,
  SvgProps,
  SvgRef,
  TableProps,
  TableRef,
  TbodyProps,
  TbodyRef,
  TdProps,
  TdRef,
  TemplateProps,
  TemplateRef,
  TextareaProps,
  TextareaRef,
  TfootProps,
  TfootRef,
  TheadProps,
  TheadRef,
  ThProps,
  ThRef,
  TimeProps,
  TimeRef,
  TitleProps,
  TitleRef,
  TrackProps,
  TrackRef,
  TrProps,
  TrRef,
} from ".";

/**
 * Render the anchor client component.
 * @param {AProps} props - The anchor client component properties
 * @param {ARef} ref - The anchor client component reference
 * @returns The rendered anchor client component
 */
export const AClient = forwardRef<ARef, AProps>(
  ({ children, ...rest }, ref) => {
    return (
      <a ref={ref} {...rest}>
        {children}
      </a>
    );
  }
);

AClient.displayName = "AClient";

/**
 * Render the abbreviation client component.
 * @param {AbbrProps} props - The abbreviation client component properties
 * @param {AbbrRef} ref - The abbreviation client component reference
 * @returns The rendered abbreviation client component
 */
export const AbbrClient = forwardRef<AbbrRef, AbbrProps>(
  ({ children, ...rest }, ref) => {
    return (
      <abbr ref={ref} {...rest}>
        {children}
      </abbr>
    );
  }
);

AbbrClient.displayName = "AbbrClient";

/**
 * Render the address client component.
 * @param {AddressProps} props - The address client component properties
 * @param {AddressRef} ref - The address client component reference
 * @returns The rendered address client component
 */
export const AddressClient = forwardRef<AddressRef, AddressProps>(
  ({ children, ...rest }, ref) => {
    return (
      <address ref={ref} {...rest}>
        {children}
      </address>
    );
  }
);

AddressClient.displayName = "AddressClient";

/**
 * Render the area client component.
 * @param {AreaProps} props - The area client component properties
 * @param {AreaRef} ref - The area client component reference
 * @returns The rendered area client component
 */
export const AreaClient = forwardRef<AreaRef, AreaProps>(
  ({ children, ...rest }, ref) => {
    return (
      <area ref={ref} {...rest}>
        {children}
      </area>
    );
  }
);

AreaClient.displayName = "AreaClient";

/**
 * Render the article client component.
 * @param {ArticleProps} props - The article client component properties
 * @param {ArticleRef} ref - The article client component reference
 * @returns The rendered article client component
 */
export const ArticleClient = forwardRef<ArticleRef, ArticleProps>(
  ({ children, ...rest }, ref) => {
    return (
      <article ref={ref} {...rest}>
        {children}
      </article>
    );
  }
);

ArticleClient.displayName = "ArticleClient";

/**
 * Render the aside client component.
 * @param {AsideProps} props - The aside client component properties
 * @param {AsideRef} ref - The aside client component reference
 * @returns The rendered aside client component
 */
export const AsideClient = forwardRef<AsideRef, AsideProps>(
  ({ children, ...rest }, ref) => {
    return (
      <aside ref={ref} {...rest}>
        {children}
      </aside>
    );
  }
);

AsideClient.displayName = "AsideClient";

/**
 * Render the bring attention to client component.
 * @param {BProps} props - The bring attention to client component properties
 * @param {BRef} ref - The bring attention to client component reference
 * @returns The rendered bring attention to client component
 */
export const BClient = forwardRef<BRef, BProps>(
  ({ children, ...rest }, ref) => {
    return (
      <b ref={ref} {...rest}>
        {children}
      </b>
    );
  }
);

BClient.displayName = "BClient";

/**
 * Render the audio client component.
 * @param {AudioProps} props - The audio client component properties
 * @param {AudioRef} ref - The audio client component reference
 * @returns The rendered audio client component
 */
export const AudioClient = forwardRef<AudioRef, AudioProps>(
  ({ children, ...rest }, ref) => {
    return (
      <audio ref={ref} {...rest}>
        {children}
      </audio>
    );
  }
);

AudioClient.displayName = "AudioClient";

/**
 * Render the bidirectional isolate client component.
 * @param {BdiProps} props - The bidirectional isolate client component properties
 * @param {BdiRef} ref - The bidirectional isolate client component reference
 * @returns The rendered bidirectional isolate client component
 */
export const BdiClient = forwardRef<BdiRef, BdiProps>(
  ({ children, ...rest }, ref) => {
    return (
      <bdi ref={ref} {...rest}>
        {children}
      </bdi>
    );
  }
);

BdiClient.displayName = "BdiClient";

/**
 * Render the base client component.
 * @param {BaseProps} props - The base client component properties
 * @param {BaseRef} ref - The base client component reference
 * @returns The rendered base client component
 */
export const BaseClient = forwardRef<BaseRef, BaseProps>(
  ({ children, ...rest }, ref) => {
    return (
      <base ref={ref} {...rest}>
        {children}
      </base>
    );
  }
);

BaseClient.displayName = "BaseClient";

/**
 * Render the bidirectional text override client component.
 * @param {BdoProps} props - The bidirectional text override client component properties
 * @param {BdoRef} ref - The bidirectional text override client component reference
 * @returns The rendered bidirectional text override client component
 */
export const BdoClient = forwardRef<BdoRef, BdoProps>(
  ({ children, ...rest }, ref) => {
    return (
      <bdo ref={ref} {...rest}>
        {children}
      </bdo>
    );
  }
);

BdoClient.displayName = "BdoClient";

/**
 * Render the blockquote client component.
 * @param {BlockquoteProps} props - The blockquote client component properties
 * @param {BlockquoteRef} ref - The blockquote client component reference
 * @returns The rendered blockquote client component
 */
export const BlockquoteClient = forwardRef<BlockquoteRef, BlockquoteProps>(
  ({ children, ...rest }, ref) => {
    return (
      <blockquote ref={ref} {...rest}>
        {children}
      </blockquote>
    );
  }
);

BlockquoteClient.displayName = "BlockquoteClient";

/**
 * Render the document body client component.
 * @param {BodyProps} props - The document body client component properties
 * @param {BodyRef} ref - The document body client component reference
 * @returns The rendered document body client component
 */
export const BodyClient = forwardRef<BodyRef, BodyProps>(
  ({ children, ...rest }, ref) => {
    return (
      <body ref={ref} {...rest}>
        {children}
      </body>
    );
  }
);

BodyClient.displayName = "BodyClient";

/**
 * Render the document line break client component.
 * @param {BrProps} props - The document line break client component properties
 * @param {BrRef} ref - The document line break client component reference
 * @returns The rendered document line break client component
 */
export const BrClient = forwardRef<BrRef, BrProps>(({ ...rest }, ref) => {
  return <br ref={ref} {...rest} />;
});

BrClient.displayName = "BrClient";

/**
 * Render the button client component.
 * @param {ButtonProps} props - The button client component properties
 * @param {ButtonRef} ref - The button client component reference
 * @returns The rendered button client component
 */
export const ButtonClient = forwardRef<ButtonRef, ButtonProps>(
  ({ children, ...rest }, ref) => {
    return (
      <button ref={ref} {...rest}>
        {children}
      </button>
    );
  }
);

ButtonClient.displayName = "ButtonClient";

/**
 * Render the canvas client component.
 * @param {CanvasProps} props - The canvas client component properties
 * @param {CanvasRef} ref - The canvas client component reference
 * @returns The rendered canvas client component
 */
export const CanvasClient = forwardRef<CanvasRef, CanvasProps>(
  ({ children, ...rest }, ref) => {
    return (
      <canvas ref={ref} {...rest}>
        {children}
      </canvas>
    );
  }
);

CanvasClient.displayName = "CanvasClient";

/**
 * Render the caption client component.
 * @param {CaptionProps} props - The caption client component properties
 * @param {CaptionRef} ref - The caption client component reference
 * @returns The rendered caption client component
 */
export const CaptionClient = forwardRef<CaptionRef, CaptionProps>(
  ({ children, ...rest }, ref) => {
    return (
      <caption ref={ref} {...rest}>
        {children}
      </caption>
    );
  }
);

CaptionClient.displayName = "CaptionClient";

/**
 * Render the cite client component.
 * @param {CiteProps} props - The cite client component properties
 * @param {CiteRef} ref - The cite client component reference
 * @returns The rendered cite client component
 */
export const CiteClient = forwardRef<CiteRef, CiteProps>(
  ({ children, ...rest }, ref) => {
    return (
      <cite ref={ref} {...rest}>
        {children}
      </cite>
    );
  }
);

CiteClient.displayName = "CiteClient";

/**
 * Render the code client component.
 * @param {CodeProps} props - The code client component properties
 * @param {CodeRef} ref - The code client component reference
 * @returns The rendered code client component
 */
export const CodeClient = forwardRef<CodeRef, CodeProps>(
  ({ children, ...rest }, ref) => {
    return (
      <code ref={ref} {...rest}>
        {children}
      </code>
    );
  }
);

CodeClient.displayName = "CodeClient";

/**
 * Render the column client component.
 * @param {ColProps} props - The column client component properties
 * @param {ColRef} ref - The column client component reference
 * @returns The rendered column client component
 */
export const ColClient = forwardRef<ColRef, ColProps>(({ ...rest }, ref) => {
  return <col ref={ref} {...rest} />;
});

ColClient.displayName = "ColClient";

/**
 * Render the table column group client component.
 * @param {ColgroupProps} props - The table column group client component properties
 * @param {ColgroupRef} ref - The table column group client component reference
 * @returns The rendered table column group client component
 */
export const ColgroupClient = forwardRef<ColgroupRef, ColgroupProps>(
  ({ children, ...rest }, ref) => {
    return (
      <colgroup ref={ref} {...rest}>
        {children}
      </colgroup>
    );
  }
);

ColgroupClient.displayName = "ColgroupClient";

/**
 * Render the data client component.
 * @param {DataProps} props - The data client component properties
 * @param {DataRef} ref - The data client component reference
 * @returns The rendered data client component
 */
export const DataClient = forwardRef<DataRef, DataProps>(
  ({ children, ...rest }, ref) => {
    return (
      <data ref={ref} {...rest}>
        {children}
      </data>
    );
  }
);

DataClient.displayName = "DataClient";

/**
 * Render the datalist client component.
 * @param {DatalistProps} props - The datalist client component properties
 * @param {DatalistRef} ref - The datalist client component reference
 * @returns The rendered datalist client component
 */
export const DatalistClient = forwardRef<DatalistRef, DatalistProps>(
  ({ children, ...rest }, ref) => {
    return (
      <datalist ref={ref} {...rest}>
        {children}
      </datalist>
    );
  }
);

DatalistClient.displayName = "DatalistClient";

/**
 * Render the description details client component.
 * @param {DdProps} props - The description details client component properties
 * @param {DdRef} ref - The description details client component reference
 * @returns The rendered description details client component
 */
export const DdClient = forwardRef<DdRef, DdProps>(
  ({ children, ...rest }, ref) => {
    return (
      <dd ref={ref} {...rest}>
        {children}
      </dd>
    );
  }
);

DdClient.displayName = "DdClient";

/**
 * Render the deleted text client component.
 * @param {DelProps} props - The deleted text client component properties
 * @param {DelRef} ref - The deleted text client component reference
 * @returns The rendered deleted text client component
 */
export const DelClient = forwardRef<DelRef, DelProps>(
  ({ children, ...rest }, ref) => {
    return (
      <del ref={ref} {...rest}>
        {children}
      </del>
    );
  }
);

DelClient.displayName = "DelClient";

/**
 * Render the details disclosure client component.
 * @param {DetailsProps} props - The details disclosure client component properties
 * @param {DetailsRef} ref - The details disclosure client component reference
 * @returns The rendered details disclosure client component
 */
export const DetailsClient = forwardRef<DetailsRef, DetailsProps>(
  ({ children, ...rest }, ref) => {
    return (
      <details ref={ref} {...rest}>
        {children}
      </details>
    );
  }
);

DetailsClient.displayName = "DetailsClient";

/**
 * Render the definition element client component.
 * @param {DfnProps} props - The definition element client component properties
 * @param {DfnRef} ref - The definition element client component reference
 * @returns The rendered definition element client component
 */
export const DfnClient = forwardRef<DfnRef, DfnProps>(
  ({ children, ...rest }, ref) => {
    return (
      <dfn ref={ref} {...rest}>
        {children}
      </dfn>
    );
  }
);

DfnClient.displayName = "DfnClient";

/**
 * Render the dialog client component.
 * @param {DialogProps} props - The dialog client component properties
 * @param {DialogRef} ref - The dialog client component reference
 * @returns The rendered dialog client component
 */
export const DialogClient = forwardRef<DialogRef, DialogProps>(
  ({ children, ...rest }, ref) => {
    return (
      <dialog ref={ref} {...rest}>
        {children}
      </dialog>
    );
  }
);

DialogClient.displayName = "DialogClient";

/**
 * Render the content division client component.
 * @param {DivProps} props - The content division client component properties
 * @param {DivRef} ref - The content division client component reference
 * @returns The rendered content division client component
 */
export const DivClient = forwardRef<DivRef, DivProps>(
  ({ children, ...rest }, ref) => {
    return (
      <div ref={ref} {...rest}>
        {children}
      </div>
    );
  }
);

DivClient.displayName = "DivClient";

/**
 * Render the description list client component.
 * @param {DlProps} props - The description list client component properties
 * @param {DlRef} ref - The description list client component reference
 * @returns The rendered description list client component
 */
export const DlClient = forwardRef<DlRef, DlProps>(
  ({ children, ...rest }, ref) => {
    return (
      <dl ref={ref} {...rest}>
        {children}
      </dl>
    );
  }
);

DlClient.displayName = "DlClient";

/**
 * Render the description term client component.
 * @param {DtProps} props - The description term client component properties
 * @param {DtRef} ref - The description term client component reference
 * @returns The rendered description term client component
 */
export const DtClient = forwardRef<DtRef, DtProps>(
  ({ children, ...rest }, ref) => {
    return (
      <dt ref={ref} {...rest}>
        {children}
      </dt>
    );
  }
);

DtClient.displayName = "DtClient";

/**
 * Render the emphasis client component.
 * @param {EmProps} props - The emphasis client component properties
 * @param {EmRef} ref - The emphasis client component reference
 * @returns The rendered emphasis client component
 */
export const EmClient = forwardRef<EmRef, EmProps>(
  ({ children, ...rest }, ref) => {
    return (
      <em ref={ref} {...rest}>
        {children}
      </em>
    );
  }
);

EmClient.displayName = "EmClient";

/**
 * Render the embed external content client component.
 * @param {EmbedProps} props - The embed external content client component properties
 * @param {EmbedRef} ref - The embed external content client component reference
 * @returns The rendered embed external content client component
 */
export const EmbedClient = forwardRef<EmbedRef, EmbedProps>(
  ({ ...rest }, ref) => {
    return <embed ref={ref} {...rest} />;
  }
);

EmbedClient.displayName = "EmbedClient";

/**
 * Render the field set client component.
 * @param {FieldsetProps} props - The field set client component properties
 * @param {FieldsetRef} ref - The field set client component reference
 * @returns The rendered field set client component
 */
export const FieldsetClient = forwardRef<FieldsetRef, FieldsetProps>(
  ({ children, ...rest }, ref) => {
    return (
      <fieldset ref={ref} {...rest}>
        {children}
      </fieldset>
    );
  }
);

FieldsetClient.displayName = "FieldsetClient";

/**
 * Render the figure caption client component.
 * @param {FigcaptionProps} props - The figure caption client component properties
 * @param {FigcaptionRef} ref - The figure caption client component reference
 * @returns The rendered figure caption client component
 */
export const FigcaptionClient = forwardRef<FigcaptionRef, FigcaptionProps>(
  ({ children, ...rest }, ref) => {
    return (
      <figcaption ref={ref} {...rest}>
        {children}
      </figcaption>
    );
  }
);

FigcaptionClient.displayName = "FigcaptionClient";

/**
 * Render the figure with optional caption client component.
 * @param {FigureProps} props - The figure with optional caption client component properties
 * @param {FigureRef} ref - The figure with optional caption client component reference
 * @returns The rendered figure with optional caption client component
 */
export const FigureClient = forwardRef<FigureRef, FigureProps>(
  ({ children, ...rest }, ref) => {
    return (
      <figure ref={ref} {...rest}>
        {children}
      </figure>
    );
  }
);

FigureClient.displayName = "FigureClient";

/**
 * Render the footer client component.
 * @param {FooterProps} props - The footer client component properties
 * @param {FooterRef} ref - The footer client component reference
 * @returns The rendered footer client component
 */
export const FooterClient = forwardRef<FooterRef, FooterProps>(
  ({ children, ...rest }, ref) => {
    return (
      <footer ref={ref} {...rest}>
        {children}
      </footer>
    );
  }
);

FooterClient.displayName = "FooterClient";

/**
 * Render the form client component.
 * @param {FormProps} props - The form client component properties
 * @param {FormRef} ref - The form client component reference
 * @returns The rendered form client component
 */
export const FormClient = forwardRef<FormRef, FormProps>(
  ({ children, ...rest }, ref) => {
    return (
      <form ref={ref} {...rest}>
        {children}
      </form>
    );
  }
);

FormClient.displayName = "FormClient";

/**
 * Render the document metadata (header) client component.
 * @param {HeadProps} props - The document metadata (header) client component properties
 * @param {HeadRef} ref - The document metadata (header) client component reference
 * @returns The rendered document metadata (header) client component
 */
export const HeadClient = forwardRef<HeadRef, HeadProps>(
  ({ children, ...rest }, ref) => {
    return (
      <head ref={ref} {...rest}>
        {children}
      </head>
    );
  }
);

HeadClient.displayName = "HeadClient";

/**
 * Render the header client component.
 * @param {HeaderProps} props - The header client component properties
 * @param {HeaderRef} ref - The header client component reference
 * @returns The rendered header client component
 */
export const HeaderClient = forwardRef<HeaderRef, HeaderProps>(
  ({ children, ...rest }, ref) => {
    return (
      <header ref={ref} {...rest}>
        {children}
      </header>
    );
  }
);

HeaderClient.displayName = "HeaderClient";

/**
 * Render the HTML section heading client component.
 * @param {HeadingProps} props - The HTML section heading client component properties
 * @param {HeadingRef} ref - The HTML section heading client component reference
 * @returns The rendered HTML section heading client component
 */
export const HeadingClient = forwardRef<HeadingRef, HeadingProps>(
  ({ as: Component = "h1", children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);

HeadingClient.displayName = "HeadingClient";

/**
 * Render the heading group client component.
 * @param {HgroupProps} props - The heading group client component properties
 * @param {HgroupRef} ref - The heading group client component reference
 * @returns The rendered heading group client component
 */
export const HgroupClient = forwardRef<HgroupRef, HgroupProps>(
  ({ children, ...rest }, ref) => {
    return (
      <hgroup ref={ref} {...rest}>
        {children}
      </hgroup>
    );
  }
);

HgroupClient.displayName = "HgroupClient";

/**
 * Render the thematic break (horizontal rule) client component.
 * @param {HrProps} props - The thematic break (horizontal rule) client component properties
 * @param {HrRef} ref - The thematic break (horizontal rule) client component reference
 * @returns The rendered thematic break (horizontal rule) client component
 */
export const HrClient = forwardRef<HrRef, HrProps>(({ ...rest }, ref) => {
  return <hr ref={ref} {...rest} />;
});

HrClient.displayName = "HrClient";

/**
 * Render the HTML document/root client component.
 * @param {HtmlProps} props - The HTML document/root client component properties
 * @param {HtmlRef} ref - The HTML document/root client component reference
 * @returns The rendered HTML document/root client component
 */
export const HtmlClient = forwardRef<HtmlRef, HtmlProps>(
  ({ children, ...rest }, ref) => {
    return (
      <html ref={ref} {...rest}>
        {children}
      </html>
    );
  }
);

HtmlClient.displayName = "HtmlClient";

/**
 * Render the idiomatic text client component.
 * @param {IProps} props - The idiomatic text client component properties
 * @param {IRef} ref - The idiomatic text client component reference
 * @returns The rendered idiomatic text client component
 */
export const IClient = forwardRef<IRef, IProps>(
  ({ children, ...rest }, ref) => {
    return (
      <i ref={ref} {...rest}>
        {children}
      </i>
    );
  }
);

IClient.displayName = "IClient";

/**
 * Render the inline frame client component.
 * @param {IframeProps} props - The inline frame client component properties
 * @param {IframeRef} ref - The inline frame client component reference
 * @returns The rendered inline frame client component
 */
export const IframeClient = forwardRef<IframeRef, IframeProps>(
  ({ ...rest }, ref) => {
    return <iframe ref={ref} {...rest} />;
  }
);

IframeClient.displayName = "IframeClient";

/**
 * Render the image embed client component.
 * @param {ImgProps} props - The image embed client component properties
 * @param {ImgRef} ref - The image embed client component reference
 * @returns The rendered image embed client component
 */
export const ImgClient = forwardRef<ImgRef, ImgProps>(
  ({ src = "#", alt = "", ...rest }, ref) => {
    return <img ref={ref} src={src} alt={alt} {...rest} />;
  }
);

ImgClient.displayName = "ImgClient";

/**
 * Render the HTML input client component.
 * @param {InputProps} props - The HTML input client component properties
 * @param {InputRef} ref - The HTML input client component reference
 * @returns The rendered HTML input client component
 */
export const InputClient = forwardRef<InputRef, InputProps>(
  ({ type = "text", ...rest }, ref) => {
    return <input ref={ref} type={type} {...rest} />;
  }
);

InputClient.displayName = "InputClient";

/**
 * Render the inserted text client component.
 * @param {InsProps} props - The inserted text client component properties
 * @param {InsRef} ref - The inserted text client component reference
 * @returns The rendered inserted text client component
 */
export const InsClient = forwardRef<InsRef, InsProps>(
  ({ children, ...rest }, ref) => {
    return (
      <ins ref={ref} {...rest}>
        {children}
      </ins>
    );
  }
);

InsClient.displayName = "InsClient";

/**
 * Render the keyboard input client component.
 * @param {KbdProps} props - The keyboard input client component properties
 * @param {KbdRef} ref - The keyboard input client component reference
 * @returns The rendered keyboard input client component
 */
export const KbdClient = forwardRef<KbdRef, KbdProps>(
  ({ children, ...rest }, ref) => {
    return (
      <kbd ref={ref} {...rest}>
        {children}
      </kbd>
    );
  }
);

KbdClient.displayName = "KbdClient";

/**
 * Render the label client component.
 * @param {LabelProps} props - The label client component properties
 * @param {LabelRef} ref - The label client component reference
 * @returns The rendered label client component
 */
export const LabelClient = forwardRef<LabelRef, LabelProps>(
  ({ children, ...rest }, ref) => {
    return (
      <label ref={ref} {...rest}>
        {children}
      </label>
    );
  }
);

LabelClient.displayName = "LabelClient";

/**
 * Render the field set legend client component.
 * @param {LegendProps} props - The field set legend client component properties
 * @param {LegendRef} ref - The field set legend client component reference
 * @returns The rendered field set legend client component
 */
export const LegendClient = forwardRef<LegendRef, LegendProps>(
  ({ children, ...rest }, ref) => {
    return (
      <legend ref={ref} {...rest}>
        {children}
      </legend>
    );
  }
);

LegendClient.displayName = "LegendClient";

/**
 * Render the list item client component.
 * @param {LiProps} props - The list item client component properties
 * @param {LiRef} ref - The list item client component reference
 * @returns The rendered list item client component
 */
export const LiClient = forwardRef<LiRef, LiProps>(
  ({ children, ...rest }, ref) => {
    return (
      <li ref={ref} {...rest}>
        {children}
      </li>
    );
  }
);

LiClient.displayName = "LiClient";

/**
 * Render the external resource link client component.
 * @param {LinkProps} props - The external resource link client component properties
 * @param {LinkRef} ref - The external resource link client component reference
 * @returns The rendered external resource link client component
 */
export const LinkClient = forwardRef<LinkRef, LinkProps>(({ ...rest }, ref) => {
  return <link ref={ref} {...rest} />;
});

LinkClient.displayName = "LinkClient";

/**
 * Render the main client component.
 * @param {MainProps} props - The main client component properties
 * @param {MainRef} ref - The main client component reference
 * @returns The rendered main client component
 */
export const MainClient = forwardRef<MainRef, MainProps>(
  ({ children, ...rest }, ref) => {
    return (
      <main ref={ref} {...rest}>
        {children}
      </main>
    );
  }
);

MainClient.displayName = "MainClient";

/**
 * Render the image map client component.
 * @param {MapProps} props - The image map client component properties
 * @param {MapRef} ref - The image map client component reference
 * @returns The rendered image map client component
 */
export const MapClient = forwardRef<MapRef, MapProps>(
  ({ children, ...rest }, ref) => {
    return (
      <map ref={ref} {...rest}>
        {children}
      </map>
    );
  }
);

MapClient.displayName = "MapClient";

/**
 * Render the mark text client component.
 * @param {MarkProps} props - The mark text client component properties
 * @param {MarkRef} ref - The mark text client component reference
 * @returns The rendered mark text client component
 */
export const MarkClient = forwardRef<MarkRef, MarkProps>(
  ({ children, ...rest }, ref) => {
    return (
      <mark ref={ref} {...rest}>
        {children}
      </mark>
    );
  }
);

MarkClient.displayName = "MarkClient";

/**
 * Render the menu client component.
 * @param {MenuProps} props - The menu client component properties
 * @param {MenuRef} ref - The menu client component reference
 * @returns The rendered menu client component
 */
export const MenuClient = forwardRef<MenuRef, MenuProps>(
  ({ children, ...rest }, ref) => {
    return (
      <menu ref={ref} {...rest}>
        {children}
      </menu>
    );
  }
);

MenuClient.displayName = "MenuClient";

/**
 * Render the meta client component.
 * @param {MetaProps} props - The meta client component properties
 * @param {MetaRef} ref - The meta client component reference
 * @returns The rendered meta client component
 */
export const MetaClient = forwardRef<MetaRef, MetaProps>(({ ...rest }, ref) => {
  return <meta ref={ref} {...rest} />;
});

MetaClient.displayName = "MetaClient";

/**
 * Render the HTML meter client component.
 * @param {MeterProps} props - The HTML meter client component properties
 * @param {MeterRef} ref - The HTML meter client component reference
 * @returns The rendered HTML meter client component
 */
export const MeterClient = forwardRef<MeterRef, MeterProps>(
  ({ children, ...rest }, ref) => {
    return (
      <meter ref={ref} {...rest}>
        {children}
      </meter>
    );
  }
);

MeterClient.displayName = "MeterClient";

/**
 * Render the navigation section client component.
 * @param {NavProps} props - The navigation section client component properties
 * @param {NavRef} ref - The navigation section client component reference
 * @returns The rendered navigation section client component
 */
export const NavClient = forwardRef<NavRef, NavProps>(
  ({ children, ...rest }, ref) => {
    return (
      <nav ref={ref} {...rest}>
        {children}
      </nav>
    );
  }
);

NavClient.displayName = "NavClient";

/**
 * Render the noscript client component.
 * @param {NoscriptProps} props - The noscript client component properties
 * @param {NoscriptRef} ref - The noscript client component reference
 * @returns The rendered noscript client component
 */
export const NoscriptClient = forwardRef<NoscriptRef, NoscriptProps>(
  ({ children, ...rest }, ref) => {
    return (
      <noscript ref={ref} {...rest}>
        {children}
      </noscript>
    );
  }
);

NoscriptClient.displayName = "NoscriptClient";

/**
 * Render the object client component.
 * @param {ObjectProps} props - The object client component properties
 * @param {ObjectRef} ref - The object client component reference
 * @returns The rendered object client component
 */
export const ObjectClient = forwardRef<ObjectRef, ObjectProps>(
  ({ children, ...rest }, ref) => {
    return (
      <object ref={ref} {...rest}>
        {children}
      </object>
    );
  }
);

ObjectClient.displayName = "ObjectClient";

/**
 * Render the ordered list client component.
 * @param {OlProps} props - The ordered list client component properties
 * @param {OlRef} ref - The ordered list client component reference
 * @returns The rendered ordered list client component
 */
export const OlClient = forwardRef<OlRef, OlProps>(
  ({ children, ...rest }, ref) => {
    return (
      <ol ref={ref} {...rest}>
        {children}
      </ol>
    );
  }
);

OlClient.displayName = "OlClient";

/**
 * Render the option group client component.
 * @param {OptgroupProps} props - The option group client component properties
 * @param {OptgroupRef} ref - The option group client component reference
 * @returns The rendered option group client component
 */
export const OptgroupClient = forwardRef<OptgroupRef, OptgroupProps>(
  ({ children, ...rest }, ref) => {
    return (
      <optgroup ref={ref} {...rest}>
        {children}
      </optgroup>
    );
  }
);

OptgroupClient.displayName = "OptgroupClient";

/**
 * Render the HTML option client component.
 * @param {OptionProps} props - The HTML option client component properties
 * @param {OptionRef} ref - The HTML option client component reference
 * @returns The rendered HTML option client component
 */
export const OptionClient = forwardRef<OptionRef, OptionProps>(
  ({ children, ...rest }, ref) => {
    return (
      <option ref={ref} {...rest}>
        {children}
      </option>
    );
  }
);

OptionClient.displayName = "OptionClient";

/**
 * Render the output client component.
 * @param {OutputProps} props - The output client component properties
 * @param {OutputRef} ref - The output client component reference
 * @returns The rendered output client component
 */
export const OutputClient = forwardRef<OutputRef, OutputProps>(
  ({ children, ...rest }, ref) => {
    return (
      <output ref={ref} {...rest}>
        {children}
      </output>
    );
  }
);

OutputClient.displayName = "OutputClient";

/**
 * Render the paragraph client component.
 * @param {ParagraphProps} props - The paragraph client component properties
 * @param {ParagraphRef} ref - The paragraph client component reference
 * @returns The rendered paragraph client component
 */
export const ParagraphClient = forwardRef<ParagraphRef, ParagraphProps>(
  ({ children, ...rest }, ref) => {
    return (
      <p ref={ref} {...rest}>
        {children}
      </p>
    );
  }
);

ParagraphClient.displayName = "ParagraphClient";

/**
 * Render the picture client component.
 * @param {PictureProps} props - The picture client component properties
 * @param {PictureRef} ref - The picture client component reference
 * @returns The rendered picture client component
 */
export const PictureClient = forwardRef<PictureRef, PictureProps>(
  ({ children, ...rest }, ref) => {
    return (
      <picture ref={ref} {...rest}>
        {children}
      </picture>
    );
  }
);

PictureClient.displayName = "PictureClient";

/**
 * Render the preformatted text client component.
 * @param {PreProps} props - The preformatted text client component properties
 * @param {PreRef} ref - The preformatted text client component reference
 * @returns The rendered preformatted text client component
 */
export const PreClient = forwardRef<PreRef, PreProps>(
  ({ children, ...rest }, ref) => {
    return (
      <pre ref={ref} {...rest}>
        {children}
      </pre>
    );
  }
);

PreClient.displayName = "PreClient";

/**
 * Render the progress indicator client component.
 * @param {ProgressProps} props - The progress indicator client component properties
 * @param {ProgressRef} ref - The progress indicator client component reference
 * @returns The rendered progress indicator client component
 */
export const ProgressClient = forwardRef<ProgressRef, ProgressProps>(
  ({ children, ...rest }, ref) => {
    return (
      <progress ref={ref} {...rest}>
        {children}
      </progress>
    );
  }
);

ProgressClient.displayName = "ProgressClient";

/**
 * Render the inline quotation client component.
 * @param {QProps} props - The inline quotation client component properties
 * @param {QRef} ref - The inline quotation client component reference
 * @returns The rendered inline quotation client component
 */
export const QClient = forwardRef<QRef, QProps>(
  ({ children, ...rest }, ref) => {
    return (
      <q ref={ref} {...rest}>
        {children}
      </q>
    );
  }
);

QClient.displayName = "QClient";

/**
 * Render the ruby fallback parenthesis client component.
 * @param {RpProps} props - The ruby fallback parenthesis client component properties
 * @param {RpRef} ref - The ruby fallback parenthesis client component reference
 * @returns The rendered ruby fallback parenthesis client component
 */
export const RpClient = forwardRef<RpRef, RpProps>(
  ({ children, ...rest }, ref) => {
    return (
      <rp ref={ref} {...rest}>
        {children}
      </rp>
    );
  }
);

RpClient.displayName = "RpClient";

/**
 * Render the ruby text client component.
 * @param {RtProps} props - The ruby text client component properties
 * @param {RtRef} ref - The ruby text client component reference
 * @returns The rendered ruby text client component
 */
export const RtClient = forwardRef<RtRef, RtProps>(
  ({ children, ...rest }, ref) => {
    return (
      <rt ref={ref} {...rest}>
        {children}
      </rt>
    );
  }
);

RtClient.displayName = "RtClient";

/**
 * Render the ruby annotation client component.
 * @param {RubyProps} props - The ruby annotation client component properties
 * @param {RubyRef} ref - The ruby annotation client component reference
 * @returns The rendered ruby annotation client component
 */
export const RubyClient = forwardRef<RubyRef, RubyProps>(
  ({ children, ...rest }, ref) => {
    return (
      <ruby ref={ref} {...rest}>
        {children}
      </ruby>
    );
  }
);

RubyClient.displayName = "RubyClient";

/**
 * Render the strikethrough client component.
 * @param {SProps} props - The strikethrough client component properties
 * @param {SRef} ref - The strikethrough client component reference
 * @returns The rendered strikethrough client component
 */
export const SClient = forwardRef<SRef, SProps>(
  ({ children, ...rest }, ref) => {
    return (
      <s ref={ref} {...rest}>
        {children}
      </s>
    );
  }
);

SClient.displayName = "SClient";

/**
 * Render the sample output client component.
 * @param {SampProps} props - The sample output client component properties
 * @param {SampRef} ref - The sample output client component reference
 * @returns The rendered sample output client component
 */
export const SampClient = forwardRef<SampRef, SampProps>(
  ({ children, ...rest }, ref) => {
    return (
      <samp ref={ref} {...rest}>
        {children}
      </samp>
    );
  }
);

SampClient.displayName = "SampClient";

/**
 * Render the script client component.
 * @param {ScriptProps} props - The script client component properties
 * @param {ScriptRef} ref - The script client component reference
 * @returns The rendered script client component
 */
export const ScriptClient = forwardRef<ScriptRef, ScriptProps>(
  ({ children, ...rest }, ref) => {
    return (
      <script ref={ref} {...rest}>
        {children}
      </script>
    );
  }
);

ScriptClient.displayName = "ScriptClient";

/**
 * Render the generic search client component.
 * @param {SearchProps} props - The generic search client component properties
 * @param {SearchRef} ref - The generic search client component reference
 * @returns The rendered generic search client component
 */
export const SearchClient = forwardRef<SearchRef, SearchProps>(
  ({ children, ...rest }, ref) => {
    return (
      <search ref={ref} {...rest}>
        {children}
      </search>
    );
  }
);

SearchClient.displayName = "SearchClient";

/**
 * Render the generic section client component.
 * @param {SectionProps} props - The generic section client component properties
 * @param {SectionRef} ref - The generic section client component reference
 * @returns The rendered generic section client component
 */
export const SectionClient = forwardRef<SectionRef, SectionProps>(
  ({ children, ...rest }, ref) => {
    return (
      <section ref={ref} {...rest}>
        {children}
      </section>
    );
  }
);

SectionClient.displayName = "SectionClient";

/**
 * Render the HTML select client component.
 * @param {SelectProps} props - The HTML select client component properties
 * @param {SelectRef} ref - The HTML select client component reference
 * @returns The rendered HTML select client component
 */
export const SelectClient = forwardRef<SelectRef, SelectProps>(
  ({ children, ...rest }, ref) => {
    return (
      <select ref={ref} {...rest}>
        {children}
      </select>
    );
  }
);

SelectClient.displayName = "SelectClient";

/**
 * Render the web component slot client component.
 * @param {SlotProps} props - The web component slot client component properties
 * @param {SlotRef} ref - The web component slot client component reference
 * @returns The rendered web component slot client component
 */
export const SlotClient = forwardRef<SlotRef, SlotProps>(
  ({ children, ...rest }, ref) => {
    return (
      <slot ref={ref} {...rest}>
        {children}
      </slot>
    );
  }
);

SlotClient.displayName = "SlotClient";

/**
 * Render the side comment client component.
 * @param {SmallProps} props - The side comment client component properties
 * @param {SmallRef} ref - The side comment client component reference
 * @returns The rendered side comment client component
 */
export const SmallClient = forwardRef<SmallRef, SmallProps>(
  ({ children, ...rest }, ref) => {
    return (
      <small ref={ref} {...rest}>
        {children}
      </small>
    );
  }
);

SmallClient.displayName = "SmallClient";

/**
 * Render the media or image source client component.
 * @param {SourceProps} props - The media or image source client component properties
 * @param {SourceRef} ref - The media or image source client component reference
 * @returns The rendered media or image source client component
 */
export const SourceClient = forwardRef<SourceRef, SourceProps>(
  ({ ...rest }, ref) => {
    return <source ref={ref} {...rest} />;
  }
);

SourceClient.displayName = "SourceClient";

/**
 * Render the content span client component.
 * @param {SpanProps} props - The content span client component properties
 * @param {SpanRef} ref - The content span client component reference
 * @returns The rendered content span client component
 */
export const SpanClient = forwardRef<SpanRef, SpanProps>(
  ({ children, ...rest }, ref) => {
    return (
      <span ref={ref} {...rest}>
        {children}
      </span>
    );
  }
);

SpanClient.displayName = "SpanClient";

/**
 * Render the strong importance client component.
 * @param {StrongProps} props - The strong importance client component properties
 * @param {StrongRef} ref - The strong importance client component reference
 * @returns The rendered strong importance client component
 */
export const StrongClient = forwardRef<StrongRef, StrongProps>(
  ({ children, ...rest }, ref) => {
    return (
      <strong ref={ref} {...rest}>
        {children}
      </strong>
    );
  }
);

StrongClient.displayName = "StrongClient";

/**
 * Render the style information client component.
 * @param {StyleProps} props - The style information client component properties
 * @param {StyleRef} ref - The style information client component reference
 * @returns The rendered style information client component
 */
export const StyleClient = forwardRef<StyleRef, StyleProps>(
  ({ children, ...rest }, ref) => {
    return (
      <style ref={ref} {...rest}>
        {children}
      </style>
    );
  }
);

StyleClient.displayName = "StyleClient";

/**
 * Render the subscript client component.
 * @param {SubProps} props - The subscript client component properties
 * @param {SubRef} ref - The subscript client component reference
 * @returns The rendered subscript client component
 */
export const SubClient = forwardRef<SubRef, SubProps>(
  ({ children, ...rest }, ref) => {
    return (
      <sub ref={ref} {...rest}>
        {children}
      </sub>
    );
  }
);

SubClient.displayName = "SubClient";

/**
 * Render the disclosure summary client component.
 * @param {SummaryProps} props - The disclosure summary client component properties
 * @param {SummaryRef} ref - The disclosure summary client component reference
 * @returns The rendered disclosure summary client component
 */
export const SummaryClient = forwardRef<SummaryRef, SummaryProps>(
  ({ children, ...rest }, ref) => {
    return (
      <summary ref={ref} {...rest}>
        {children}
      </summary>
    );
  }
);

SummaryClient.displayName = "SummaryClient";

/**
 * Render the superscript client component.
 * @param {SupProps} props - The superscript client component properties
 * @param {SupRef} ref - The superscript client component reference
 * @returns The rendered superscript client component
 */
export const SupClient = forwardRef<SupRef, SupProps>(
  ({ children, ...rest }, ref) => {
    return (
      <sup ref={ref} {...rest}>
        {children}
      </sup>
    );
  }
);

SupClient.displayName = "SupClient";

/**
 * Render the scalable vector graphics client component.
 * @param {SvgProps} props - The scalable vector graphics client component properties
 * @param {SvgRef} ref - The scalable vector graphics client component reference
 * @returns The rendered scalable vector graphics client component
 */
export const SvgClient = forwardRef<SvgRef, SvgProps>(
  ({ children, ...rest }, ref) => {
    return (
      <svg ref={ref} {...rest}>
        {children}
      </svg>
    );
  }
);

SvgClient.displayName = "SvgClient";

/**
 * Render the table client component.
 * @param {TableProps} props - The table client component properties
 * @param {TableRef} ref - The table client component reference
 * @returns The rendered table client component
 */
export const TableClient = forwardRef<TableRef, TableProps>(
  ({ children, ...rest }, ref) => {
    return (
      <table ref={ref} {...rest}>
        {children}
      </table>
    );
  }
);

TableClient.displayName = "TableClient";

/**
 * Render the table body client component.
 * @param {TbodyProps} props - The table body client component properties
 * @param {TbodyRef} ref - The table body client component reference
 * @returns The rendered table body client component
 */
export const TbodyClient = forwardRef<TbodyRef, TbodyProps>(
  ({ children, ...rest }, ref) => {
    return (
      <tbody ref={ref} {...rest}>
        {children}
      </tbody>
    );
  }
);

TbodyClient.displayName = "TbodyClient";

/**
 * Render the table data cell client component.
 * @param {TdProps} props - The table data cell client component properties
 * @param {TdRef} ref - The table data cell client component reference
 * @returns The rendered table data cell client component
 */
export const TdClient = forwardRef<TdRef, TdProps>(
  ({ children, ...rest }, ref) => {
    return (
      <td ref={ref} {...rest}>
        {children}
      </td>
    );
  }
);

TdClient.displayName = "TdClient";

/**
 * Render the content template client component.
 * @param {TemplateProps} props - The content template client component properties
 * @param {TemplateRef} ref - The content template client component reference
 * @returns The rendered content template client component
 */
export const TemplateClient = forwardRef<TemplateRef, TemplateProps>(
  ({ children, ...rest }, ref) => {
    return (
      <template ref={ref} {...rest}>
        {children}
      </template>
    );
  }
);

TemplateClient.displayName = "TemplateClient";

/**
 * Render the textarea client component.
 * @param {TextareaProps} props - The textarea client component properties
 * @param {TextareaRef} ref - The textarea client component reference
 * @returns The rendered textarea client component
 */
export const TextareaClient = forwardRef<TextareaRef, TextareaProps>(
  ({ children, ...rest }, ref) => {
    return (
      <textarea ref={ref} {...rest}>
        {children}
      </textarea>
    );
  }
);

TextareaClient.displayName = "TextareaClient";

/**
 * Render the table foot client component.
 * @param {TfootProps} props - The table foot client component properties
 * @param {TfootRef} ref - The table foot client component reference
 * @returns The rendered table foot client component
 */
export const TfootClient = forwardRef<TfootRef, TfootProps>(
  ({ children, ...rest }, ref) => {
    return (
      <tfoot ref={ref} {...rest}>
        {children}
      </tfoot>
    );
  }
);

TfootClient.displayName = "TfootClient";

/**
 * Render the table header client component.
 * @param {ThProps} props - The table header client component properties
 * @param {ThRef} ref - The table header client component reference
 * @returns The rendered table header client component
 */
export const ThClient = forwardRef<ThRef, ThProps>(
  ({ children, ...rest }, ref) => {
    return (
      <th ref={ref} {...rest}>
        {children}
      </th>
    );
  }
);

ThClient.displayName = "ThClient";

/**
 * Render the table head client component.
 * @param {TheadProps} props - The table head client component properties
 * @param {TheadRef} ref - The table head client component reference
 * @returns The rendered table head client component
 */
export const TheadClient = forwardRef<TheadRef, TheadProps>(
  ({ children, ...rest }, ref) => {
    return (
      <thead ref={ref} {...rest}>
        {children}
      </thead>
    );
  }
);

TheadClient.displayName = "TheadClient";

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
