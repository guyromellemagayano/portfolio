import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  type ElementType,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";

export type PrimitiveElement = ElementType | string;
export type VoidPrimitiveElement =
  | "area"
  | "base"
  | "br"
  | "col"
  | "embed"
  | "hr"
  | "img"
  | "input"
  | "link"
  | "meta"
  | "source"
  | "track"
  | "wbr";

type PropsOf<TElement extends PrimitiveElement> = TElement extends ElementType
  ? ComponentPropsWithoutRef<TElement>
  : Record<string, unknown>;

type PrimitiveChildren<TElement extends PrimitiveElement> =
  TElement extends VoidPrimitiveElement
    ? { children?: never }
    : { children?: ReactNode };

interface ComponentDataAttributes {
  /** Stable component identifier for styling, instrumentation, and tests. */
  "data-component"?: string;
  /** Stable component slot identifier. Defaults to root. */
  "data-slot"?: string;
}

export type ComponentAnalyticsValue = boolean | number | string;

export type ComponentAnalyticsAttributes = {
  event?: string;
  label?: string;
  placement?: string;
  target?: string;
  value?: ComponentAnalyticsValue;
} & Record<string, ComponentAnalyticsValue | null | undefined>;

/** Props shared by every component in this package. */
export interface CommonComponentProps extends ComponentDataAttributes {
  /** Optional instrumentation metadata rendered as stable data attributes. */
  analytics?: ComponentAnalyticsAttributes;
  /** Render the component with a different React element or component. */
  as?: PrimitiveElement;
}

export type PrimitiveProps<
  TDefaultElement extends PrimitiveElement,
  TAs extends PrimitiveElement = TDefaultElement,
> = Omit<PropsOf<TDefaultElement>, "as" | "children"> &
  Omit<PropsOf<TAs>, "as" | "children"> &
  CommonComponentProps & {
    as?: TAs;
  } & PrimitiveChildren<TAs>;

export type PrimitiveRef<TElement extends PrimitiveElement> =
  TElement extends ElementType ? ComponentRef<TElement> : Element;

export interface HtmlPrimitiveComponent<
  TDefaultElement extends PrimitiveElement,
> {
  <TAs extends PrimitiveElement = TDefaultElement>(
    props: PrimitiveProps<TDefaultElement, TAs> & {
      ref?: Ref<PrimitiveRef<TDefaultElement> | PrimitiveRef<TAs>>;
    }
  ): ReactElement | null;
  displayName?: string;
}
