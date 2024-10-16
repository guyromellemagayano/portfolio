/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  query CommonData {\n    common\n  }\n": types.CommonDataDocument,
    "\n  query AvatarImage {\n    images {\n      avatarImage {\n        alt\n        height\n        width\n        src\n        id\n      }\n    }\n  }\n": types.AvatarImageDocument,
    "\n  query PagesData {\n    pages {\n      links {\n        id\n        title\n        link\n        slug\n      }\n    }\n    common\n    images {\n      avatarImage {\n        id\n        src\n        alt\n        width\n        height\n      }\n    }\n  }\n": types.PagesDataDocument,
    "\n  query HomePageMeta {\n    homePage {\n      meta {\n        description\n        openGraph {\n          title\n          description\n          type\n          url\n          siteName\n          images {\n            id\n            url\n            alt\n            width\n            height\n          }\n        }\n        title\n      }\n    }\n  }\n": types.HomePageMetaDocument,
    "\n  query HomePageAppData {\n    common\n    homePage {\n      hero {\n        description\n        heading\n        cta {\n          id\n          link\n          slug\n          buttonType\n        }\n      }\n      sections {\n        id\n        contentType\n        heading\n        description\n        cta {\n          id\n          link\n          slug\n          buttonType\n        }\n      }\n      structuredData {\n        context\n        description\n        name\n        publisher {\n          name\n          type\n        }\n        type\n        sameAs\n      }\n    }\n    links {\n      social {\n        href\n        icon\n        id\n        label\n      }\n    }\n    images {\n      aboutImage {\n        alt\n        height\n        id\n        src\n        width\n      }\n      slideImages {\n        alt\n        height\n        id\n        src\n        width\n      }\n    }\n    work {\n      cvFile\n      experiences {\n        alt\n        company\n        country\n        contributions\n        end\n        id\n        skills\n        src\n        start\n        title\n      }\n    }\n    skills {\n      id\n      image {\n        default {\n          alt\n          src\n        }\n        dark {\n          alt\n          src\n        }\n      }\n      name\n      type\n      isFeatured\n    }\n  }\n": types.HomePageAppDataDocument,
    "\n  query ErrorMetaData {\n    errorPage {\n      meta {\n        description\n        title\n      }\n    }\n  }\n": types.ErrorMetaDataDocument,
    "\n  query ErrorPageData {\n    errorPage {\n      hero {\n        description\n        heading\n      }\n    }\n  }\n": types.ErrorPageDataDocument,
    "\n  query NotFoundMetaData {\n    notFoundPage {\n      meta {\n        description\n        title\n      }\n    }\n  }\n": types.NotFoundMetaDataDocument,
    "\n  query NotFoundPageData {\n    notFoundPage {\n      hero {\n        description\n        heading\n      }\n    }\n  }\n": types.NotFoundPageDataDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CommonData {\n    common\n  }\n"): (typeof documents)["\n  query CommonData {\n    common\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AvatarImage {\n    images {\n      avatarImage {\n        alt\n        height\n        width\n        src\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query AvatarImage {\n    images {\n      avatarImage {\n        alt\n        height\n        width\n        src\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query PagesData {\n    pages {\n      links {\n        id\n        title\n        link\n        slug\n      }\n    }\n    common\n    images {\n      avatarImage {\n        id\n        src\n        alt\n        width\n        height\n      }\n    }\n  }\n"): (typeof documents)["\n  query PagesData {\n    pages {\n      links {\n        id\n        title\n        link\n        slug\n      }\n    }\n    common\n    images {\n      avatarImage {\n        id\n        src\n        alt\n        width\n        height\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query HomePageMeta {\n    homePage {\n      meta {\n        description\n        openGraph {\n          title\n          description\n          type\n          url\n          siteName\n          images {\n            id\n            url\n            alt\n            width\n            height\n          }\n        }\n        title\n      }\n    }\n  }\n"): (typeof documents)["\n  query HomePageMeta {\n    homePage {\n      meta {\n        description\n        openGraph {\n          title\n          description\n          type\n          url\n          siteName\n          images {\n            id\n            url\n            alt\n            width\n            height\n          }\n        }\n        title\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query HomePageAppData {\n    common\n    homePage {\n      hero {\n        description\n        heading\n        cta {\n          id\n          link\n          slug\n          buttonType\n        }\n      }\n      sections {\n        id\n        contentType\n        heading\n        description\n        cta {\n          id\n          link\n          slug\n          buttonType\n        }\n      }\n      structuredData {\n        context\n        description\n        name\n        publisher {\n          name\n          type\n        }\n        type\n        sameAs\n      }\n    }\n    links {\n      social {\n        href\n        icon\n        id\n        label\n      }\n    }\n    images {\n      aboutImage {\n        alt\n        height\n        id\n        src\n        width\n      }\n      slideImages {\n        alt\n        height\n        id\n        src\n        width\n      }\n    }\n    work {\n      cvFile\n      experiences {\n        alt\n        company\n        country\n        contributions\n        end\n        id\n        skills\n        src\n        start\n        title\n      }\n    }\n    skills {\n      id\n      image {\n        default {\n          alt\n          src\n        }\n        dark {\n          alt\n          src\n        }\n      }\n      name\n      type\n      isFeatured\n    }\n  }\n"): (typeof documents)["\n  query HomePageAppData {\n    common\n    homePage {\n      hero {\n        description\n        heading\n        cta {\n          id\n          link\n          slug\n          buttonType\n        }\n      }\n      sections {\n        id\n        contentType\n        heading\n        description\n        cta {\n          id\n          link\n          slug\n          buttonType\n        }\n      }\n      structuredData {\n        context\n        description\n        name\n        publisher {\n          name\n          type\n        }\n        type\n        sameAs\n      }\n    }\n    links {\n      social {\n        href\n        icon\n        id\n        label\n      }\n    }\n    images {\n      aboutImage {\n        alt\n        height\n        id\n        src\n        width\n      }\n      slideImages {\n        alt\n        height\n        id\n        src\n        width\n      }\n    }\n    work {\n      cvFile\n      experiences {\n        alt\n        company\n        country\n        contributions\n        end\n        id\n        skills\n        src\n        start\n        title\n      }\n    }\n    skills {\n      id\n      image {\n        default {\n          alt\n          src\n        }\n        dark {\n          alt\n          src\n        }\n      }\n      name\n      type\n      isFeatured\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ErrorMetaData {\n    errorPage {\n      meta {\n        description\n        title\n      }\n    }\n  }\n"): (typeof documents)["\n  query ErrorMetaData {\n    errorPage {\n      meta {\n        description\n        title\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ErrorPageData {\n    errorPage {\n      hero {\n        description\n        heading\n      }\n    }\n  }\n"): (typeof documents)["\n  query ErrorPageData {\n    errorPage {\n      hero {\n        description\n        heading\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query NotFoundMetaData {\n    notFoundPage {\n      meta {\n        description\n        title\n      }\n    }\n  }\n"): (typeof documents)["\n  query NotFoundMetaData {\n    notFoundPage {\n      meta {\n        description\n        title\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query NotFoundPageData {\n    notFoundPage {\n      hero {\n        description\n        heading\n      }\n    }\n  }\n"): (typeof documents)["\n  query NotFoundPageData {\n    notFoundPage {\n      hero {\n        description\n        heading\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;