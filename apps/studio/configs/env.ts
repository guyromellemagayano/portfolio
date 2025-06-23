export const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? "";
export const dataset = process.env.SANITY_STUDIO_DATASET ?? "";
export const host = process.env.SANITY_HOST_NAME ?? "";
export const studioHost = host && host !== "main" ? `${host}-portal` : "portal";
export const title = process.env.SANITY_STUDIO_TITLE ?? "";
export const previewOrigin =
  process.env.SANITY_STUDIO_PRESENTATION_URL ?? "http://localhost:3000";
export const previewUrl =
  process.env.SANITY_STUDIO_PREVIEW_URL ?? "/api/presentation-draft";
