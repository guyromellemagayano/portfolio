/**
 * @file apps/web/src/app/contact/page.tsx
 * @author Guy Romelle Magayano
 * @description Permanent redirect shim for legacy /contact links.
 */

import { permanentRedirect } from "next/navigation";

/** Legacy route compatibility redirect to the canonical /hire path. */
export default function ContactRedirectPage() {
  permanentRedirect("/hire");
}
