/**
 * @file apps/web/src/app/api/draft-mode/disable/route.ts
 * @author Guy Romelle Magayano
 * @description Disables Next.js Draft Mode and redirects back to the homepage.
 */

import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  (await draftMode()).disable();
  return NextResponse.redirect(new URL("/", request.url));
}
