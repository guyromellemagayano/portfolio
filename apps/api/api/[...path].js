/**
 * @file apps/api/api/[...path].js
 * @author Guy Romelle Magayano
 * @description Vercel catch-all function entrypoint for the API gateway.
 */

export { vercelApiGatewayHandler as default } from "../dist/index.js";
