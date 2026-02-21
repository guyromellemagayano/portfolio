/**
 * @file sanity/_queries/articles.queries.ts
 * @author Guy Romelle Magayano
 * @description GROQ queries for article documents.
 */

export const SANITY_ARTICLES_QUERY = `
  *[_type == "article" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    "date": coalesce(publishedAt, _createdAt),
    "description": coalesce(excerpt, seo.description, ""),
    "image": mainImage.asset->url,
    tags
  }
`;
