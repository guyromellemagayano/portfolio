import React from "react";

import { Check, Copy } from "lucide-react";

import {
  Button as ButtonPrimitive,
  type ButtonProps as ButtonPrimitiveProps,
  type ButtonRef,
  Code,
  type CodeProps,
  type CodeRef,
  Div,
  type DivProps,
  type DivRef,
  Pre,
  type PreProps,
  type PreRef,
  Span,
  type SpanProps,
  type SpanRef,
} from "@portfolio/components";

import { buttonVariants } from "../button";
import { cn, getDataSlot } from "../utils";

export type InlineCodeProps = CodeProps;

export const InlineCode = React.forwardRef<CodeRef, InlineCodeProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <Code
        ref={ref}
        {...rest}
        className={cn(
          "bg-muted text-foreground rounded px-1.5 py-0.5 font-mono text-[0.875em]",
          className
        )}
        data-slot={getDataSlot(props, "inline-code")}
      />
    );
  }
);

InlineCode.displayName = "InlineCode";

export type CopyButtonProps = Omit<
  ButtonPrimitiveProps,
  "children" | "onClick"
> & {
  copiedDuration?: number;
  copiedLabel?: string;
  copyLabel?: string;
  onCopied?: (text: string) => void;
  text: string;
};

export const CopyButton = React.forwardRef<ButtonRef, CopyButtonProps>(
  (props, ref) => {
    const {
      "aria-label": ariaLabel,
      className,
      copiedDuration = 1500,
      copiedLabel = "Copied",
      copyLabel = "Copy",
      onCopied,
      text,
      type = "button",
      ...rest
    } = props;
    const [copied, setCopied] = React.useState(false);

    async function handleClick() {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      onCopied?.(text);

      window.setTimeout(() => {
        setCopied(false);
      }, copiedDuration);
    }

    return (
      <ButtonPrimitive
        ref={ref}
        aria-label={ariaLabel ?? copyLabel}
        className={cn(
          buttonVariants({ size: "icon", variant: "ghost" }),
          "h-8 w-8",
          className
        )}
        data-copied={copied ? "" : undefined}
        data-slot={getDataSlot(props, "copy-button")}
        onClick={handleClick}
        type={type}
        {...rest}
      >
        {copied ? (
          <Check aria-hidden="true" className="h-4 w-4" />
        ) : (
          <Copy aria-hidden="true" className="h-4 w-4" />
        )}
        <Span className="sr-only" data-slot="copy-button-status">
          {copied ? copiedLabel : copyLabel}
        </Span>
      </ButtonPrimitive>
    );
  }
);

CopyButton.displayName = "CopyButton";

export type CodeBlockHeaderProps = DivProps;
export type CodeBlockLanguageProps = SpanProps;
export type CodeBlockPreProps = PreProps;

export type CodeBlockProps = Omit<PreProps, "children"> & {
  actions?: React.ReactNode;
  code: string;
  codeProps?: CodeProps;
  copyButtonProps?: Omit<CopyButtonProps, "text">;
  headerProps?: CodeBlockHeaderProps;
  language?: string;
  languageProps?: CodeBlockLanguageProps;
  preProps?: CodeBlockPreProps;
  showCopy?: boolean;
};

export const CodeBlock = React.forwardRef<PreRef, CodeBlockProps>(
  (props, ref) => {
    const {
      actions,
      className,
      code,
      codeProps,
      copyButtonProps,
      headerProps,
      language,
      languageProps,
      preProps,
      showCopy = true,
      ...rest
    } = props;
    const hasHeader = Boolean(language) || Boolean(actions) || showCopy;

    return (
      <Div
        className="bg-muted overflow-hidden rounded-lg border"
        data-slot={getDataSlot(props, "code-block")}
      >
        {hasHeader ? (
          <CodeBlockHeader {...headerProps}>
            {language ? (
              <CodeBlockLanguage {...languageProps}>
                {language}
              </CodeBlockLanguage>
            ) : (
              <span aria-hidden="true" />
            )}
            <Div className="flex items-center gap-1" data-slot="code-actions">
              {actions}
              {showCopy ? (
                <CopyButton
                  copyLabel="Copy code"
                  {...copyButtonProps}
                  text={code}
                />
              ) : null}
            </Div>
          </CodeBlockHeader>
        ) : null}
        <Pre
          ref={ref}
          {...rest}
          {...preProps}
          className={cn(
            "overflow-x-auto p-4 text-sm",
            className,
            preProps?.className
          )}
          data-slot={getDataSlot(preProps ?? {}, "code-block-pre")}
        >
          <Code
            {...codeProps}
            className={cn("font-mono", codeProps?.className)}
            data-slot={getDataSlot(codeProps ?? {}, "code-block-code")}
          >
            {code}
          </Code>
        </Pre>
      </Div>
    );
  }
);

CodeBlock.displayName = "CodeBlock";

export const CodeBlockHeader = React.forwardRef<DivRef, CodeBlockHeaderProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <Div
        ref={ref}
        {...rest}
        className={cn(
          "bg-background flex items-center justify-between gap-3 border-b px-3 py-2",
          className
        )}
        data-slot={getDataSlot(props, "code-block-header")}
      />
    );
  }
);

CodeBlockHeader.displayName = "CodeBlockHeader";

export const CodeBlockLanguage = React.forwardRef<
  SpanRef,
  CodeBlockLanguageProps
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <Span
      ref={ref}
      {...rest}
      className={cn(
        "text-muted-foreground font-mono text-xs font-medium uppercase",
        className
      )}
      data-slot={getDataSlot(props, "code-block-language")}
    />
  );
});

CodeBlockLanguage.displayName = "CodeBlockLanguage";
