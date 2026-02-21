/* eslint-disable simple-import-sort/imports */

/**
 * @file apps/web/src/i18n/request.ts
 * @author Guy Romelle Magayano
 * @description Implementation for request.
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
