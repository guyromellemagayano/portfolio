import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "./components";

// Dynamically import the client component
const AClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.AClient };
});

export type ARef = React.ElementRef<"a">;
export type AProps = React.ComponentPropsWithoutRef<"a"> & CommonComponentProps;

/**
 * Render the default anchor server component.
 * @param {AProps} props - The default anchor server component properties
 * @returns The rendered default anchor server component
 */
export const A = ({
  href = "#",
  isClient = false,
  children,
  ...rest
}: AProps) => {
  const element = (
    <a href={href} {...rest}>
      {children}
    </a>
  );

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <AClient {...rest}>{children}</AClient>
      </Suspense>
    );
  }

  return element;
};

A.displayName = "A";

// Dynamically import the client component
const AbbrClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.AbbrClient };
});

export type AbbrRef = React.ElementRef<"abbr">;
export type AbbrProps = React.ComponentPropsWithoutRef<"abbr"> &
  CommonComponentProps;

/**
 * Render the default abbreviation server component.
 * @param {AbbrProps} props - The default abbreviation server component properties
 * @returns The rendered default abbreviation server component
 */
export const Abbr = ({ isClient = false, children, ...rest }: AbbrProps) => {
  const element = <abbr {...rest}>{children}</abbr>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <AbbrClient {...rest}>{children}</AbbrClient>
      </Suspense>
    );
  }

  return element;
};

Abbr.displayName = "Abbr";

// Dynamically import the client component
const AddressClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.AddressClient };
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
  isClient = false,
  children,
  ...rest
}: AddressProps) => {
  const element = <address {...rest}>{children}</address>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <AddressClient {...rest}>{children}</AddressClient>
      </Suspense>
    );
  }

  return element;
};

Address.displayName = "Address";

// Dynamically import the client component
const AreaClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.AreaClient };
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
  alt = "",
  isClient = false,
  children,
  ...rest
}: AreaProps) => {
  const element = (
    <area alt={alt} {...rest}>
      {children}
    </area>
  );

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <AreaClient alt={alt} {...rest}>
          {children}
        </AreaClient>
      </Suspense>
    );
  }

  return element;
};

Area.displayName = "Area";

// Dynamically import the client component
const ArticleClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.ArticleClient };
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
  isClient = false,
  children,
  ...rest
}: ArticleProps) => {
  const element = <article {...rest}>{children}</article>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <ArticleClient {...rest}>{children} </ArticleClient>
      </Suspense>
    );
  }

  return element;
};

Article.displayName = "Article";

// Dynamically import the client component
const AsideClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.AsideClient };
});

export type AsideRef = React.ElementRef<"aside">;
export type AsideProps = React.ComponentPropsWithoutRef<"aside"> &
  CommonComponentProps;

/**
 * Render the default aside server component.
 * @param {AsideProps} props - The default aside server component properties
 * @returns The rendered default aside server component
 */
export const Aside = ({ isClient = false, children, ...rest }: AsideProps) => {
  const element = <aside {...rest}>{children}</aside>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <AsideClient {...rest}>{children} </AsideClient>
      </Suspense>
    );
  }

  return element;
};

Aside.displayName = "Aside";

// Dynamically import the client component
const BClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.BClient };
});

export type BRef = React.ElementRef<"b">;
export type BProps = React.ComponentPropsWithoutRef<"b"> & CommonComponentProps;

/**
 * Render the default bring attention to server component.
 * @param {BProps} props - The default bring attention to server component properties
 * @returns The rendered default bring attention to server component
 */
export const B = ({ isClient = false, children, ...rest }: BProps) => {
  const element = <b {...rest}>{children}</b>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <BClient {...rest}>{children}</BClient>
      </Suspense>
    );
  }

  return element;
};

B.displayName = "B";

// Dynamically import the client component
const AudioClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.AudioClient };
});

export type AudioRef = React.ElementRef<"audio">;
export type AudioProps = React.ComponentPropsWithoutRef<"audio"> &
  CommonComponentProps;

