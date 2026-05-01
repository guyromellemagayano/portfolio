import React, { type ReactNode, useId } from "react";

import { Div, type DivProps } from "../div";
import { Heading, type HeadingProps } from "../heading";
import { P, type PProps } from "../p";
import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type SectionRef = PrimitiveRef<"section">;
export type SectionHeaderProps = Omit<DivProps, "children">;
export type SectionHeadingProps = Omit<HeadingProps, "children">;
export type SectionDescriptionProps = Omit<PProps, "children">;

export type SectionProps<TAs extends PrimitiveElement = "section"> =
  PrimitiveProps<"section", TAs> & {
    description?: ReactNode;
    descriptionId?: string;
    descriptionProps?: SectionDescriptionProps;
    heading?: ReactNode;
    headingAs?: PrimitiveElement;
    headingId?: string;
    headingProps?: SectionHeadingProps;
    headerProps?: SectionHeaderProps;
  };

const SectionRoot = createHtmlPrimitive("Section", "section");

function hasRenderableContent(value: ReactNode) {
  return value !== null && value !== undefined && value !== false;
}

function getIdTokens(value: string | undefined) {
  return value?.split(/\s+/u).filter(Boolean) ?? [];
}

function mergeIdRefs(...values: Array<string | undefined>) {
  const tokens = new Set<string>();

  for (const value of values) {
    for (const token of getIdTokens(value)) {
      tokens.add(token);
    }
  }

  return tokens.size > 0 ? Array.from(tokens).join(" ") : undefined;
}

/** Render the native <section> HTML element. */
export const Section = React.forwardRef<SectionRef, SectionProps>(
  (props, ref) => {
    const {
      children,
      description,
      descriptionId,
      descriptionProps,
      heading,
      headingAs = "h2",
      headingId,
      headingProps,
      headerProps,
      id,
      ...rest
    } = props;
    const reactId = useId();
    const idBase = id ?? `section-${reactId}`;
    const hasHeading = hasRenderableContent(heading);
    const hasDescription = hasRenderableContent(description);
    const resolvedHeadingId =
      headingProps?.id ?? headingId ?? `${idBase}-heading`;
    const resolvedDescriptionId =
      descriptionProps?.id ?? descriptionId ?? `${idBase}-description`;
    const ariaLabelledBy =
      rest["aria-labelledby"] ??
      (!rest["aria-label"] && hasHeading ? resolvedHeadingId : undefined);
    const ariaDescribedBy = mergeIdRefs(
      rest["aria-describedby"],
      hasDescription ? resolvedDescriptionId : undefined
    );

    return (
      <SectionRoot
        ref={ref}
        {...rest}
        aria-describedby={ariaDescribedBy}
        aria-labelledby={ariaLabelledBy}
        id={id}
      >
        {hasHeading || hasDescription ? (
          <Div
            {...headerProps}
            data-slot={headerProps?.["data-slot"] ?? "section-header"}
          >
            {hasHeading ? (
              <Heading
                as={headingAs}
                {...headingProps}
                data-slot={headingProps?.["data-slot"] ?? "section-heading"}
                id={resolvedHeadingId}
              >
                {heading}
              </Heading>
            ) : null}
            {hasDescription ? (
              <P
                {...descriptionProps}
                data-slot={
                  descriptionProps?.["data-slot"] ?? "section-description"
                }
                id={resolvedDescriptionId}
              >
                {description}
              </P>
            ) : null}
          </Div>
        ) : null}
        {children}
      </SectionRoot>
    );
  }
);

Section.displayName = "Section";
