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
  //   DetailsProps,
  //   DetailsRef,
  //   DfnProps,
  //   DfnRef,
  //   DialogProps,
  //   DialogRef,
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
// export const DetailsClient = forwardRef<DetailsRef, DetailsProps>(
//   ({ children, ...rest }, ref) => {
//     return (
//       <details ref={ref} {...rest}>
//         {children}
//       </details>
//     );
//   }
// );

// DetailsClient.displayName = "DetailsClient";

/**
 * Render the definition element client component.
 * @param {DfnProps} props - The definition element client component properties
 * @param {DfnRef} ref - The definition element client component reference
 * @returns The rendered definition element client component
 */
// export const DfnClient = forwardRef<DfnRef, DfnProps>(
//   ({ children, ...rest }, ref) => {
//     return (
//       <dfn ref={ref} {...rest}>
//         {children}
//       </dfn>
//     );
//   }
// );

// DfnClient.displayName = "DfnClient";

/**
 * Render the dialog client component.
 * @param {DialogProps} props - The dialog client component properties
 * @param {DialogRef} ref - The dialog client component reference
 * @returns The rendered dialog client component
 */
// export const DialogClient = forwardRef<DialogRef, DialogProps>(
//   ({ children, ...rest }, ref) => {
//     return (
//       <dialog ref={ref} {...rest}>
//         {children}
//       </dialog>
//     );
//   }
// );

// DialogClient.displayName = "DialogClient";
