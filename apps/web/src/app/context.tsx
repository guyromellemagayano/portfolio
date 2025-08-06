"use client";

import { createContext } from "react";

/**
 * A context for the application.
 */
export const AppContext = createContext<{
  previousPathname?: string;
}>({});
