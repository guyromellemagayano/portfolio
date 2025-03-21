import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "./components";

const AClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.AClient };
});
const MemoizedAClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedAClient };
});

export type ARef = React.ElementRef<"a">;
export type AProps = React.ComponentPropsWithoutRef<"a"> & CommonComponentProps;

/**
 * Render the default anchor server component.
 * @param {AProps} props - The default anchor server component properties
 * @returns The rendered default anchor server component
 */
export const A = ({
  as: Component = "a",
  href = "#",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: AProps) => {
  const element = (
    <Component href={href} {...rest}>
      {children}
    </Component>
  );

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedAClient : AClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent href={href} {...rest}>
          {children}
        </ClientComponent>
      </Suspense>
    );
  }

  return element;
};
A.displayName = "A";

const AbbrClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.AbbrClient };
});
const MemoizedAbbrClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedAbbrClient };
});

export type AbbrRef = React.ElementRef<"abbr">;
export type AbbrProps = React.ComponentPropsWithoutRef<"abbr"> &
  CommonComponentProps;

/**
 * Render the default abbreviation server component.
 * @param {AbbrProps} props - The default abbreviation server component properties
 * @returns The rendered default abbreviation server component
 */
export const Abbr = ({
  as: Component = "abbr",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: AbbrProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedAbbrClient : AbbrClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest}>{children}</ClientComponent>
      </Suspense>
    );
  }

  return element;
};
Abbr.displayName = "Abbr";

const AddressClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.AddressClient };
});
const MemoizedAddressClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedAddressClient };
});

export type AddressRef = React.ElementRef<"address">;
export type AddressProps = React.ComponentPropsWithoutRef<"address"> &
  CommonComponentProps;

/**
 * Render the default address server component.
 * @param {AddressProps} props - The default address server component properties
 * @returns The rendered default address server component
 */
export const Address = ({
  as: Component = "address",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: AddressProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedAddressClient : AddressClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest}>{children}</ClientComponent>
      </Suspense>
    );
  }

  return element;
};
Address.displayName = "Address";

const AreaClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.AreaClient };
});
const MemoizedAreaClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedAreaClient };
});

export type AreaRef = React.ElementRef<"area">;
export type AreaProps = React.ComponentPropsWithoutRef<"area"> &
  CommonComponentProps;

/**
 * Render the default area server component.
 * @param {AreaProps} props - The default area server component properties
 * @returns The rendered default area server component
 */
export const Area = ({
  as: Component = "area",
  alt = "",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: AreaProps) => {
  const element = (
    <Component alt={alt} {...rest}>
      {children}
    </Component>
  );

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedAreaClient : AreaClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent alt={alt} {...rest}>
          {children}
        </ClientComponent>
      </Suspense>
    );
  }

  return element;
};
Area.displayName = "Area";

const ArticleClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.ArticleClient };
});
const MemoizedArticleClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedArticleClient };
});

export type ArticleRef = React.ElementRef<"article">;
export type ArticleProps = React.ComponentPropsWithoutRef<"article"> &
  CommonComponentProps;

/**
 * Render the default article server component.
 * @param {ArticleProps} props - The default article server component properties
 * @returns The rendered default article server component
 */
export const Article = ({
  as: Component = "article",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: ArticleProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedArticleClient : ArticleClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest}>{children} </ClientComponent>
      </Suspense>
    );
  }

  return element;
};
Article.displayName = "Article";

const AsideClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.AsideClient };
});
const MemoizedAsideClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedAsideClient };
});

export type AsideRef = React.ElementRef<"aside">;
export type AsideProps = React.ComponentPropsWithoutRef<"aside"> &
  CommonComponentProps;

/**
 * Render the default aside server component.
 * @param {AsideProps} props - The default aside server component properties
 * @returns The rendered default aside server component
 */
export const Aside = ({
  as: Component = "aside",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: AsideProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedAsideClient : AsideClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest}>{children} </ClientComponent>
      </Suspense>
    );
  }

  return element;
};
Aside.displayName = "Aside";

const AudioClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.AudioClient };
});
const MemoizedAudioClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedAudioClient };
});

export type AudioRef = React.ElementRef<"audio">;
export type AudioProps = React.ComponentPropsWithoutRef<"audio"> &
  CommonComponentProps;

/**
 * Render the default audio server component.
 * @param {AudioProps} props - The default audio server component properties
 * @returns The rendered default audio server component
 */
export const Audio = ({
  as: Component = "audio",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: AudioProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedAudioClient : AudioClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest}>{children} </ClientComponent>
      </Suspense>
    );
  }

  return element;
};
Audio.displayName = "Audio";

const BClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.BClient };
});
const MemoizedBClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedBClient };
});

export type BRef = React.ElementRef<"b">;
export type BProps = React.ComponentPropsWithoutRef<"b"> & CommonComponentProps;

/**
 * Render the default bring attention to server component.
 * @param {BProps} props - The default bring attention to server component properties
 * @returns The rendered default bring attention to server component
 */
export const B = ({
  as: Component = "b",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: BProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedBClient : BClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest}>{children}</ClientComponent>
      </Suspense>
    );
  }

  return element;
};
B.displayName = "B";

const BaseClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.BaseClient };
});
const MemoizedBaseClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedBaseClient };
});

export type BaseRef = React.ElementRef<"base">;
export type BaseProps = React.ComponentPropsWithoutRef<"base"> &
  CommonComponentProps;

/**
 * Render the default base server component.
 * @param {BaseProps} props - The default base server component properties
 * @returns The rendered default base server component
 */
export const Base = ({
  as: Component = "base",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: BaseProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedBaseClient : BaseClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest}>{children} </ClientComponent>
      </Suspense>
    );
  }

  return element;
};
Base.displayName = "Base";

const BdiClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.BdiClient };
});
const MemoizedBdiClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedBdiClient };
});

export type BdiRef = React.ElementRef<"bdi">;
export type BdiProps = React.ComponentPropsWithoutRef<"bdi"> &
  CommonComponentProps;

/**
 * Render the default bidirectional isolate server component.
 * @param {BdiProps} props - The default bidirectional isolate server component properties
 * @returns The rendered default bidirectional isolate server component
 */
export const Bdi = ({
  as: Component = "bdi",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: BdiProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedBdiClient : BdiClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest}>{children}</ClientComponent>
      </Suspense>
    );
  }

  return element;
};
Bdi.displayName = "Bdi";

const BdoClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.BdoClient };
});
const MemoizedBdoClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedBdoClient };
});

export type BdoRef = React.ElementRef<"bdo">;
export type BdoProps = React.ComponentPropsWithoutRef<"bdo"> &
  CommonComponentProps;

/**
 * Render the default bidirectional text override server component.
 * @param {BdoProps} props - The default bidirectional text override server component properties
 * @returns The rendered default bidirectional text override server component
 */
export const Bdo = ({
  as: Component = "bdo",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: BdoProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedBdoClient : BdoClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest}>{children}</ClientComponent>
      </Suspense>
    );
  }

  return element;
};
Bdo.displayName = "Bdo";

const BlockquoteClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.BlockquoteClient };
});
const MemoizedBlockquoteClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedBlockquoteClient };
});

export type BlockquoteRef = React.ElementRef<"blockquote">;
export type BlockquoteProps = React.ComponentPropsWithoutRef<"blockquote"> &
  CommonComponentProps;

/**
 * Render the default blockquote server component.
 * @param {BlockquoteProps} props - The default blockquote server component properties
 * @returns The rendered default blockquote server component
 */
export const Blockquote = ({
  as: Component = "blockquote",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: BlockquoteProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized
      ? MemoizedBlockquoteClient
      : BlockquoteClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest}>{children} </ClientComponent>
      </Suspense>
    );
  }

  return element;
};
Blockquote.displayName = "Blockquote";

const BodyClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.BodyClient };
});
const MemoizedBodyClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedBodyClient };
});

export type BodyRef = React.ElementRef<"body">;
export type BodyProps = React.ComponentPropsWithoutRef<"body"> &
  CommonComponentProps;

/**
 * Render the default document body server component.
 * @param {BodyProps} props - The default document body server component properties
 * @returns The rendered default document body server component
 */
export const Body = ({
  as: Component = "body",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: BodyProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedBodyClient : BodyClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest}>{children}</ClientComponent>
      </Suspense>
    );
  }

  return element;
};
Body.displayName = "Body";

const BrClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.BrClient };
});
const MemoizedBrClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedBrClient };
});

