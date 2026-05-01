import { type AriaAttributes, createContext, use } from "react";

export interface FieldContextValue {
  controlId: string;
  descriptionId: string;
  errorId: string;
  invalid?: boolean;
  required?: boolean;
}

export interface FieldControlProps {
  "aria-describedby"?: string;
  "aria-invalid"?: AriaAttributes["aria-invalid"];
  "aria-required"?: AriaAttributes["aria-required"];
  "data-invalid"?: string;
  "data-required"?: string;
  id?: string;
  required?: boolean;
}

export interface FieldControlOptions {
  includeDescription?: boolean;
  includeError?: boolean;
  nativeRequired?: boolean;
}

export const FieldContext = createContext<FieldContextValue | null>(null);

export function useFieldContext() {
  return use(FieldContext);
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

export function getFieldControlProps<TProps extends FieldControlProps>(
  props: TProps,
  field: FieldContextValue | null,
  options: FieldControlOptions = {}
) {
  if (!field) {
    return props;
  }

  const includeDescription = options.includeDescription ?? true;
  const includeError = options.includeError ?? true;
  const nativeRequired = options.nativeRequired ?? true;
  const describedBy = mergeIdRefs(
    props["aria-describedby"],
    includeDescription ? field.descriptionId : undefined,
    includeError && field.invalid ? field.errorId : undefined
  );
  const nextProps: FieldControlProps = {
    ...props,
    id: field.controlId,
  };

  if (describedBy) {
    nextProps["aria-describedby"] = describedBy;
  }

  if (field.invalid) {
    nextProps["aria-invalid"] = true;
    nextProps["data-invalid"] = props["data-invalid"] ?? "";
  }

  if (field.required) {
    nextProps["data-required"] = props["data-required"] ?? "";

    if (nativeRequired) {
      nextProps.required = true;
    } else {
      nextProps["aria-required"] = true;
    }
  }

  return nextProps as TProps;
}

export function useFieldControlProps<TProps extends FieldControlProps>(
  props: TProps,
  options?: FieldControlOptions
) {
  return getFieldControlProps(props, useFieldContext(), options);
}