/**
 * Render the default audio server component.
 * @param {AudioProps} props - The default audio server component properties
 * @returns The rendered default audio server component
 */
export const Audio = ({ isClient = false, children, ...rest }: AudioProps) => {
  const element = <audio {...rest}>{children}</audio>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <AudioClient {...rest}>{children} </AudioClient>
      </Suspense>
    );
  }

  return element;
};

Audio.displayName = "Audio";

// Dynamically import the client component
const BaseClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.BaseClient };
});

export type BaseRef = React.ElementRef<"base">;
export type BaseProps = React.ComponentPropsWithoutRef<"base"> &
  CommonComponentProps;

/**
 * Render the default base server component.
 * @param {BaseProps} props - The default base server component properties
 * @returns The rendered default base server component
 */
export const Base = ({ isClient = false, children, ...rest }: BaseProps) => {
  const element = <base {...rest}>{children}</base>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <BaseClient {...rest}>{children} </BaseClient>
      </Suspense>
    );
  }

  return element;
};

Base.displayName = "Base";

// Dynamically import the client component
const BdiClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.BdiClient };
});

export type BdiRef = React.ElementRef<"bdi">;
export type BdiProps = React.ComponentPropsWithoutRef<"bdi"> &
  CommonComponentProps;

/**
 * Render the default bidirectional isolate server component.
 * @param {BdiProps} props - The default bidirectional isolate server component properties
 * @returns The rendered default bidirectional isolate server component
 */
export const Bdi = ({ isClient = false, children, ...rest }: BdiProps) => {
  const element = <bdi {...rest}>{children}</bdi>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <BdiClient {...rest}>{children}</BdiClient>
      </Suspense>
    );
  }

  return element;
};

Bdi.displayName = "Bdi";

// Dynamically import the client component
const BdoClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.BdoClient };
});

export type BdoRef = React.ElementRef<"bdo">;
export type BdoProps = React.ComponentPropsWithoutRef<"bdo"> &
  CommonComponentProps;

/**
 * Render the default bidirectional text override server component.
 * @param {BdoProps} props - The default bidirectional text override server component properties
 * @returns The rendered default bidirectional text override server component
 */
export const Bdo = ({ isClient = false, children, ...rest }: BdoProps) => {
  const element = <bdo {...rest}>{children}</bdo>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <BdoClient {...rest}>{children}</BdoClient>
      </Suspense>
    );
  }

  return element;
};

Bdo.displayName = "Bdo";

// Dynamically import the client component
const BlockquoteClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.BlockquoteClient };
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
  isClient = false,
  children,
  ...rest
}: BlockquoteProps) => {
  const element = <blockquote {...rest}>{children}</blockquote>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <BlockquoteClient {...rest}>{children} </BlockquoteClient>
      </Suspense>
    );
  }

  return element;
};

Blockquote.displayName = "Blockquote";

// Dynamically import the client component
const BodyClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.BodyClient };
});

export type BodyRef = React.ElementRef<"body">;
export type BodyProps = React.ComponentPropsWithoutRef<"body"> &
  CommonComponentProps;

/**
 * Render the default document body server component.
 * @param {BodyProps} props - The default document body server component properties
 * @returns The rendered default document body server component
 */
export const Body = ({ isClient = false, children, ...rest }: BodyProps) => {
  const element = <body {...rest}>{children}</body>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <BodyClient {...rest}>{children}</BodyClient>
      </Suspense>
    );
  }

  return element;
};

Body.displayName = "Body";

// Dynamically import the client component
const BrClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.BrClient };
});

export type BrRef = React.ElementRef<"br">;
export type BrProps = React.ComponentPropsWithoutRef<"br"> &
  CommonComponentProps;

/**
 * Render the default line break server component.
 * @param {BrProps} props - The default line break server component properties
 * @returns The rendered default line break server component
 */
export const Br = ({ isClient = false, ...rest }: BrProps) => {
  const element = <br {...rest} />;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <BrClient {...rest} />
      </Suspense>
    );
  }

  return element;
};

Br.displayName = "Br";