export type BrRef = React.ElementRef<"br">;
export type BrProps = React.ComponentPropsWithoutRef<"br"> &
  CommonComponentProps;

/**
 * Render the default line break server component.
 * @param {BrProps} props - The default line break server component properties
 * @returns The rendered default line break server component
 */
export const Br = ({
  as: Component = "br",
  isClient = false,
  isMemoized = false,
  ...rest
}: BrProps) => {
  const element = <Component {...rest} />;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedBrClient : BrClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest} />
      </Suspense>
    );
  }

  return element;
};
Br.displayName = "Br";

const ButtonClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.ButtonClient };
});
const MemoizedButtonClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedButtonClient };
});

export type ButtonRef = React.ElementRef<"button">;
export type ButtonProps = React.ComponentPropsWithoutRef<"button"> &
  CommonComponentProps;

/**
 * Render the default button server component.
 * @param {ButtonProps} props - The default button server component properties
 * @returns The rendered default button server component
 */
export const Button = ({
  as: Component = "button",
  type = "button",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: ButtonProps) => {
  const element = (
    <Component type={type} disabled={isClient} {...rest}>
      {children}
    </Component>
  );

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedButtonClient : ButtonClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent type={type} {...rest}>
          {children}
        </ClientComponent>
      </Suspense>
    );
  }

  return element;
};
Button.displayName = "Button";

const CanvasClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.CanvasClient };
});
const MemoizedCanvasClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedCanvasClient };
});

export type CanvasRef = React.ElementRef<"canvas">;
export type CanvasProps = React.ComponentPropsWithoutRef<"canvas"> &
  CommonComponentProps;

/**
 * Render the default canvas server component.
 * @param {CanvasProps} props - The default canvas server component properties
 * @returns The rendered default canvas server component
 */
export const Canvas = ({
  as: Component = "canvas",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: CanvasProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedCanvasClient : CanvasClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest}>{children} </ClientComponent>
      </Suspense>
    );
  }

  return element;
};
Canvas.displayName = "Canvas";

const CaptionClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.CaptionClient };
});
const MemoizedCaptionClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedCaptionClient };
});

export type CaptionRef = React.ElementRef<"caption">;
export type CaptionProps = React.ComponentPropsWithoutRef<"caption"> &
  CommonComponentProps;

/**
 * Render the default caption server component.
 * @param {CaptionProps} props - The default caption server component properties
 * @returns The rendered default caption server component
 */
export const Caption = ({
  as: Component = "caption",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: CaptionProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedCaptionClient : CaptionClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest}>{children}</ClientComponent>
      </Suspense>
    );
  }

  return element;
};
Caption.displayName = "Caption";

const CiteClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.CiteClient };
});
const MemoizedCiteClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedCiteClient };
});

export type CiteRef = React.ElementRef<"cite">;
export type CiteProps = React.ComponentPropsWithoutRef<"cite"> &
  CommonComponentProps;

/**
 * Render the default cite server component.
 * @param {CiteProps} props - The default cite server component properties
 * @returns The rendered default cite server component
 */
export const Cite = ({
  as: Component = "cite",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: CiteProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedCiteClient : CiteClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest}>{children}</ClientComponent>
      </Suspense>
    );
  }

  return element;
};
Cite.displayName = "Cite";

const CodeClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.CodeClient };
});
const MemoizedCodeClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedCodeClient };
});

export type CodeRef = React.ElementRef<"code">;
export type CodeProps = React.ComponentPropsWithoutRef<"code"> &
  CommonComponentProps;

/**
 * Render the default code server component.
 * @param {CodeProps} props - The default code server component properties
 * @returns The rendered default code server component
 */
export const Code = ({
  as: Component = "code",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: CodeProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedCodeClient : CodeClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest}>{children}</ClientComponent>
      </Suspense>
    );
  }

  return element;
};
Code.displayName = "Code";

const ColClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.ColClient };
});
const MemoizedColClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedColClient };
});

export type ColRef = React.ElementRef<"col">;
export type ColProps = React.ComponentPropsWithoutRef<"col"> &
  CommonComponentProps;

/**
 * Render the default column server component.
 * @param {ColProps} props - The default column server component properties
 * @returns The rendered default column server component
 */
export const Col = ({
  as: Component = "col",
  isClient = false,
  isMemoized = false,
  ...rest
}: ColProps) => {
  const element = <Component {...rest} />;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedColClient : ColClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest} />
      </Suspense>
    );
  }

  return element;
};
Col.displayName = "Col";

const ColgroupClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.ColgroupClient };
});
const MemoizedColgroupClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedColgroupClient };
});

export type ColgroupRef = React.ElementRef<"colgroup">;
export type ColgroupProps = React.ComponentPropsWithoutRef<"colgroup"> &
  CommonComponentProps;

/**
 * Render the default table column group server component.
 * @param {ColgroupProps} props - The default table column group server component properties
 * @returns The rendered default table column group server component
 */
export const Colgroup = ({
  as: Component = "colgroup",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: ColgroupProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized
      ? MemoizedColgroupClient
      : ColgroupClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest}>{children}</ClientComponent>
      </Suspense>
    );
  }

  return element;
};
Colgroup.displayName = "Colgroup";

const DataClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.DataClient };
});
const MemoizedDataClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedDataClient };
});

export type DataRef = React.ElementRef<"data">;
export type DataProps = React.ComponentPropsWithoutRef<"data"> &
  CommonComponentProps;

/**
 * Render the default data server component.
 * @param {DataProps} props - The default data server component properties
 * @returns The rendered default data server component
 */
export const Data = ({
  as: Component = "data",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: DataProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedDataClient : DataClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest}>{children}</ClientComponent>
      </Suspense>
    );
  }

  return element;
};
Data.displayName = "Data";

const DatalistClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.DatalistClient };
});
const MemoizedDatalistClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedDatalistClient };
});

export type DatalistRef = React.ElementRef<"datalist">;
export type DatalistProps = React.ComponentPropsWithoutRef<"datalist"> &
  CommonComponentProps;

/**
 * Render the default datalist server component.
 * @param {DatalistProps} props - The default datalist server component properties
 * @returns The rendered default datalist server component
 */
export const Datalist = ({
  as: Component = "datalist",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: DatalistProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized
      ? MemoizedDatalistClient
      : DatalistClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest}>{children}</ClientComponent>
      </Suspense>
    );
  }

  return element;
};
Datalist.displayName = "Datalist";

const DdClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.DdClient };
});
const MemoizedDdClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedDdClient };
});

export type DdRef = React.ElementRef<"dd">;
export type DdProps = React.ComponentPropsWithoutRef<"dd"> &
  CommonComponentProps;

/**
 * Render the default description details server component.
 * @param {DdProps} props - The default description details server component properties
 * @returns The rendered default description details server component
 */
export const Dd = ({
  as: Component = "dd",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: DdProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedDdClient : DdClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest}>{children}</ClientComponent>
      </Suspense>
    );
  }

  return element;
};
Dd.displayName = "Dd";

const DelClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.DelClient };
});
const MemoizedDelClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedDelClient };
});

export type DelRef = React.ElementRef<"del">;
export type DelProps = React.ComponentPropsWithoutRef<"del"> &
  CommonComponentProps;

/**
 * Render the default deleted text server component.
 * @param {DelProps} props - The default deleted text server component properties
 * @returns The rendered default deleted text server component
 */
export const Del = ({
  as: Component = "del",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: DelProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedDelClient : DelClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest}>{children}</ClientComponent>
      </Suspense>
    );
  }

  return element;
};
Del.displayName = "Del";

const DetailsClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.DetailsClient };
});
const MemoizedDetailsClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedDetailsClient };
});

export type DetailsRef = React.ElementRef<"details">;
export type DetailsProps = React.ComponentPropsWithoutRef<"details"> &
  CommonComponentProps;

/**
 * Render the default details disclosure server component.
 * @param {DetailsProps} props - The default details disclosure server component properties
 * @returns The rendered default details disclosure server component
 */
export const Details = ({
  as: Component = "details",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: DetailsProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedDetailsClient : DetailsClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest}>{children}</ClientComponent>
      </Suspense>
    );
  }

  return element;
};
Details.displayName = "Details";

const DfnClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.DfnClient };
});
const MemoizedDfnClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedDfnClient };
});

export type DfnRef = React.ElementRef<"dfn">;
export type DfnProps = React.ComponentPropsWithoutRef<"dfn"> &
  CommonComponentProps;

