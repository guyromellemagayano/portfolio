/* eslint-disable simple-import-sort/imports */

/**
 * @file request.ts
 * @author Guy Romelle Magayano
 * @description Request configuration for the react-intl internationalization library.
 */

import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const store = await cookies();
  const locale = store.get("locale")?.value || "en";

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
