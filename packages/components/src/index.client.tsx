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
  BProps,
  BRef,
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