/**
 * Render the default definition element server component.
 * @param {DfnProps} props - The default definition element server component properties
 * @returns The rendered default definition element server component
 */
export const Dfn = ({
  as: Component = "dfn",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: DfnProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedDfnClient : DfnClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest}>{children}</ClientComponent>
      </Suspense>
    );
  }

  return element;
};
Dfn.displayName = "Dfn";

const DialogClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.DialogClient };
});
const MemoizedDialogClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedDialogClient };
});

export type DialogRef = React.ElementRef<"dialog">;
export type DialogProps = React.ComponentPropsWithoutRef<"dialog"> &
  CommonComponentProps;

/**
 * Render the default dialog server component.
 * @param {DialogProps} props - The default dialog server component properties
 * @returns The rendered default dialog server component
 */
export const Dialog = ({
  as: Component = "dialog",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: DialogProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedDialogClient : DialogClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest}>{children}</ClientComponent>
      </Suspense>
    );
  }

  return element;
};
Dialog.displayName = "Dialog";

const DivClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.DivClient };
});
const MemoizedDivClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedDivClient };
});

export type DivRef = React.ElementRef<"div">;
export type DivProps = React.ComponentPropsWithoutRef<"div"> &
  CommonComponentProps;

/**
 * Render the default content division server component.
 * @param {DivProps} props - The default content division server component properties
 * @returns The rendered default content division server component
 */
export const Div = ({
  as: Component = "div",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: DivProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedDivClient : DivClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest}>{children}</ClientComponent>
      </Suspense>
    );
  }

  return element;
};
Div.displayName = "Div";

const DlClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.DlClient };
});
const MemoizedDlClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedDlClient };
});

export type DlRef = React.ElementRef<"dl">;
export type DlProps = React.ComponentPropsWithoutRef<"dl"> &
  CommonComponentProps;

/**
 * Render the default description list server component.
 * @param {DlProps} props - The default description list server component properties
 * @returns The rendered default description list server component
 */
export const Dl = ({
  as: Component = "dl",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: DlProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedDlClient : DlClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest}>{children}</ClientComponent>
      </Suspense>
    );
  }

  return element;
};
Dl.displayName = "Dl";

const DtClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.DtClient };
});
const MemoizedDtClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedDtClient };
});

export type DtRef = React.ElementRef<"dt">;
export type DtProps = React.ComponentPropsWithoutRef<"dt"> &
  CommonComponentProps;

/**
 * Render the default description term server component.
 * @param {DtProps} props - The default description term server component properties
 * @returns The rendered default description term server component
 */
export const Dt = ({
  as: Component = "dt",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: DtProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedDtClient : DtClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest}>{children}</ClientComponent>
      </Suspense>
    );
  }

  return element;
};
Dt.displayName = "Dt";

const EmClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.EmClient };
});
const MemoizedEmClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedEmClient };
});

export type EmRef = React.ElementRef<"em">;
export type EmProps = React.ComponentPropsWithoutRef<"em"> &
  CommonComponentProps;

/**
 * Render the default emphasis server component.
 * @param {EmProps} props - The default emphasis server component properties
 * @returns The rendered default emphasis server component
 */
export const Em = ({
  as: Component = "em",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: EmProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedEmClient : EmClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest}>{children}</ClientComponent>
      </Suspense>
    );
  }

  return element;
};
Em.displayName = "Em";

const EmbedClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.EmbedClient };
});
const MemoizedEmbedClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedEmbedClient };
});

export type EmbedRef = React.ElementRef<"embed">;
export type EmbedProps = React.ComponentPropsWithoutRef<"embed"> &
  CommonComponentProps;

/**
 * Render the default embed external content server component.
 * @param {EmbedProps} props - The default embed external content server component properties
 * @returns The rendered default embed external content server component
 */
export const Embed = ({
  as: Component = "embed",
  isClient = false,
  isMemoized = false,
  ...rest
}: EmbedProps) => {
  const element = <Component {...rest} />;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedEmbedClient : EmbedClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest} />
      </Suspense>
    );
  }

  return element;
};
Embed.displayName = "Embed";

const FieldsetClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.FieldsetClient };
});
const MemoizedFieldsetClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedFieldsetClient };
});

export type FieldsetRef = React.ElementRef<"fieldset">;
export type FieldsetProps = React.ComponentPropsWithoutRef<"fieldset"> &
  CommonComponentProps;

/**
 * Render the default field set server component.
 * @param {FieldsetProps} props - The default field set server component properties
 * @returns The rendered default field set server component
 */
export const Fieldset = ({
  as: Component = "fieldset",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: FieldsetProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized
      ? MemoizedFieldsetClient
      : FieldsetClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest}>{children}</ClientComponent>
      </Suspense>
    );
  }

  return element;
};
Fieldset.displayName = "Fieldset";

const FigcaptionClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.FigcaptionClient };
});
const MemoizedFigcaptionClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedFigcaptionClient };
});

export type FigcaptionRef = React.ElementRef<"figcaption">;
export type FigcaptionProps = React.ComponentPropsWithoutRef<"figcaption"> &
  CommonComponentProps;

/**
 * Render the default figure caption server component.
 * @param {FigcaptionProps} props - The default figure caption server component properties
 * @returns The rendered default figure caption server component
 */
export const Figcaption = ({
  as: Component = "figcaption",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: FigcaptionProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized
      ? MemoizedFigcaptionClient
      : FigcaptionClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest}>{children}</ClientComponent>
      </Suspense>
    );
  }

  return element;
};
Figcaption.displayName = "Figcaption";

const FigureClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.FigureClient };
});
const MemoizedFigureClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedFigureClient };
});

export type FigureRef = React.ElementRef<"figure">;
export type FigureProps = React.ComponentPropsWithoutRef<"figure"> &
  CommonComponentProps;

/**
 * Render the default figure with optional caption server component.
 * @param {FigureProps} props - The default figure with optional caption server component properties
 * @returns The rendered default figure with optional caption server component
 */
export const Figure = ({
  as: Component = "figure",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: FigureProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedFigureClient : FigureClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest}>{children}</ClientComponent>
      </Suspense>
    );
  }

  return element;
};
Figure.displayName = "Figure";

const FooterClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.FooterClient };
});
const MemoizedFooterClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedFooterClient };
});

export type FooterRef = React.ElementRef<"footer">;
export type FooterProps = React.ComponentPropsWithoutRef<"footer"> &
  CommonComponentProps;

/**
 * Render the default footer server component.
 * @param {FooterProps} props - The default footer server component properties
 * @returns The rendered default footer server component
 */
export const Footer = ({
  as: Component = "footer",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: FooterProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedFooterClient : FooterClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest}>{children}</ClientComponent>
      </Suspense>
    );
  }

  return element;
};
Footer.displayName = "Footer";

const FormClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.FormClient };
});
const MemoizedFormClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedFormClient };
});

export type FormRef = React.ElementRef<"form">;
export type FormProps = React.ComponentPropsWithoutRef<"form"> &
  CommonComponentProps;

/**
 * Render the default form server component.
 * @param {FormProps} props - The default form server component properties
 * @returns The rendered default form server component
 */
export const Form = ({
  as: Component = "form",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: FormProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedFormClient : FormClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest}>{children}</ClientComponent>
      </Suspense>
    );
  }

  return element;
};
Form.displayName = "Form";

const HeadClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.HeadClient };
});
const MemoizedHeadClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedHeadClient };
});

export type HeadRef = React.ElementRef<"head">;
export type HeadProps = React.ComponentPropsWithoutRef<"head"> &
  CommonComponentProps;

/**
 * Render the default document metadata (header) server component.
 * @param {HeadProps} props - The default document metadata (header) server component properties
 * @returns The rendered default document metadata (header) server component
 */
export const Head = ({
  as: Component = "head",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: HeadProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedHeadClient : HeadClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest}>{children}</ClientComponent>
      </Suspense>
    );
  }

  return element;
};
Head.displayName = "Head";

const HeaderClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.HeaderClient };
});
const MemoizedHeaderClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedHeaderClient };
});

export type HeaderRef = React.ElementRef<"header">;
export type HeaderProps = React.ComponentPropsWithoutRef<"header"> &
  CommonComponentProps;

/**
 * Render the default header server component.
 * @param {HeaderProps} props - The default header server component properties
 * @returns The rendered default header server component
 */
export const Header = ({
  as: Component = "header",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: HeaderProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedHeaderClient : HeaderClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest}>{children}</ClientComponent>
      </Suspense>
    );
  }

  return element;
};
Header.displayName = "Header";

const HeadingClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.HeadingClient };
});
const MemoizedHeadingClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedHeadingClient };
});

export type HeadingRef = React.ElementRef<"h1">;
export type HeadingProps = React.ComponentPropsWithoutRef<"h1"> &
  CommonComponentProps & {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  };

/**
 * Render the default HTML section heading server component.
 * @param {HeadingProps} props - The default HTML section heading server component properties
 * @returns The rendered default HTML section heading server component
 */
export const Heading = ({
  as: Component = "h1",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: HeadingProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedHeadingClient : HeadingClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest}>{children}</ClientComponent>
      </Suspense>
    );
  }

  return element;
};
Heading.displayName = "Heading";

const HgroupClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.HgroupClient };
});
const MemoizedHgroupClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedHgroupClient };
});

export type HgroupRef = React.ElementRef<"hgroup">;
export type HgroupProps = React.ComponentPropsWithoutRef<"hgroup"> &
  CommonComponentProps;

/**
 * Render the default heading group component.
 * @param {HgroupProps} props - The default heading group component properties
 * @returns The rendered default heading group component
 */
export const Hgroup = ({
  as: Component = "hgroup",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: HgroupProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedHgroupClient : HgroupClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest}>{children}</ClientComponent>
      </Suspense>
    );
  }

  return element;
};
Hgroup.displayName = "Hgroup";

const HrClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.HrClient };
});
const MemoizedHrClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedHrClient };
});

export type HrRef = React.ElementRef<"hr">;
export type HrProps = React.ComponentPropsWithoutRef<"hr"> &
  CommonComponentProps;

/**
 * Render the default thematic break (horizontal rule) server component.
 * @param {HrProps} props - The default thematic break (horizontal rule) server component properties
 * @returns The rendered default thematic break (horizontal rule) server component
 */
export const Hr = ({
  as: Component = "hr",
  isClient = false,
  isMemoized = false,
  ...rest
}: HrProps) => {
  const element = <Component {...rest} />;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedHrClient : HrClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest} />
      </Suspense>
    );
  }

  return element;
};
Hr.displayName = "Hr";

const HtmlClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.HtmlClient };
});
const MemoizedHtmlClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedHtmlClient };
});

export type HtmlRef = React.ElementRef<"html">;
export type HtmlProps = React.ComponentPropsWithoutRef<"html"> &
  CommonComponentProps;

/**
 * Render the default HTML document/root server component.
 * @param {HtmlProps} props - The default HTML document/root server component properties
 * @returns The rendered default HTML document/root server component
 */
export const Html = ({
  as: Component = "html",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: HtmlProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedHtmlClient : HtmlClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest}>{children}</ClientComponent>
      </Suspense>
    );
  }

  return element;
};
Html.displayName = "Html";

const IClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.IClient };
});
const MemoizedIClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedIClient };
});

export type IRef = React.ElementRef<"i">;
export type IProps = React.ComponentPropsWithoutRef<"i"> & CommonComponentProps;

/**
 * Render the default idiomatic text server component.
 * @param {IProps} props - The default idiomatic text server component properties
 * @returns The rendered default idiomatic text server component
 */
export const I = ({
  as: Component = "i",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: IProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedIClient : IClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest}>{children}</ClientComponent>
      </Suspense>
    );
  }

  return element;
};
I.displayName = "I";

const IframeClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.IframeClient };
});
const MemoizedIframeClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedIframeClient };
});

export type IframeRef = React.ElementRef<"iframe">;
export type IframeProps = React.ComponentPropsWithoutRef<"iframe"> &
  CommonComponentProps;

/**
 * Render the default inline frame server component.
 * @param {IframeProps} props - The default inline frame server component properties
 * @returns The rendered default inline frame server component
 */
export const Iframe = ({
  as: Component = "iframe",
  isClient = false,
  isMemoized = false,
  ...rest
}: IframeProps) => {
  const element = <Component {...rest} />;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedIframeClient : IframeClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest} />
      </Suspense>
    );
  }

  return element;
};
Iframe.displayName = "Iframe";

const ImgClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.ImgClient };
});
const MemoizedImgClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedImgClient };
});

export type ImgRef = React.ElementRef<"img">;
export type ImgProps = React.ComponentPropsWithoutRef<"img"> &
  CommonComponentProps;

/**
 * Render the default image embed server component.
 * @param {ImgProps} props - The default image embed server component properties
 * @returns The rendered default image embed server component
 */
export const Img = ({
  as: Component = "img",
  isClient = false,
  isMemoized = false,
  src = "#",
  alt = "",
  ...rest
}: ImgProps) => {
  const element = <Component src={src} alt={alt} {...rest} />;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedImgClient : ImgClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent src={src} alt={alt} {...rest} />
      </Suspense>
    );
  }

  return element;
};
Img.displayName = "Img";

const InputClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.InputClient };
});
const MemoizedInputClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedInputClient };
});

export type InputRef = React.ElementRef<"input">;
export type InputProps = React.ComponentPropsWithoutRef<"input"> &
  CommonComponentProps;

/**
 * Render the default HTML input server component.
 * @param {InputProps} props - The default HTML input server component properties
 * @returns The rendered default HTML input server component
 */
export const Input = ({
  as: Component = "input",
  isClient = false,
  isMemoized = false,
  type = "text",
  ...rest
}: InputProps) => {
  const element = <Component type={type} {...rest} />;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedInputClient : InputClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent type={type} {...rest} />
      </Suspense>
    );
  }

  return element;
};
Input.displayName = "Input";

const InsClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.InsClient };
});
const MemoizedInsClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedInsClient };
});

export type InsRef = React.ElementRef<"ins">;
export type InsProps = React.ComponentPropsWithoutRef<"ins"> &
  CommonComponentProps;

/**
 * Render the default inserted text server component.
 * @param {InsProps} props - The default inserted text server component properties
 * @returns The rendered default inserted text server component
 */
export const Ins = ({
  as: Component = "ins",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: InsProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedInsClient : InsClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest}>{children}</ClientComponent>
      </Suspense>
    );
  }

  return element;
};
Ins.displayName = "Ins";

const KbdClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.KbdClient };
});
const MemoizedKbdClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedKbdClient };
});

export type KbdRef = React.ElementRef<"kbd">;
export type KbdProps = React.ComponentPropsWithoutRef<"kbd"> &
  CommonComponentProps;

/**
 * Render the default keyboard input server component.
 * @param {KbdProps} props - The default keyboard input server component properties
 * @returns The rendered default keyboard input server component
 */
export const Kbd = ({
  as: Component = "kbd",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: KbdProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedKbdClient : KbdClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest}>{children}</ClientComponent>
      </Suspense>
    );
  }

  return element;
};
Kbd.displayName = "Kbd";

const LabelClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.LabelClient };
});
const MemoizedLabelClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedLabelClient };
});

export type LabelRef = React.ElementRef<"label">;
export type LabelProps = React.ComponentPropsWithoutRef<"label"> &
  CommonComponentProps;

/**
 * Render the default label server component.
 * @param {LabelProps} props - The default label server component properties
 * @returns The rendered default label server component
 */
export const Label = ({
  as: Component = "label",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: LabelProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedLabelClient : LabelClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest}>{children}</ClientComponent>
      </Suspense>
    );
  }

  return element;
};
Label.displayName = "Label";

const LegendClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.LegendClient };
});
const MemoizedLegendClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedLegendClient };
});

export type LegendRef = React.ElementRef<"legend">;
export type LegendProps = React.ComponentPropsWithoutRef<"legend"> &
  CommonComponentProps;

/**
 * Render the default field set legend server component.
 * @param {LegendProps} props - The default field set legend server component properties
 * @returns The rendered default field set legend server component
 */
export const Legend = ({
  as: Component = "legend",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: LegendProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedLegendClient : LegendClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest}>{children}</ClientComponent>
      </Suspense>
    );
  }

  return element;
};
Legend.displayName = "Legend";

const LiClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.LiClient };
});
const MemoizedLiClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedLiClient };
});

export type LiRef = React.ElementRef<"li">;
export type LiProps = React.ComponentPropsWithoutRef<"li"> &
  CommonComponentProps;

/**
 * Render the default list item server component.
 * @param {LiProps} props - The default list item server component properties
 * @returns The rendered default list item server component
 */
export const Li = ({
  as: Component = "li",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: LiProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedLiClient : LiClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest}>{children}</ClientComponent>
      </Suspense>
    );
  }

  return element;
};
Li.displayName = "Li";

const LinkClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.LinkClient };
});
const MemoizedLinkClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedLinkClient };
});

export type LinkRef = React.ElementRef<"link">;
export type LinkProps = React.ComponentPropsWithoutRef<"link"> &
  CommonComponentProps;

/**
 * Render the default external resource link server component.
 * @param {LinkProps} props - The default external resource link server component properties
 * @returns The rendered default external resource link server component
 */
export const Link = ({
  as: Component = "link",
  isClient = false,
  isMemoized = false,
  ...rest
}: LinkProps) => {
  const element = <Component {...rest} />;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedLinkClient : LinkClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest} />
      </Suspense>
    );
  }

  return element;
};
Link.displayName = "Link";

const MainClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MainClient };
});
const MemoizedMainClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedMainClient };
});

export type MainRef = React.ElementRef<"main">;
export type MainProps = React.ComponentPropsWithoutRef<"main"> &
  CommonComponentProps;

/**
 * Render the default main server component.
 * @param {MainProps} props - The default main server component properties
 * @returns The rendered default main server component
 */
export const Main = ({
  as: Component = "main",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: MainProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedMainClient : MainClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest}>{children}</ClientComponent>
      </Suspense>
    );
  }

  return element;
};
Main.displayName = "Main";

const MapClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MapClient };
});
const MemoizedMapClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedMapClient };
});

export type MapRef = React.ElementRef<"map">;
export type MapProps = React.ComponentPropsWithoutRef<"map"> &
  CommonComponentProps;

/**
 * Render the default image map server component.
 * @param {MapProps} props - The default image map server component properties
 * @returns The rendered default image map server component
 */
export const Map = ({
  as: Component = "map",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: MapProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedMapClient : MapClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest}>{children}</ClientComponent>
      </Suspense>
    );
  }

  return element;
};
Map.displayName = "Map";

const MarkClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MarkClient };
});
const MemoizedMarkClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedMarkClient };
});

export type MarkRef = React.ElementRef<"mark">;
export type MarkProps = React.ComponentPropsWithoutRef<"mark"> &
  CommonComponentProps;

/**
 * Render the default mark text server component.
 * @param {MarkProps} props - The default mark text server component properties
 * @returns The rendered default mark text server component
 */
export const Mark = ({
  as: Component = "mark",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: MarkProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedMarkClient : MarkClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest}>{children}</ClientComponent>
      </Suspense>
    );
  }

  return element;
};
Mark.displayName = "Mark";

const MenuClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MenuClient };
});
const MemoizedMenuClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedMenuClient };
});

export type MenuRef = React.ElementRef<"menu">;
export type MenuProps = React.ComponentPropsWithoutRef<"menu"> &
  CommonComponentProps;

/**
 * Render the default menu server component.
 * @param {MenuProps} props - The default menu server component properties
 * @returns The rendered default menu server component
 */
export const Menu = ({
  as: Component = "menu",
  isClient = false,
  isMemoized = false,
  children,
  ...rest
}: MenuProps) => {
  const element = <Component {...rest}>{children}</Component>;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedMenuClient : MenuClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest}>{children}</ClientComponent>
      </Suspense>
    );
  }

  return element;
};
Menu.displayName = "Menu";

const MetaClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MetaClient };
});
const MemoizedMetaClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MemoizedMetaClient };
});

export type MetaRef = React.ElementRef<"meta">;
export type MetaProps = React.ComponentPropsWithoutRef<"meta"> &
  CommonComponentProps;

/**
 * Render the default metadata server component.
 * @param {MetaProps} props - The default metadata server component properties
 * @returns The rendered default metadata server component
 */
export const Meta = ({
  as: Component = "meta",
  isClient = false,
  isMemoized = false,
  ...rest
}: MetaProps) => {
  const element = <Component {...rest} />;

  if (isClient) {
    const ClientComponent = isMemoized ? MemoizedMetaClient : MetaClient;

    return (
      <Suspense fallback={element}>
        <ClientComponent {...rest} />
      </Suspense>
    );
  }

  return element;
};
Meta.displayName = "Meta";

const MeterClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.MeterClient };
});

export type MeterRef = React.ElementRef<"meter">;
export type MeterProps = React.ComponentPropsWithoutRef<"meter"> &
  CommonComponentProps;

/**
 * Render the default HTML meter server component.
 * @param {MeterProps} props - The default HTML meter server component properties
 * @returns The rendered default HTML meter server component
 */
export const Meter = ({ isClient = false, children, ...rest }: MeterProps) => {
  const element = <meter {...rest}>{children}</meter>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <MeterClient {...rest}>{children}</MeterClient>
      </Suspense>
    );
  }

  return element;
};

Meter.displayName = "Meter";

const NavClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.NavClient };
});

export type NavRef = React.ElementRef<"nav">;
export type NavProps = React.ComponentPropsWithoutRef<"nav"> &
  CommonComponentProps;

/**
 * Render the default navigation section server component.
 * @param {NavProps} props - The default navigation section server component properties
 * @returns The rendered default navigation section server component
 */
export const Nav = ({ isClient = false, children, ...rest }: NavProps) => {
  const element = <nav {...rest}>{children}</nav>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <NavClient {...rest}>{children}</NavClient>
      </Suspense>
    );
  }

  return element;
};

Nav.displayName = "Nav";

const NoscriptClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.NoscriptClient };
});

export type NoscriptRef = React.ElementRef<"noscript">;
export type NoscriptProps = React.ComponentPropsWithoutRef<"noscript"> &
  CommonComponentProps;

/**
 * Render the default noscript server component.
 * @param {NoscriptProps} props - The default noscript server component properties
 * @returns The rendered default noscript server component
 */
export const Noscript = ({
  isClient = false,
  children,
  ...rest
}: NoscriptProps) => {
  const element = <noscript {...rest}>{children}</noscript>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <NoscriptClient {...rest}>{children}</NoscriptClient>
      </Suspense>
    );
  }

  return element;
};

Noscript.displayName = "Noscript";

const ObjectClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.ObjectClient };
});

export type ObjectRef = React.ElementRef<"object">;
export type ObjectProps = React.ComponentPropsWithoutRef<"object"> &
  CommonComponentProps;

/**
 * Render the default object server component.
 * @param {ObjectProps} props - The default object server component properties
 * @returns The rendered default object server component
 */
export const Object = ({
  isClient = false,
  children,
  ...rest
}: ObjectProps) => {
  const element = <object {...rest}>{children}</object>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <ObjectClient {...rest}>{children}</ObjectClient>
      </Suspense>
    );
  }

  return element;
};

Object.displayName = "Object";

const OlClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.OlClient };
});

export type OlRef = React.ElementRef<"ol">;
export type OlProps = React.ComponentPropsWithoutRef<"ol"> &
  CommonComponentProps;

/**
 * Render the default ordered list server component.
 * @param {OlProps} props - The default ordered list server component properties
 * @returns The rendered default ordered list server component
 */
export const Ol = ({ isClient = false, children, ...rest }: OlProps) => {
  const element = <ol {...rest}>{children}</ol>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <OlClient {...rest}>{children}</OlClient>
      </Suspense>
    );
  }

  return element;
};

Ol.displayName = "Ol";

const OptgroupClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.OptgroupClient };
});

export type OptgroupRef = React.ElementRef<"optgroup">;
export type OptgroupProps = React.ComponentPropsWithoutRef<"optgroup"> &
  CommonComponentProps;

/**
 * Render the default option group server component.
 * @param {OptgroupProps} props - The default option group server component properties
 * @returns The rendered default option group server component
 */
export const Optgroup = ({
  isClient = false,
  children,
  ...rest
}: OptgroupProps) => {
  const element = <optgroup {...rest}>{children}</optgroup>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <OptgroupClient {...rest}>{children}</OptgroupClient>
      </Suspense>
    );
  }

  return element;
};

Optgroup.displayName = "Optgroup";

const OptionClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.OptionClient };
});

export type OptionRef = React.ElementRef<"option">;
export type OptionProps = React.ComponentPropsWithoutRef<"option"> &
  CommonComponentProps;

/**
 * Render the default HTML option server component.
 * @param {OptionProps} props - The default HTML option server component properties
 * @returns The rendered default HTML option server component
 */
export const Option = ({
  isClient = false,
  children,
  ...rest
}: OptionProps) => {
  const element = <option {...rest}>{children}</option>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <OptionClient {...rest}>{children}</OptionClient>
      </Suspense>
    );
  }

  return element;
};

Option.displayName = "Option";

const OutputClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.OutputClient };
});

