/**
 * @file apps/web/src/app/api/draft-mode/enable/route.ts
 * @author Guy Romelle Magayano
 * @description Enables Next.js Draft Mode for Sanity Presentation Tool previews.
 */

import { NextResponse } from "next/server";
import { defineEnableDraftMode } from "next-sanity/draft-mode";

import { getSanityClient, hasSanityConfig } from "@web/sanity/client";
import { getSanityReadToken } from "@web/sanity/env";

const token = getSanityReadToken();

export const GET =
  hasSanityConfig() && token
    ? defineEnableDraftMode({
        client: getSanityClient().withConfig({ token }),
      }).GET
    : async function missingSanityPreviewConfig(_request: Request) {
        return NextResponse.json(
          {
            error:
              "Sanity preview is not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and SANITY_API_READ_TOKEN.",
          },
          { status: 500 }
        );
      };
