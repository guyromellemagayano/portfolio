import { createHtmlPrimitive } from "../primitive";
import {
  type PrimitiveElement,
  type PrimitiveProps,
  type PrimitiveRef,
} from "../types";

export type AddressRef = PrimitiveRef<"address">;
export type AddressProps<TAs extends PrimitiveElement = "address"> =
  PrimitiveProps<"address", TAs>;

/** Render the native <address> HTML element. */
export const Address = createHtmlPrimitive("Address", "address");