export type OutputRef = React.ElementRef<"output">;
export type OutputProps = React.ComponentPropsWithoutRef<"output"> &
  CommonComponentProps;

/**
 * Render the default output server component.
 * @param {OutputProps} props - The default output server component properties
 * @returns The rendered default output server component
 */
export const Output = ({
  isClient = false,
  children,
  ...rest
}: OutputProps) => {
  const element = <output {...rest}>{children}</output>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <OutputClient {...rest}>{children}</OutputClient>
      </Suspense>
    );
  }

  return element;
};

Output.displayName = "Output";

const ParagraphClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.ParagraphClient };
});

export type ParagraphRef = React.ElementRef<"p">;
export type ParagraphProps = React.ComponentPropsWithoutRef<"p"> &
  CommonComponentProps;

/**
 * Render the default paragraph server component.
 * @param {ParagraphProps} props - The default paragraph server component properties
 * @returns The rendered default paragraph server component
 */
export const Paragraph = ({
  isClient = false,
  children,
  ...rest
}: ParagraphProps) => {
  const element = <p {...rest}>{children}</p>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <ParagraphClient {...rest}>{children}</ParagraphClient>
      </Suspense>
    );
  }

  return element;
};

Paragraph.displayName = "Paragraph";

const PictureClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.PictureClient };
});

export type PictureRef = React.ElementRef<"picture">;
export type PictureProps = React.ComponentPropsWithoutRef<"picture"> &
  CommonComponentProps;

/**
 * Render the default picture server component.
 * @param {PictureProps} props - The default picture server component properties
 * @returns The rendered default picture server component
 */
export const Picture = ({
  isClient = false,
  children,
  ...rest
}: PictureProps) => {
  const element = <picture {...rest}>{children}</picture>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <PictureClient {...rest}>{children}</PictureClient>
      </Suspense>
    );
  }

  return element;
};

Picture.displayName = "Picture";

const PreClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.PreClient };
});

export type PreRef = React.ElementRef<"pre">;
export type PreProps = React.ComponentPropsWithoutRef<"pre"> &
  CommonComponentProps;

/**
 * Render the default preformatted text server component.
 * @param {PreProps} props - The default preformatted text server component properties
 * @returns The rendered default preformatted text server component
 */
export const Pre = ({ isClient = false, children, ...rest }: PreProps) => {
  const element = <pre {...rest}>{children}</pre>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <PreClient {...rest}>{children}</PreClient>
      </Suspense>
    );
  }

  return element;
};

Pre.displayName = "Pre";

const ProgressClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.ProgressClient };
});

export type ProgressRef = React.ElementRef<"progress">;
export type ProgressProps = React.ComponentPropsWithoutRef<"progress"> &
  CommonComponentProps;

/**
 * Render the default progress indicator server component.
 * @param {ProgressProps} props - The default progress indicator server component properties
 * @returns The rendered default progress indicator server component
 */
export const Progress = ({
  isClient = false,
  children,
  ...rest
}: ProgressProps) => {
  const element = <progress {...rest}>{children}</progress>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <ProgressClient {...rest}>{children}</ProgressClient>
      </Suspense>
    );
  }

  return element;
};

Progress.displayName = "Progress";

const QClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.QClient };
});

export type QRef = React.ElementRef<"q">;
export type QProps = React.ComponentPropsWithoutRef<"q"> & CommonComponentProps;

/**
 * Render the default inline quotation server component.
 * @param {QProps} props - The default inline quotation server component properties
 * @returns The rendered default inline quotation server component
 */
export const Q = ({ isClient = false, children, ...rest }: QProps) => {
  const element = <q {...rest}>{children}</q>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <QClient {...rest}>{children}</QClient>
      </Suspense>
    );
  }

  return element;
};

Q.displayName = "Q";

const RpClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.RpClient };
});

export type RpRef = React.ElementRef<"rp">;
export type RpProps = React.ComponentPropsWithoutRef<"rp"> &
  CommonComponentProps;

/**
 * Render the default ruby fallback parenthesis server component.
 * @param {RpProps} props - The default ruby fallback parenthesis server component properties
 * @returns The rendered default ruby fallback parenthesis server component
 */
export const Rp = ({ isClient = false, children, ...rest }: RpProps) => {
  const element = <rp {...rest}>{children}</rp>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <RpClient {...rest}>{children}</RpClient>
      </Suspense>
    );
  }

  return element;
};

Rp.displayName = "Rp";

const RtClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.RtClient };
});

export type RtRef = React.ElementRef<"rt">;
export type RtProps = React.ComponentPropsWithoutRef<"rt"> &
  CommonComponentProps;

/**
 * Render the default ruby text server component.
 * @param {RtProps} props - The default ruby text server component properties
 * @returns The rendered default ruby text server component
 */
export const Rt = ({ isClient = false, children, ...rest }: RtProps) => {
  const element = <rt {...rest}>{children}</rt>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <RtClient {...rest}>{children}</RtClient>
      </Suspense>
    );
  }

  return element;
};

Rt.displayName = "Rt";

const RubyClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.RubyClient };
});

export type RubyRef = React.ElementRef<"ruby">;
export type RubyProps = React.ComponentPropsWithoutRef<"ruby"> &
  CommonComponentProps;

/**
 * Render the default ruby annotation server component.
 * @param {RubyProps} props - The default ruby annotation server component properties
 * @returns The rendered default ruby annotation server component
 */
export const Ruby = ({ isClient = false, children, ...rest }: RubyProps) => {
  const element = <ruby {...rest}>{children}</ruby>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <RubyClient {...rest}>{children}</RubyClient>
      </Suspense>
    );
  }

  return element;
};

Ruby.displayName = "Ruby";

const SClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.SClient };
});

export type SRef = React.ElementRef<"s">;
export type SProps = React.ComponentPropsWithoutRef<"s"> & CommonComponentProps;

/**
 * Render the default strikethrough server component.
 * @param {SProps} props - The default strikethrough server component properties
 * @returns The rendered default strikethrough server component
 */
export const S = ({ isClient = false, children, ...rest }: SProps) => {
  const element = <s {...rest}>{children}</s>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <SClient {...rest}>{children}</SClient>
      </Suspense>
    );
  }

  return element;
};

S.displayName = "S";

const SampClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.SampClient };
});

export type SampRef = React.ElementRef<"samp">;
export type SampProps = React.ComponentPropsWithoutRef<"samp"> &
  CommonComponentProps;

/**
 * Render the default sample output server component.
 * @param {SampProps} props - The default sample output server component properties
 * @returns The rendered default sample output server component
 */
export const Samp = ({ isClient = false, children, ...rest }: SampProps) => {
  const element = <samp {...rest}>{children}</samp>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <SampClient {...rest}>{children}</SampClient>
      </Suspense>
    );
  }

  return element;
};

Samp.displayName = "Samp";

const ScriptClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.ScriptClient };
});

export type ScriptRef = React.ElementRef<"script">;
export type ScriptProps = React.ComponentPropsWithoutRef<"script"> &
  CommonComponentProps;

/**
 * Render the default script server component.
 * @param {ScriptProps} props - The default script server component properties
 * @returns The rendered default script server component
 */
export const Script = ({
  isClient = false,
  children,
  ...rest
}: ScriptProps) => {
  const element = <script {...rest}>{children}</script>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <ScriptClient {...rest}>{children}</ScriptClient>
      </Suspense>
    );
  }

  return element;
};

Script.displayName = "Script";

const SearchClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.SearchClient };
});

export type SearchRef = React.ElementRef<"search">;
export type SearchProps = React.ComponentPropsWithoutRef<"search"> &
  CommonComponentProps;

/**
 * Render the default generic search server component.
 * @param {SearchProps} props - The default generic search server component properties
 * @returns The rendered default generic search server component
 */
export const Search = ({
  isClient = false,
  children,
  ...rest
}: SearchProps) => {
  const element = <search {...rest}>{children}</search>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <SearchClient {...rest}>{children}</SearchClient>
      </Suspense>
    );
  }

  return element;
};

Search.displayName = "Search";

const SectionClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.SectionClient };
});

export type SectionRef = React.ElementRef<"section">;
export type SectionProps = React.ComponentPropsWithoutRef<"section"> &
  CommonComponentProps;

/**
 * Render the default generic section server component.
 * @param {SectionProps} props - The default generic section server component properties
 * @returns The rendered default generic section server component
 */
export const Section = ({
  isClient = false,
  children,
  ...rest
}: SectionProps) => {
  const element = <section {...rest}>{children}</section>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <SectionClient {...rest}>{children}</SectionClient>
      </Suspense>
    );
  }

  return element;
};

