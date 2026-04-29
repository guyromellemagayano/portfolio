import { createContext, use } from "react";

export interface FieldContextValue {
  controlId: string;
  descriptionId: string;
  errorId: string;
  invalid?: boolean;
  required?: boolean;
}

export const FieldContext = createContext<FieldContextValue | null>(null);

export function useFieldContext() {
  return use(FieldContext);
}
