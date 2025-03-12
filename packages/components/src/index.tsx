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