Section.displayName = "Section";

const SelectClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.SelectClient };
});

export type SelectRef = React.ElementRef<"select">;
export type SelectProps = React.ComponentPropsWithoutRef<"select"> &
  CommonComponentProps;

/**
 * Render the default HTML select server component.
 * @param {SelectProps} props - The default HTML select server component properties
 * @returns The rendered default HTML select server component
 */
export const Select = ({
  isClient = false,
  children,
  ...rest
}: SelectProps) => {
  const element = <select {...rest}>{children}</select>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <SelectClient {...rest}>{children}</SelectClient>
      </Suspense>
    );
  }

  return element;
};

Select.displayName = "Select";

const SlotClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.SlotClient };
});

export type SlotRef = React.ElementRef<"slot">;
export type SlotProps = React.ComponentPropsWithoutRef<"slot"> &
  CommonComponentProps;

/**
 * Render the default web component slot server component.
 * @param {SlotProps} props - The default web component slot server component properties
 * @returns The rendered default web component slot server component
 */
export const Slot = ({ isClient = false, children, ...rest }: SlotProps) => {
  const element = <slot {...rest}>{children}</slot>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <SlotClient {...rest}>{children}</SlotClient>
      </Suspense>
    );
  }

  return element;
};

Slot.displayName = "Slot";

const SmallClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.SmallClient };
});

export type SmallRef = React.ElementRef<"small">;
export type SmallProps = React.ComponentPropsWithoutRef<"small"> &
  CommonComponentProps;

/**
 * Render the default side comment server component.
 * @param {SmallProps} props - The default side comment server component properties
 * @returns The rendered default side comment server component
 */
export const Small = ({ isClient = false, children, ...rest }: SmallProps) => {
  const element = <small {...rest}>{children}</small>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <SmallClient {...rest}>{children}</SmallClient>
      </Suspense>
    );
  }

  return element;
};

Small.displayName = "Small";

const SourceClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.SourceClient };
});

export type SourceRef = React.ElementRef<"source">;
export type SourceProps = React.ComponentPropsWithoutRef<"source"> &
  CommonComponentProps;

/**
 * Render the default media or image source server component.
 * @param {SourceProps} props - The default media or image source server component properties
 * @returns The rendered default media or image source server component
 */
export const Source = ({ isClient = false, ...rest }: SourceProps) => {
  const element = <source {...rest} />;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <SourceClient {...rest} />
      </Suspense>
    );
  }

  return element;
};

Source.displayName = "Source";

const SpanClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.SpanClient };
});

export type SpanRef = React.ElementRef<"span">;
export type SpanProps = React.ComponentPropsWithoutRef<"span"> &
  CommonComponentProps;

/**
 * Render the default content span server component.
 * @param {SpanProps} props - The default content span server component properties
 * @returns The rendered default content span server component
 */
export const Span = ({ isClient = false, children, ...rest }: SpanProps) => {
  const element = <span {...rest}>{children}</span>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <SpanClient {...rest}>{children}</SpanClient>
      </Suspense>
    );
  }

  return element;
};

Span.displayName = "Span";

const StrongClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.StrongClient };
});

export type StrongRef = React.ElementRef<"strong">;
export type StrongProps = React.ComponentPropsWithoutRef<"strong"> &
  CommonComponentProps;

/**
 * Render the default strong importance server component.
 * @param {StrongProps} props - The default strong importance server component properties
 * @returns The rendered default strong importance server component
 */
export const Strong = ({
  isClient = false,
  children,
  ...rest
}: StrongProps) => {
  const element = <strong {...rest}>{children}</strong>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <StrongClient {...rest}>{children}</StrongClient>
      </Suspense>
    );
  }

  return element;
};

Strong.displayName = "Strong";

const StyleClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.StyleClient };
});

export type StyleRef = React.ElementRef<"style">;
export type StyleProps = React.ComponentPropsWithoutRef<"style"> &
  CommonComponentProps;

/**
 * Render the default style information server component.
 * @param {StyleProps} props - The default style information server component properties
 * @returns The rendered default style information server component
 */
export const Style = ({ isClient = false, children, ...rest }: StyleProps) => {
  const element = <style {...rest}>{children}</style>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <StyleClient {...rest}>{children}</StyleClient>
      </Suspense>
    );
  }

  return element;
};

Style.displayName = "Style";

const SubClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.SubClient };
});

export type SubRef = React.ElementRef<"sub">;
export type SubProps = React.ComponentPropsWithoutRef<"sub"> &
  CommonComponentProps;

/**
 * Render the default subscript server component.
 * @param {SubProps} props - The default subscript server component properties
 * @returns The rendered default subscript server component
 */
export const Sub = ({ isClient = false, children, ...rest }: SubProps) => {
  const element = <sub {...rest}>{children}</sub>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <SubClient {...rest}>{children}</SubClient>
      </Suspense>
    );
  }

  return element;
};

Sub.displayName = "Sub";

const SummaryClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.SummaryClient };
});

export type SummaryRef = React.ElementRef<"summary">;
export type SummaryProps = React.ComponentPropsWithoutRef<"summary"> &
  CommonComponentProps;

/**
 * Render the default disclosure summary server component.
 * @param {SummaryProps} props - The default disclosure summary server component properties
 * @returns The rendered default disclosure summary server component
 */
export const Summary = ({
  isClient = false,
  children,
  ...rest
}: SummaryProps) => {
  const element = <summary {...rest}>{children}</summary>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <SummaryClient {...rest}>{children}</SummaryClient>
      </Suspense>
    );
  }

  return element;
};

Summary.displayName = "Summary";

const SupClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.SupClient };
});

export type SupRef = React.ElementRef<"sup">;
export type SupProps = React.ComponentPropsWithoutRef<"sup"> &
  CommonComponentProps;

/**
 * Render the default superscript server component.
 * @param {SupProps} props - The default superscript server component properties
 * @returns The rendered default superscript server component
 */
export const Sup = ({ isClient = false, children, ...rest }: SupProps) => {
  const element = <sup {...rest}>{children}</sup>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <SupClient {...rest}>{children}</SupClient>
      </Suspense>
    );
  }

  return element;
};

Sup.displayName = "Sup";

const SvgClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.SvgClient };
});

export type SvgRef = React.ElementRef<"svg">;
export type SvgProps = React.ComponentPropsWithoutRef<"svg"> &
  CommonComponentProps;

/**
 * Render the default scalable vector graphics server component.
 * @param {SvgProps} props - The default scalable vector graphics server component properties
 * @returns The rendered default scalable vector graphics server component
 */
export const Svg = ({ isClient = false, children, ...rest }: SvgProps) => {
  const element = <svg {...rest}>{children}</svg>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <SvgClient {...rest}>{children}</SvgClient>
      </Suspense>
    );
  }

  return element;
};

Svg.displayName = "Svg";

const TableClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.TableClient };
});

export type TableRef = React.ElementRef<"table">;
export type TableProps = React.ComponentPropsWithoutRef<"table"> &
  CommonComponentProps;

/**
 * Render the default table server component.
 * @param {TableProps} props - The default table server component properties
 * @returns The rendered default table server component
 */
export const Table = ({ isClient = false, children, ...rest }: TableProps) => {
  const element = <table {...rest}>{children}</table>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <TableClient {...rest}>{children}</TableClient>
      </Suspense>
    );
  }

  return element;
};

Table.displayName = "Table";

const TbodyClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.TbodyClient };
});

export type TbodyRef = React.ElementRef<"tbody">;
export type TbodyProps = React.ComponentPropsWithoutRef<"tbody"> &
  CommonComponentProps;

/**
 * Render the default table body server component.
 * @param {TbodyProps} props - The default table body server component properties
 * @returns The rendered default table body server component
 */
export const Tbody = ({ isClient = false, children, ...rest }: TbodyProps) => {
  const element = <tbody {...rest}>{children}</tbody>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <TbodyClient {...rest}>{children}</TbodyClient>
      </Suspense>
    );
  }

  return element;
};

Tbody.displayName = "Tbody";

const TdClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.TdClient };
});

export type TdRef = React.ElementRef<"td">;
export type TdProps = React.ComponentPropsWithoutRef<"td"> &
  CommonComponentProps;

/**
 * Render the default table data cell server component.
 * @param {TdProps} props - The default table data cell server component properties
 * @returns The rendered default table data cell server component
 */
export const Td = ({ isClient = false, children, ...rest }: TdProps) => {
  const element = <td {...rest}>{children}</td>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <TdClient {...rest}>{children}</TdClient>
      </Suspense>
    );
  }

  return element;
};