// Dynamically import the client component
const ButtonClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.ButtonClient };
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
  type = "button",
  isClient = false,
  children,
  ...rest
}: ButtonProps) => {
  const element = (
    <button type={type} {...rest} disabled>
      {children}
    </button>
  );

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <ButtonClient type={type} {...rest}>
          {children}
        </ButtonClient>
      </Suspense>
    );
  }

  return element;
};

Button.displayName = "Button";

// Dynamically import the client component
const CanvasClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.CanvasClient };
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
  isClient = false,
  children,
  ...rest
}: CanvasProps) => {
  const element = <canvas {...rest}>{children}</canvas>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <CanvasClient {...rest}>{children} </CanvasClient>
      </Suspense>
    );
  }

  return element;
};

Canvas.displayName = "Canvas";

// Dynamically import the client component
const CaptionClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.CaptionClient };
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
  isClient = false,
  children,
  ...rest
}: CaptionProps) => {
  const element = <caption {...rest}>{children}</caption>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <CaptionClient {...rest}>{children}</CaptionClient>
      </Suspense>
    );
  }

  return element;
};

Caption.displayName = "Caption";

// Dynamically import the client component
const CiteClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.CiteClient };
});

export type CiteRef = React.ElementRef<"cite">;
export type CiteProps = React.ComponentPropsWithoutRef<"cite"> &
  CommonComponentProps;

/**
 * Render the default cite server component.
 * @param {CiteProps} props - The default cite server component properties
 * @returns The rendered default cite server component
 */
export const Cite = ({ isClient = false, children, ...rest }: CiteProps) => {
  const element = <cite {...rest}>{children}</cite>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <CiteClient {...rest}>{children}</CiteClient>
      </Suspense>
    );
  }

  return element;
};

Cite.displayName = "Cite";

// Dynamically import the client component
const CodeClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.CodeClient };
});

export type CodeRef = React.ElementRef<"code">;
export type CodeProps = React.ComponentPropsWithoutRef<"code"> &
  CommonComponentProps;

/**
 * Render the default code server component.
 * @param {CodeProps} props - The default code server component properties
 * @returns The rendered default code server component
 */
export const Code = ({ isClient = false, children, ...rest }: CodeProps) => {
  const element = <code {...rest}>{children}</code>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <CodeClient {...rest}>{children}</CodeClient>
      </Suspense>
    );
  }

  return element;
};

Code.displayName = "Code";

// Dynamically import the client component
const ColClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.ColClient };
});

export type ColRef = React.ElementRef<"col">;
export type ColProps = React.ComponentPropsWithoutRef<"col"> &
  CommonComponentProps;

/**
 * Render the default column server component.
 * @param {ColProps} props - The default column server component properties
 * @returns The rendered default column server component
 */
export const Col = ({ isClient = false, ...rest }: ColProps) => {
  const element = <col {...rest} />;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <ColClient {...rest} />
      </Suspense>
    );
  }

  return element;
};

Col.displayName = "Col";

// Dynamically import the client component
const ColgroupClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.ColgroupClient };
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
  isClient = false,
  children,
  ...rest
}: ColgroupProps) => {
  const element = <colgroup {...rest}>{children}</colgroup>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <ColgroupClient {...rest}>{children}</ColgroupClient>
      </Suspense>
    );
  }

  return element;
};

Colgroup.displayName = "Colgroup";

// Dynamically import the client component
const DataClient = lazy(async () => {
  const module = await import("./index.client");
  return { default: module.DataClient };
});

export type DataRef = React.ElementRef<"data">;
export type DataProps = React.ComponentPropsWithoutRef<"data"> &
  CommonComponentProps;

/**
 * Render the default data server component.
 * @param {DataProps} props - The default data server component properties
 * @returns The rendered default data server component
 */
export const Data = ({ isClient = false, children, ...rest }: DataProps) => {
  const element = <data {...rest}>{children}</data>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <DataClient {...rest}>{children}</DataClient>
      </Suspense>
    );
  }

  return element;
};

Data.displayName = "Data";