Td.displayName = "Td";

const TemplateClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.TemplateClient };
});

export type TemplateRef = React.ElementRef<"template">;
export type TemplateProps = React.ComponentPropsWithoutRef<"template"> &
  CommonComponentProps;

/**
 * Render the default content template server component.
 * @param {TemplateProps} props - The default content template server component properties
 * @returns The rendered default content template server component
 */
export const Template = ({
  isClient = false,
  children,
  ...rest
}: TemplateProps) => {
  const element = <template {...rest}>{children}</template>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <TemplateClient {...rest}>{children}</TemplateClient>
      </Suspense>
    );
  }

  return element;
};

Template.displayName = "Template";

const TextareaClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.TextareaClient };
});

export type TextareaRef = React.ElementRef<"textarea">;
export type TextareaProps = React.ComponentPropsWithoutRef<"textarea"> &
  CommonComponentProps;

/**
 * Render the default textarea server component.
 * @param {TextareaProps} props - The default textarea server component properties
 * @returns The rendered default textarea server component
 */
export const Textarea = ({
  isClient = false,
  children,
  ...rest
}: TextareaProps) => {
  const element = <textarea {...rest}>{children}</textarea>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <TextareaClient {...rest}>{children}</TextareaClient>
      </Suspense>
    );
  }

  return element;
};

Textarea.displayName = "Textarea";

const TfootClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.TfootClient };
});

export type TfootRef = React.ElementRef<"tfoot">;
export type TfootProps = React.ComponentPropsWithoutRef<"tfoot"> &
  CommonComponentProps;

/**
 * Render the default table foot server component.
 * @param {TfootProps} props - The default table foot server component properties
 * @returns The rendered default table foot server component
 */
export const Tfoot = ({ isClient = false, children, ...rest }: TfootProps) => {
  const element = <tfoot {...rest}>{children}</tfoot>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <TfootClient {...rest}>{children}</TfootClient>
      </Suspense>
    );
  }

  return element;
};

Tfoot.displayName = "Tfoot";

const ThClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.ThClient };
});

export type ThRef = React.ElementRef<"th">;
export type ThProps = React.ComponentPropsWithoutRef<"th"> &
  CommonComponentProps;

/**
 * Render the default table header server component.
 * @param {ThProps} props - The default table header server component properties
 * @returns The rendered default table header server component
 */
export const Th = ({ isClient = false, children, ...rest }: ThProps) => {
  const element = <th {...rest}>{children}</th>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <ThClient {...rest}>{children}</ThClient>
      </Suspense>
    );
  }

  return element;
};

Th.displayName = "Th";

const TheadClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.TheadClient };
});

export type TheadRef = React.ElementRef<"thead">;
export type TheadProps = React.ComponentPropsWithoutRef<"thead"> &
  CommonComponentProps;

/**
 * Render the default table head server component.
 * @param {TheadProps} props - The default table head server component properties
 * @returns The rendered default table head server component
 */
export const Thead = ({ isClient = false, children, ...rest }: TheadProps) => {
  const element = <thead {...rest}>{children}</thead>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <TheadClient {...rest}>{children}</TheadClient>
      </Suspense>
    );
  }

  return element;
};

Thead.displayName = "Thead";

const TimeClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.TimeClient };
});

export type TimeRef = React.ElementRef<"time">;
export type TimeProps = React.ComponentPropsWithoutRef<"time"> &
  CommonComponentProps;

/**
 * Render the default (date) time server component.
 * @param {TimeProps} props - The default (date) time server component properties
 * @returns The rendered default (date) time server component
 */
export const Time = ({ isClient = false, children, ...rest }: TimeProps) => {
  const element = <time {...rest}>{children}</time>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <TimeClient {...rest}>{children}</TimeClient>
      </Suspense>
    );
  }

  return element;
};

Time.displayName = "Time";

const TitleClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.TitleClient };
});

export type TitleRef = React.ElementRef<"title">;
export type TitleProps = React.ComponentPropsWithoutRef<"title"> &
  CommonComponentProps;

/**
 * Render the default document title server component.
 * @param {TitleProps} props - The default document title server component properties
 * @returns The rendered default document title server component
 */
export const Title = ({ isClient = false, children, ...rest }: TitleProps) => {
  const element = <title {...rest}>{children}</title>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <TitleClient {...rest}>{children}</TitleClient>
      </Suspense>
    );
  }

  return element;
};

Title.displayName = "Title";

const TrClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.TrClient };
});

export type TrRef = React.ElementRef<"tr">;
export type TrProps = React.ComponentPropsWithoutRef<"tr"> &
  CommonComponentProps;

/**
 * Render the default table row server component.
 * @param {TrProps} props - The default table row server component properties
 * @returns The rendered default table row server component
 */
export const Tr = ({ isClient = false, children, ...rest }: TrProps) => {
  const element = <tr {...rest}>{children}</tr>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <TrClient {...rest}>{children}</TrClient>
      </Suspense>
    );
  }

  return element;
};

Tr.displayName = "Tr";

const TrackClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.TrackClient };
});

export type TrackRef = React.ElementRef<"track">;
export type TrackProps = React.ComponentPropsWithoutRef<"track"> &
  CommonComponentProps;

/**
 * Render the default embed text track server component.
 * @param {TrackProps} props - The default embed text track server component properties
 * @returns The rendered default embed text track server component
 */
export const Track = ({ isClient = false, ...rest }: TrackProps) => {
  const element = <track {...rest} />;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <TrackClient {...rest} />
      </Suspense>
    );
  }

  return element;
};

Track.displayName = "Track";

const UClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.UClient };
});

export type URef = React.ElementRef<"u">;
export type UProps = React.ComponentPropsWithoutRef<"u"> & CommonComponentProps;

/**
 * Render the default unarticulated annotation (underline) server component.
 * @param {UProps} props - The default unarticulated annotation (underline) server component properties
 * @returns The rendered default unarticulated annotation (underline) server component
 */
export const U = ({ isClient = false, children, ...rest }: UProps) => {
  const element = <u {...rest}>{children}</u>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <UClient {...rest} />
      </Suspense>
    );
  }

  return element;
};

U.displayName = "U";

const UlClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.UlClient };
});

export type UlRef = React.ElementRef<"ul">;
export type UlProps = React.ComponentPropsWithoutRef<"ul"> &
  CommonComponentProps;

/**
 * Render the default unordered list server component.
 * @param {UlProps} props - The default unordered list server component properties
 * @returns The rendered default unordered list server component
 */
export const Ul = ({ isClient = false, children, ...rest }: UlProps) => {
  const element = <ul {...rest}>{children}</ul>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <UlClient {...rest}>{children}</UlClient>
      </Suspense>
    );
  }

  return element;
};

Ul.displayName = "Ul";

const VarClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.VarClient };
});

export type VarRef = React.ElementRef<"var">;
export type VarProps = React.ComponentPropsWithoutRef<"var"> &
  CommonComponentProps;

/**
 * Render the default variable server component.
 * @param {VarProps} props - The default variable server component properties
 * @returns The rendered default variable server component
 */
export const Var = ({ isClient = false, children, ...rest }: VarProps) => {
  const element = <var {...rest}>{children}</var>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <VarClient {...rest}>{children}</VarClient>
      </Suspense>
    );
  }

  return element;
};

Var.displayName = "Var";

const VideoClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.VideoClient };
});

export type VideoRef = React.ElementRef<"video">;
export type VideoProps = React.ComponentPropsWithoutRef<"video"> &
  CommonComponentProps;

/**
 * Render the default video embed server component.
 * @param {VideoProps} props - The default video embed server component properties
 * @returns The rendered default video embed server component
 */
export const Video = ({ isClient = false, children, ...rest }: VideoProps) => {
  const element = <video {...rest}>{children}</video>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <VideoClient {...rest}>{children}</VideoClient>
      </Suspense>
    );
  }

  return element;
};

Video.displayName = "Video";

const WbrClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.WbrClient };
});

export type WbrRef = React.ElementRef<"wbr">;
export type WbrProps = React.ComponentPropsWithoutRef<"wbr"> &
  CommonComponentProps;

/**
 * Render the default line break opportunity server component.
 * @param {WbrProps} props - The default line break opportunity server component properties
 * @returns The rendered default line break opportunity server component
 */
export const Wbr = ({ isClient = false, ...rest }: WbrProps) => {
  const element = <wbr {...rest} />;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <WbrClient {...rest} />
      </Suspense>
    );
  }

  return element;
};

Wbr.displayName = "Wbr";
