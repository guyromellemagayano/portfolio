export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  Dimension: { input: any; output: any; }
  HexColor: { input: any; output: any; }
  JSON: { input: any; output: any; }
  Quality: { input: any; output: any; }
};

/** Represents a binary file in a space. An asset can be any file type. */
export type Asset = {
  __typename?: 'Asset';
  contentType?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']['output']>;
  fileName?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  linkedFrom?: Maybe<AssetLinkingCollections>;
  size?: Maybe<Scalars['Int']['output']>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetContentTypeArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetFileNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetHeightArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetSizeArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetUrlArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  transform?: InputMaybe<ImageTransformOptions>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetWidthArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type AssetCollection = {
  __typename?: 'AssetCollection';
  items: Array<Maybe<Asset>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type AssetFilter = {
  AND?: InputMaybe<Array<InputMaybe<AssetFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<AssetFilter>>>;
  contentType?: InputMaybe<Scalars['String']['input']>;
  contentType_contains?: InputMaybe<Scalars['String']['input']>;
  contentType_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentType_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentType_not?: InputMaybe<Scalars['String']['input']>;
  contentType_not_contains?: InputMaybe<Scalars['String']['input']>;
  contentType_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_exists?: InputMaybe<Scalars['Boolean']['input']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  fileName?: InputMaybe<Scalars['String']['input']>;
  fileName_contains?: InputMaybe<Scalars['String']['input']>;
  fileName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  fileName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  fileName_not?: InputMaybe<Scalars['String']['input']>;
  fileName_not_contains?: InputMaybe<Scalars['String']['input']>;
  fileName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  height?: InputMaybe<Scalars['Int']['input']>;
  height_exists?: InputMaybe<Scalars['Boolean']['input']>;
  height_gt?: InputMaybe<Scalars['Int']['input']>;
  height_gte?: InputMaybe<Scalars['Int']['input']>;
  height_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  height_lt?: InputMaybe<Scalars['Int']['input']>;
  height_lte?: InputMaybe<Scalars['Int']['input']>;
  height_not?: InputMaybe<Scalars['Int']['input']>;
  height_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  size?: InputMaybe<Scalars['Int']['input']>;
  size_exists?: InputMaybe<Scalars['Boolean']['input']>;
  size_gt?: InputMaybe<Scalars['Int']['input']>;
  size_gte?: InputMaybe<Scalars['Int']['input']>;
  size_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  size_lt?: InputMaybe<Scalars['Int']['input']>;
  size_lte?: InputMaybe<Scalars['Int']['input']>;
  size_not?: InputMaybe<Scalars['Int']['input']>;
  size_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  url?: InputMaybe<Scalars['String']['input']>;
  url_contains?: InputMaybe<Scalars['String']['input']>;
  url_exists?: InputMaybe<Scalars['Boolean']['input']>;
  url_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  url_not?: InputMaybe<Scalars['String']['input']>;
  url_not_contains?: InputMaybe<Scalars['String']['input']>;
  url_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  width?: InputMaybe<Scalars['Int']['input']>;
  width_exists?: InputMaybe<Scalars['Boolean']['input']>;
  width_gt?: InputMaybe<Scalars['Int']['input']>;
  width_gte?: InputMaybe<Scalars['Int']['input']>;
  width_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  width_lt?: InputMaybe<Scalars['Int']['input']>;
  width_lte?: InputMaybe<Scalars['Int']['input']>;
  width_not?: InputMaybe<Scalars['Int']['input']>;
  width_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};

export type AssetLinkingCollections = {
  __typename?: 'AssetLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  seoComponentCollection?: Maybe<SeoComponentCollection>;
  skillsModelCollection?: Maybe<SkillsModelCollection>;
  workExperienceModelCollection?: Maybe<WorkExperienceModelCollection>;
};


export type AssetLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type AssetLinkingCollectionsSeoComponentCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type AssetLinkingCollectionsSkillsModelCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type AssetLinkingCollectionsWorkExperienceModelCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum AssetOrder {
  ContentTypeAsc = 'contentType_ASC',
  ContentTypeDesc = 'contentType_DESC',
  FileNameAsc = 'fileName_ASC',
  FileNameDesc = 'fileName_DESC',
  HeightAsc = 'height_ASC',
  HeightDesc = 'height_DESC',
  SizeAsc = 'size_ASC',
  SizeDesc = 'size_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  WidthAsc = 'width_ASC',
  WidthDesc = 'width_DESC'
}

export type ContentfulMetadata = {
  __typename?: 'ContentfulMetadata';
  tags: Array<Maybe<ContentfulTag>>;
};

export type ContentfulMetadataConceptsFilter = {
  id_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ContentfulMetadataFilter = {
  concepts?: InputMaybe<ContentfulMetadataConceptsFilter>;
  tags?: InputMaybe<ContentfulMetadataTagsFilter>;
  tags_exists?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ContentfulMetadataTagsFilter = {
  id_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/**
 * Represents a tag entity for finding and organizing content easily.
 *       Find out more here: https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/content-tags
 */
export type ContentfulTag = {
  __typename?: 'ContentfulTag';
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Entry = {
  contentfulMetadata: ContentfulMetadata;
  sys: Sys;
};

export type EntryCollection = {
  __typename?: 'EntryCollection';
  items: Array<Maybe<Entry>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type EntryFilter = {
  AND?: InputMaybe<Array<InputMaybe<EntryFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<EntryFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  sys?: InputMaybe<SysFilter>;
};

export enum EntryOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** Hero component content type [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/heroComponent) */
export type HeroComponent = Entry & _Node & {
  __typename?: 'HeroComponent';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<HeroComponentDescription>;
  heading?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<HeroComponentLinkingCollections>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
};


/** Hero component content type [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/heroComponent) */
export type HeroComponentDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Hero component content type [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/heroComponent) */
export type HeroComponentHeadingArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Hero component content type [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/heroComponent) */
export type HeroComponentLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Hero component content type [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/heroComponent) */
export type HeroComponentTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type HeroComponentCollection = {
  __typename?: 'HeroComponentCollection';
  items: Array<Maybe<HeroComponent>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type HeroComponentDescription = {
  __typename?: 'HeroComponentDescription';
  json: Scalars['JSON']['output'];
  links: HeroComponentDescriptionLinks;
};

export type HeroComponentDescriptionAssets = {
  __typename?: 'HeroComponentDescriptionAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type HeroComponentDescriptionEntries = {
  __typename?: 'HeroComponentDescriptionEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type HeroComponentDescriptionLinks = {
  __typename?: 'HeroComponentDescriptionLinks';
  assets: HeroComponentDescriptionAssets;
  entries: HeroComponentDescriptionEntries;
  resources: HeroComponentDescriptionResources;
};

export type HeroComponentDescriptionResources = {
  __typename?: 'HeroComponentDescriptionResources';
  block: Array<HeroComponentDescriptionResourcesBlock>;
  hyperlink: Array<HeroComponentDescriptionResourcesHyperlink>;
  inline: Array<HeroComponentDescriptionResourcesInline>;
};

export type HeroComponentDescriptionResourcesBlock = ResourceLink & {
  __typename?: 'HeroComponentDescriptionResourcesBlock';
  sys: ResourceSys;
};

export type HeroComponentDescriptionResourcesHyperlink = ResourceLink & {
  __typename?: 'HeroComponentDescriptionResourcesHyperlink';
  sys: ResourceSys;
};

export type HeroComponentDescriptionResourcesInline = ResourceLink & {
  __typename?: 'HeroComponentDescriptionResourcesInline';
  sys: ResourceSys;
};

export type HeroComponentFilter = {
  AND?: InputMaybe<Array<InputMaybe<HeroComponentFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<HeroComponentFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_exists?: InputMaybe<Scalars['Boolean']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  heading?: InputMaybe<Scalars['String']['input']>;
  heading_contains?: InputMaybe<Scalars['String']['input']>;
  heading_exists?: InputMaybe<Scalars['Boolean']['input']>;
  heading_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  heading_not?: InputMaybe<Scalars['String']['input']>;
  heading_not_contains?: InputMaybe<Scalars['String']['input']>;
  heading_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type HeroComponentLinkingCollections = {
  __typename?: 'HeroComponentLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type HeroComponentLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum HeroComponentOrder {
  HeadingAsc = 'heading_ASC',
  HeadingDesc = 'heading_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export enum ImageFormat {
  Avif = 'AVIF',
  /** JPG image format. */
  Jpg = 'JPG',
  /**
   * Progressive JPG format stores multiple passes of an image in progressively higher detail.
   *         When a progressive image is loading, the viewer will first see a lower quality pixelated version which
   *         will gradually improve in detail, until the image is fully downloaded. This is to display an image as
   *         early as possible to make the layout look as designed.
   */
  JpgProgressive = 'JPG_PROGRESSIVE',
  /** PNG image format */
  Png = 'PNG',
  /**
   * 8-bit PNG images support up to 256 colors and weigh less than the standard 24-bit PNG equivalent.
   *         The 8-bit PNG format is mostly used for simple images, such as icons or logos.
   */
  Png8 = 'PNG8',
  /** WebP image format. */
  Webp = 'WEBP'
}

export enum ImageResizeFocus {
  /** Focus the resizing on the bottom. */
  Bottom = 'BOTTOM',
  /** Focus the resizing on the bottom left. */
  BottomLeft = 'BOTTOM_LEFT',
  /** Focus the resizing on the bottom right. */
  BottomRight = 'BOTTOM_RIGHT',
  /** Focus the resizing on the center. */
  Center = 'CENTER',
  /** Focus the resizing on the largest face. */
  Face = 'FACE',
  /** Focus the resizing on the area containing all the faces. */
  Faces = 'FACES',
  /** Focus the resizing on the left. */
  Left = 'LEFT',
  /** Focus the resizing on the right. */
  Right = 'RIGHT',
  /** Focus the resizing on the top. */
  Top = 'TOP',
  /** Focus the resizing on the top left. */
  TopLeft = 'TOP_LEFT',
  /** Focus the resizing on the top right. */
  TopRight = 'TOP_RIGHT'
}

export enum ImageResizeStrategy {
  /** Crops a part of the original image to fit into the specified dimensions. */
  Crop = 'CROP',
  /** Resizes the image to the specified dimensions, cropping the image if needed. */
  Fill = 'FILL',
  /** Resizes the image to fit into the specified dimensions. */
  Fit = 'FIT',
  /**
   * Resizes the image to the specified dimensions, padding the image if needed.
   *         Uses desired background color as padding color.
   */
  Pad = 'PAD',
  /** Resizes the image to the specified dimensions, changing the original aspect ratio if needed. */
  Scale = 'SCALE',
  /** Creates a thumbnail from the image. */
  Thumb = 'THUMB'
}

export type ImageTransformOptions = {
  /**
   * Desired background color, used with corner radius or `PAD` resize strategy.
   *         Defaults to transparent (for `PNG`, `PNG8` and `WEBP`) or white (for `JPG` and `JPG_PROGRESSIVE`).
   */
  backgroundColor?: InputMaybe<Scalars['HexColor']['input']>;
  /**
   * Desired corner radius in pixels.
   *         Results in an image with rounded corners (pass `-1` for a full circle/ellipse).
   *         Defaults to `0`. Uses desired background color as padding color,
   *         unless the format is `JPG` or `JPG_PROGRESSIVE` and resize strategy is `PAD`, then defaults to white.
   */
  cornerRadius?: InputMaybe<Scalars['Int']['input']>;
  /** Desired image format. Defaults to the original image format. */
  format?: InputMaybe<ImageFormat>;
  /** Desired height in pixels. Defaults to the original image height. */
  height?: InputMaybe<Scalars['Dimension']['input']>;
  /**
   * Desired quality of the image in percents.
   *         Used for `PNG8`, `JPG`, `JPG_PROGRESSIVE` and `WEBP` formats.
   */
  quality?: InputMaybe<Scalars['Quality']['input']>;
  /** Desired resize focus area. Defaults to `CENTER`. */
  resizeFocus?: InputMaybe<ImageResizeFocus>;
  /** Desired resize strategy. Defaults to `FIT`. */
  resizeStrategy?: InputMaybe<ImageResizeStrategy>;
  /** Desired width in pixels. Defaults to the original image width. */
  width?: InputMaybe<Scalars['Dimension']['input']>;
};

/** Page content model [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/pageContentModel) */
export type PageContentModel = Entry & _Node & {
  __typename?: 'PageContentModel';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  heroDescription?: Maybe<PageContentModelHeroDescription>;
  heroHeading?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<PageContentModelLinkingCollections>;
  pageSection?: Maybe<Scalars['String']['output']>;
  sections?: Maybe<Entry>;
  sys: Sys;
};


/** Page content model [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/pageContentModel) */
export type PageContentModelHeroDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Page content model [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/pageContentModel) */
export type PageContentModelHeroHeadingArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Page content model [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/pageContentModel) */
export type PageContentModelLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Page content model [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/pageContentModel) */
export type PageContentModelPageSectionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Page content model [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/pageContentModel) */
export type PageContentModelSectionsArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PageContentModelCollection = {
  __typename?: 'PageContentModelCollection';
  items: Array<Maybe<PageContentModel>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type PageContentModelFilter = {
  AND?: InputMaybe<Array<InputMaybe<PageContentModelFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PageContentModelFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  heroDescription_contains?: InputMaybe<Scalars['String']['input']>;
  heroDescription_exists?: InputMaybe<Scalars['Boolean']['input']>;
  heroDescription_not_contains?: InputMaybe<Scalars['String']['input']>;
  heroHeading?: InputMaybe<Scalars['String']['input']>;
  heroHeading_contains?: InputMaybe<Scalars['String']['input']>;
  heroHeading_exists?: InputMaybe<Scalars['Boolean']['input']>;
  heroHeading_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  heroHeading_not?: InputMaybe<Scalars['String']['input']>;
  heroHeading_not_contains?: InputMaybe<Scalars['String']['input']>;
  heroHeading_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pageSection?: InputMaybe<Scalars['String']['input']>;
  pageSection_contains?: InputMaybe<Scalars['String']['input']>;
  pageSection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  pageSection_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pageSection_not?: InputMaybe<Scalars['String']['input']>;
  pageSection_not_contains?: InputMaybe<Scalars['String']['input']>;
  pageSection_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sections_exists?: InputMaybe<Scalars['Boolean']['input']>;
  sys?: InputMaybe<SysFilter>;
};

export type PageContentModelHeroDescription = {
  __typename?: 'PageContentModelHeroDescription';
  json: Scalars['JSON']['output'];
  links: PageContentModelHeroDescriptionLinks;
};

export type PageContentModelHeroDescriptionAssets = {
  __typename?: 'PageContentModelHeroDescriptionAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type PageContentModelHeroDescriptionEntries = {
  __typename?: 'PageContentModelHeroDescriptionEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type PageContentModelHeroDescriptionLinks = {
  __typename?: 'PageContentModelHeroDescriptionLinks';
  assets: PageContentModelHeroDescriptionAssets;
  entries: PageContentModelHeroDescriptionEntries;
  resources: PageContentModelHeroDescriptionResources;
};

export type PageContentModelHeroDescriptionResources = {
  __typename?: 'PageContentModelHeroDescriptionResources';
  block: Array<PageContentModelHeroDescriptionResourcesBlock>;
  hyperlink: Array<PageContentModelHeroDescriptionResourcesHyperlink>;
  inline: Array<PageContentModelHeroDescriptionResourcesInline>;
};

export type PageContentModelHeroDescriptionResourcesBlock = ResourceLink & {
  __typename?: 'PageContentModelHeroDescriptionResourcesBlock';
  sys: ResourceSys;
};

export type PageContentModelHeroDescriptionResourcesHyperlink = ResourceLink & {
  __typename?: 'PageContentModelHeroDescriptionResourcesHyperlink';
  sys: ResourceSys;
};

export type PageContentModelHeroDescriptionResourcesInline = ResourceLink & {
  __typename?: 'PageContentModelHeroDescriptionResourcesInline';
  sys: ResourceSys;
};

export type PageContentModelLinkingCollections = {
  __typename?: 'PageContentModelLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type PageContentModelLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum PageContentModelOrder {
  HeroHeadingAsc = 'heroHeading_ASC',
  HeroHeadingDesc = 'heroHeading_DESC',
  PageSectionAsc = 'pageSection_ASC',
  PageSectionDesc = 'pageSection_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type Query = {
  __typename?: 'Query';
  _node?: Maybe<_Node>;
  asset?: Maybe<Asset>;
  assetCollection?: Maybe<AssetCollection>;
  entryCollection?: Maybe<EntryCollection>;
  heroComponent?: Maybe<HeroComponent>;
  heroComponentCollection?: Maybe<HeroComponentCollection>;
  pageContentModel?: Maybe<PageContentModel>;
  pageContentModelCollection?: Maybe<PageContentModelCollection>;
  seoComponent?: Maybe<SeoComponent>;
  seoComponentCollection?: Maybe<SeoComponentCollection>;
  skillsModel?: Maybe<SkillsModel>;
  skillsModelCollection?: Maybe<SkillsModelCollection>;
  socialLinksModel?: Maybe<SocialLinksModel>;
  socialLinksModelCollection?: Maybe<SocialLinksModelCollection>;
  workExperienceModel?: Maybe<WorkExperienceModel>;
  workExperienceModelCollection?: Maybe<WorkExperienceModelCollection>;
};


export type Query_NodeArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAssetArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAssetCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<AssetOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AssetFilter>;
};


export type QueryEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<EntryOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<EntryFilter>;
};


export type QueryHeroComponentArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryHeroComponentCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<HeroComponentOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<HeroComponentFilter>;
};


export type QueryPageContentModelArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryPageContentModelCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<PageContentModelOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PageContentModelFilter>;
};


export type QuerySeoComponentArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QuerySeoComponentCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<SeoComponentOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SeoComponentFilter>;
};


export type QuerySkillsModelArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QuerySkillsModelCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<SkillsModelOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SkillsModelFilter>;
};


export type QuerySocialLinksModelArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QuerySocialLinksModelCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<SocialLinksModelOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SocialLinksModelFilter>;
};


export type QueryWorkExperienceModelArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryWorkExperienceModelCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<WorkExperienceModelOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<WorkExperienceModelFilter>;
};

export type ResourceLink = {
  sys: ResourceSys;
};

export type ResourceSys = {
  __typename?: 'ResourceSys';
  linkType: Scalars['String']['output'];
  urn: Scalars['String']['output'];
};

/** SEO component content type [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/seoComponent) */
export type SeoComponent = Entry & _Node & {
  __typename?: 'SeoComponent';
  _id: Scalars['ID']['output'];
  canonicalUrl?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  keywords?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<SeoComponentLinkingCollections>;
  metaDescription?: Maybe<Scalars['String']['output']>;
  metaTitle?: Maybe<Scalars['String']['output']>;
  ogDescription?: Maybe<Scalars['String']['output']>;
  ogImage?: Maybe<Asset>;
  ogTitle?: Maybe<Scalars['String']['output']>;
  robotsMeta?: Maybe<Scalars['String']['output']>;
  schemaMarkup?: Maybe<SeoComponentSchemaMarkup>;
  slugurl?: Maybe<Scalars['String']['output']>;
  sys: Sys;
  twitterCardType?: Maybe<Scalars['String']['output']>;
};


/** SEO component content type [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/seoComponent) */
export type SeoComponentCanonicalUrlArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** SEO component content type [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/seoComponent) */
export type SeoComponentKeywordsArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** SEO component content type [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/seoComponent) */
export type SeoComponentLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** SEO component content type [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/seoComponent) */
export type SeoComponentMetaDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** SEO component content type [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/seoComponent) */
export type SeoComponentMetaTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** SEO component content type [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/seoComponent) */
export type SeoComponentOgDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** SEO component content type [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/seoComponent) */
export type SeoComponentOgImageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


/** SEO component content type [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/seoComponent) */
export type SeoComponentOgTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** SEO component content type [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/seoComponent) */
export type SeoComponentRobotsMetaArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** SEO component content type [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/seoComponent) */
export type SeoComponentSchemaMarkupArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** SEO component content type [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/seoComponent) */
export type SeoComponentSlugurlArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** SEO component content type [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/seoComponent) */
export type SeoComponentTwitterCardTypeArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type SeoComponentCollection = {
  __typename?: 'SeoComponentCollection';
  items: Array<Maybe<SeoComponent>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type SeoComponentFilter = {
  AND?: InputMaybe<Array<InputMaybe<SeoComponentFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<SeoComponentFilter>>>;
  canonicalUrl?: InputMaybe<Scalars['String']['input']>;
  canonicalUrl_contains?: InputMaybe<Scalars['String']['input']>;
  canonicalUrl_exists?: InputMaybe<Scalars['Boolean']['input']>;
  canonicalUrl_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  canonicalUrl_not?: InputMaybe<Scalars['String']['input']>;
  canonicalUrl_not_contains?: InputMaybe<Scalars['String']['input']>;
  canonicalUrl_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  keywords?: InputMaybe<Scalars['String']['input']>;
  keywords_contains?: InputMaybe<Scalars['String']['input']>;
  keywords_exists?: InputMaybe<Scalars['Boolean']['input']>;
  keywords_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  keywords_not?: InputMaybe<Scalars['String']['input']>;
  keywords_not_contains?: InputMaybe<Scalars['String']['input']>;
  keywords_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  metaDescription?: InputMaybe<Scalars['String']['input']>;
  metaDescription_contains?: InputMaybe<Scalars['String']['input']>;
  metaDescription_exists?: InputMaybe<Scalars['Boolean']['input']>;
  metaDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  metaDescription_not?: InputMaybe<Scalars['String']['input']>;
  metaDescription_not_contains?: InputMaybe<Scalars['String']['input']>;
  metaDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  metaTitle?: InputMaybe<Scalars['String']['input']>;
  metaTitle_contains?: InputMaybe<Scalars['String']['input']>;
  metaTitle_exists?: InputMaybe<Scalars['Boolean']['input']>;
  metaTitle_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  metaTitle_not?: InputMaybe<Scalars['String']['input']>;
  metaTitle_not_contains?: InputMaybe<Scalars['String']['input']>;
  metaTitle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ogDescription?: InputMaybe<Scalars['String']['input']>;
  ogDescription_contains?: InputMaybe<Scalars['String']['input']>;
  ogDescription_exists?: InputMaybe<Scalars['Boolean']['input']>;
  ogDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ogDescription_not?: InputMaybe<Scalars['String']['input']>;
  ogDescription_not_contains?: InputMaybe<Scalars['String']['input']>;
  ogDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ogImage_exists?: InputMaybe<Scalars['Boolean']['input']>;
  ogTitle?: InputMaybe<Scalars['String']['input']>;
  ogTitle_contains?: InputMaybe<Scalars['String']['input']>;
  ogTitle_exists?: InputMaybe<Scalars['Boolean']['input']>;
  ogTitle_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ogTitle_not?: InputMaybe<Scalars['String']['input']>;
  ogTitle_not_contains?: InputMaybe<Scalars['String']['input']>;
  ogTitle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  robotsMeta?: InputMaybe<Scalars['String']['input']>;
  robotsMeta_contains?: InputMaybe<Scalars['String']['input']>;
  robotsMeta_exists?: InputMaybe<Scalars['Boolean']['input']>;
  robotsMeta_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  robotsMeta_not?: InputMaybe<Scalars['String']['input']>;
  robotsMeta_not_contains?: InputMaybe<Scalars['String']['input']>;
  robotsMeta_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  schemaMarkup_contains?: InputMaybe<Scalars['String']['input']>;
  schemaMarkup_exists?: InputMaybe<Scalars['Boolean']['input']>;
  schemaMarkup_not_contains?: InputMaybe<Scalars['String']['input']>;
  slugurl?: InputMaybe<Scalars['String']['input']>;
  slugurl_contains?: InputMaybe<Scalars['String']['input']>;
  slugurl_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slugurl_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slugurl_not?: InputMaybe<Scalars['String']['input']>;
  slugurl_not_contains?: InputMaybe<Scalars['String']['input']>;
  slugurl_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  twitterCardType?: InputMaybe<Scalars['String']['input']>;
  twitterCardType_contains?: InputMaybe<Scalars['String']['input']>;
  twitterCardType_exists?: InputMaybe<Scalars['Boolean']['input']>;
  twitterCardType_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  twitterCardType_not?: InputMaybe<Scalars['String']['input']>;
  twitterCardType_not_contains?: InputMaybe<Scalars['String']['input']>;
  twitterCardType_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type SeoComponentLinkingCollections = {
  __typename?: 'SeoComponentLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type SeoComponentLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum SeoComponentOrder {
  CanonicalUrlAsc = 'canonicalUrl_ASC',
  CanonicalUrlDesc = 'canonicalUrl_DESC',
  KeywordsAsc = 'keywords_ASC',
  KeywordsDesc = 'keywords_DESC',
  MetaTitleAsc = 'metaTitle_ASC',
  MetaTitleDesc = 'metaTitle_DESC',
  OgDescriptionAsc = 'ogDescription_ASC',
  OgDescriptionDesc = 'ogDescription_DESC',
  OgTitleAsc = 'ogTitle_ASC',
  OgTitleDesc = 'ogTitle_DESC',
  RobotsMetaAsc = 'robotsMeta_ASC',
  RobotsMetaDesc = 'robotsMeta_DESC',
  SlugurlAsc = 'slugurl_ASC',
  SlugurlDesc = 'slugurl_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TwitterCardTypeAsc = 'twitterCardType_ASC',
  TwitterCardTypeDesc = 'twitterCardType_DESC'
}

export type SeoComponentSchemaMarkup = {
  __typename?: 'SeoComponentSchemaMarkup';
  json: Scalars['JSON']['output'];
  links: SeoComponentSchemaMarkupLinks;
};

export type SeoComponentSchemaMarkupAssets = {
  __typename?: 'SeoComponentSchemaMarkupAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type SeoComponentSchemaMarkupEntries = {
  __typename?: 'SeoComponentSchemaMarkupEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type SeoComponentSchemaMarkupLinks = {
  __typename?: 'SeoComponentSchemaMarkupLinks';
  assets: SeoComponentSchemaMarkupAssets;
  entries: SeoComponentSchemaMarkupEntries;
  resources: SeoComponentSchemaMarkupResources;
};

export type SeoComponentSchemaMarkupResources = {
  __typename?: 'SeoComponentSchemaMarkupResources';
  block: Array<SeoComponentSchemaMarkupResourcesBlock>;
  hyperlink: Array<SeoComponentSchemaMarkupResourcesHyperlink>;
  inline: Array<SeoComponentSchemaMarkupResourcesInline>;
};

export type SeoComponentSchemaMarkupResourcesBlock = ResourceLink & {
  __typename?: 'SeoComponentSchemaMarkupResourcesBlock';
  sys: ResourceSys;
};

export type SeoComponentSchemaMarkupResourcesHyperlink = ResourceLink & {
  __typename?: 'SeoComponentSchemaMarkupResourcesHyperlink';
  sys: ResourceSys;
};

export type SeoComponentSchemaMarkupResourcesInline = ResourceLink & {
  __typename?: 'SeoComponentSchemaMarkupResourcesInline';
  sys: ResourceSys;
};

/** Skills model [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/skillsModel) */
export type SkillsModel = Entry & _Node & {
  __typename?: 'SkillsModel';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<SkillsModelLinkingCollections>;
  logoCollection?: Maybe<AssetCollection>;
  skillName?: Maybe<Scalars['String']['output']>;
  skillType?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  sourceUrl?: Maybe<Scalars['String']['output']>;
  sys: Sys;
  uid?: Maybe<Scalars['String']['output']>;
};


/** Skills model [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/skillsModel) */
export type SkillsModelLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Skills model [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/skillsModel) */
export type SkillsModelLogoCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


/** Skills model [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/skillsModel) */
export type SkillsModelSkillNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Skills model [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/skillsModel) */
export type SkillsModelSkillTypeArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Skills model [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/skillsModel) */
export type SkillsModelSourceUrlArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Skills model [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/skillsModel) */
export type SkillsModelUidArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type SkillsModelCollection = {
  __typename?: 'SkillsModelCollection';
  items: Array<Maybe<SkillsModel>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type SkillsModelFilter = {
  AND?: InputMaybe<Array<InputMaybe<SkillsModelFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<SkillsModelFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  logoCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  skillName?: InputMaybe<Scalars['String']['input']>;
  skillName_contains?: InputMaybe<Scalars['String']['input']>;
  skillName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  skillName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  skillName_not?: InputMaybe<Scalars['String']['input']>;
  skillName_not_contains?: InputMaybe<Scalars['String']['input']>;
  skillName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  skillType_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  skillType_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  skillType_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  skillType_exists?: InputMaybe<Scalars['Boolean']['input']>;
  sourceUrl?: InputMaybe<Scalars['String']['input']>;
  sourceUrl_contains?: InputMaybe<Scalars['String']['input']>;
  sourceUrl_exists?: InputMaybe<Scalars['Boolean']['input']>;
  sourceUrl_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sourceUrl_not?: InputMaybe<Scalars['String']['input']>;
  sourceUrl_not_contains?: InputMaybe<Scalars['String']['input']>;
  sourceUrl_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  uid?: InputMaybe<Scalars['String']['input']>;
  uid_contains?: InputMaybe<Scalars['String']['input']>;
  uid_exists?: InputMaybe<Scalars['Boolean']['input']>;
  uid_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  uid_not?: InputMaybe<Scalars['String']['input']>;
  uid_not_contains?: InputMaybe<Scalars['String']['input']>;
  uid_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type SkillsModelLinkingCollections = {
  __typename?: 'SkillsModelLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  workExperienceModelCollection?: Maybe<WorkExperienceModelCollection>;
};


export type SkillsModelLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type SkillsModelLinkingCollectionsWorkExperienceModelCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<SkillsModelLinkingCollectionsWorkExperienceModelCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum SkillsModelLinkingCollectionsWorkExperienceModelCollectionOrder {
  CompanyNameAsc = 'companyName_ASC',
  CompanyNameDesc = 'companyName_DESC',
  CountryAsc = 'country_ASC',
  CountryDesc = 'country_DESC',
  EmploymentStatusAsc = 'employmentStatus_ASC',
  EmploymentStatusDesc = 'employmentStatus_DESC',
  EmploymentTypeAsc = 'employmentType_ASC',
  EmploymentTypeDesc = 'employmentType_DESC',
  EndDateAsc = 'endDate_ASC',
  EndDateDesc = 'endDate_DESC',
  JobTitleAsc = 'jobTitle_ASC',
  JobTitleDesc = 'jobTitle_DESC',
  StartDateAsc = 'startDate_ASC',
  StartDateDesc = 'startDate_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  UidAsc = 'uid_ASC',
  UidDesc = 'uid_DESC'
}

export enum SkillsModelOrder {
  SkillNameAsc = 'skillName_ASC',
  SkillNameDesc = 'skillName_DESC',
  SourceUrlAsc = 'sourceUrl_ASC',
  SourceUrlDesc = 'sourceUrl_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  UidAsc = 'uid_ASC',
  UidDesc = 'uid_DESC'
}

/** Social links model [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/socialLinksModel) */
export type SocialLinksModel = Entry & _Node & {
  __typename?: 'SocialLinksModel';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  label?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<SocialLinksModelLinkingCollections>;
  platformName?: Maybe<Scalars['String']['output']>;
  socialUrl?: Maybe<Scalars['String']['output']>;
  sys: Sys;
  uid?: Maybe<Scalars['String']['output']>;
};


/** Social links model [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/socialLinksModel) */
export type SocialLinksModelLabelArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Social links model [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/socialLinksModel) */
export type SocialLinksModelLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Social links model [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/socialLinksModel) */
export type SocialLinksModelPlatformNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Social links model [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/socialLinksModel) */
export type SocialLinksModelSocialUrlArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Social links model [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/socialLinksModel) */
export type SocialLinksModelUidArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type SocialLinksModelCollection = {
  __typename?: 'SocialLinksModelCollection';
  items: Array<Maybe<SocialLinksModel>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type SocialLinksModelFilter = {
  AND?: InputMaybe<Array<InputMaybe<SocialLinksModelFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<SocialLinksModelFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  label?: InputMaybe<Scalars['String']['input']>;
  label_contains?: InputMaybe<Scalars['String']['input']>;
  label_exists?: InputMaybe<Scalars['Boolean']['input']>;
  label_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  label_not?: InputMaybe<Scalars['String']['input']>;
  label_not_contains?: InputMaybe<Scalars['String']['input']>;
  label_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  platformName?: InputMaybe<Scalars['String']['input']>;
  platformName_contains?: InputMaybe<Scalars['String']['input']>;
  platformName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  platformName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  platformName_not?: InputMaybe<Scalars['String']['input']>;
  platformName_not_contains?: InputMaybe<Scalars['String']['input']>;
  platformName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  socialUrl?: InputMaybe<Scalars['String']['input']>;
  socialUrl_contains?: InputMaybe<Scalars['String']['input']>;
  socialUrl_exists?: InputMaybe<Scalars['Boolean']['input']>;
  socialUrl_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  socialUrl_not?: InputMaybe<Scalars['String']['input']>;
  socialUrl_not_contains?: InputMaybe<Scalars['String']['input']>;
  socialUrl_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  uid?: InputMaybe<Scalars['String']['input']>;
  uid_contains?: InputMaybe<Scalars['String']['input']>;
  uid_exists?: InputMaybe<Scalars['Boolean']['input']>;
  uid_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  uid_not?: InputMaybe<Scalars['String']['input']>;
  uid_not_contains?: InputMaybe<Scalars['String']['input']>;
  uid_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type SocialLinksModelLinkingCollections = {
  __typename?: 'SocialLinksModelLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type SocialLinksModelLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum SocialLinksModelOrder {
  LabelAsc = 'label_ASC',
  LabelDesc = 'label_DESC',
  PlatformNameAsc = 'platformName_ASC',
  PlatformNameDesc = 'platformName_DESC',
  SocialUrlAsc = 'socialUrl_ASC',
  SocialUrlDesc = 'socialUrl_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  UidAsc = 'uid_ASC',
  UidDesc = 'uid_DESC'
}

export type Sys = {
  __typename?: 'Sys';
  environmentId: Scalars['String']['output'];
  firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  /** The locale that was requested. */
  locale?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  publishedVersion?: Maybe<Scalars['Int']['output']>;
  spaceId: Scalars['String']['output'];
};

export type SysFilter = {
  firstPublishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_exists?: InputMaybe<Scalars['Boolean']['input']>;
  firstPublishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  firstPublishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_exists?: InputMaybe<Scalars['Boolean']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_exists?: InputMaybe<Scalars['Boolean']['input']>;
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedVersion?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_exists?: InputMaybe<Scalars['Boolean']['input']>;
  publishedVersion_gt?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_gte?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  publishedVersion_lt?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_lte?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_not?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
};

/** Work experience model [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/workExperienceModel) */
export type WorkExperienceModel = Entry & _Node & {
  __typename?: 'WorkExperienceModel';
  _id: Scalars['ID']['output'];
  companyName?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  contributions?: Maybe<WorkExperienceModelContributions>;
  country?: Maybe<Scalars['String']['output']>;
  employmentStatus?: Maybe<Scalars['String']['output']>;
  employmentType?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  jobTitle?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<WorkExperienceModelLinkingCollections>;
  logo?: Maybe<Asset>;
  skillsCollection?: Maybe<WorkExperienceModelSkillsCollection>;
  startDate?: Maybe<Scalars['DateTime']['output']>;
  sys: Sys;
  uid?: Maybe<Scalars['String']['output']>;
};


/** Work experience model [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/workExperienceModel) */
export type WorkExperienceModelCompanyNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Work experience model [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/workExperienceModel) */
export type WorkExperienceModelContributionsArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Work experience model [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/workExperienceModel) */
export type WorkExperienceModelCountryArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Work experience model [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/workExperienceModel) */
export type WorkExperienceModelEmploymentStatusArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Work experience model [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/workExperienceModel) */
export type WorkExperienceModelEmploymentTypeArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Work experience model [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/workExperienceModel) */
export type WorkExperienceModelEndDateArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Work experience model [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/workExperienceModel) */
export type WorkExperienceModelJobTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Work experience model [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/workExperienceModel) */
export type WorkExperienceModelLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Work experience model [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/workExperienceModel) */
export type WorkExperienceModelLogoArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Work experience model [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/workExperienceModel) */
export type WorkExperienceModelSkillsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<WorkExperienceModelSkillsCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SkillsModelFilter>;
};


/** Work experience model [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/workExperienceModel) */
export type WorkExperienceModelStartDateArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Work experience model [See type definition](https://app.contentful.com/spaces/18rw1srlfa5x/content_types/workExperienceModel) */
export type WorkExperienceModelUidArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type WorkExperienceModelCollection = {
  __typename?: 'WorkExperienceModelCollection';
  items: Array<Maybe<WorkExperienceModel>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type WorkExperienceModelContributions = {
  __typename?: 'WorkExperienceModelContributions';
  json: Scalars['JSON']['output'];
  links: WorkExperienceModelContributionsLinks;
};

export type WorkExperienceModelContributionsAssets = {
  __typename?: 'WorkExperienceModelContributionsAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type WorkExperienceModelContributionsEntries = {
  __typename?: 'WorkExperienceModelContributionsEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type WorkExperienceModelContributionsLinks = {
  __typename?: 'WorkExperienceModelContributionsLinks';
  assets: WorkExperienceModelContributionsAssets;
  entries: WorkExperienceModelContributionsEntries;
  resources: WorkExperienceModelContributionsResources;
};

export type WorkExperienceModelContributionsResources = {
  __typename?: 'WorkExperienceModelContributionsResources';
  block: Array<WorkExperienceModelContributionsResourcesBlock>;
  hyperlink: Array<WorkExperienceModelContributionsResourcesHyperlink>;
  inline: Array<WorkExperienceModelContributionsResourcesInline>;
};

export type WorkExperienceModelContributionsResourcesBlock = ResourceLink & {
  __typename?: 'WorkExperienceModelContributionsResourcesBlock';
  sys: ResourceSys;
};

export type WorkExperienceModelContributionsResourcesHyperlink = ResourceLink & {
  __typename?: 'WorkExperienceModelContributionsResourcesHyperlink';
  sys: ResourceSys;
};

export type WorkExperienceModelContributionsResourcesInline = ResourceLink & {
  __typename?: 'WorkExperienceModelContributionsResourcesInline';
  sys: ResourceSys;
};

export type WorkExperienceModelFilter = {
  AND?: InputMaybe<Array<InputMaybe<WorkExperienceModelFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<WorkExperienceModelFilter>>>;
  companyName?: InputMaybe<Scalars['String']['input']>;
  companyName_contains?: InputMaybe<Scalars['String']['input']>;
  companyName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  companyName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  companyName_not?: InputMaybe<Scalars['String']['input']>;
  companyName_not_contains?: InputMaybe<Scalars['String']['input']>;
  companyName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  contributions_contains?: InputMaybe<Scalars['String']['input']>;
  contributions_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contributions_not_contains?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  country_contains?: InputMaybe<Scalars['String']['input']>;
  country_exists?: InputMaybe<Scalars['Boolean']['input']>;
  country_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  country_not?: InputMaybe<Scalars['String']['input']>;
  country_not_contains?: InputMaybe<Scalars['String']['input']>;
  country_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  employmentStatus?: InputMaybe<Scalars['String']['input']>;
  employmentStatus_contains?: InputMaybe<Scalars['String']['input']>;
  employmentStatus_exists?: InputMaybe<Scalars['Boolean']['input']>;
  employmentStatus_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  employmentStatus_not?: InputMaybe<Scalars['String']['input']>;
  employmentStatus_not_contains?: InputMaybe<Scalars['String']['input']>;
  employmentStatus_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  employmentType?: InputMaybe<Scalars['String']['input']>;
  employmentType_contains?: InputMaybe<Scalars['String']['input']>;
  employmentType_exists?: InputMaybe<Scalars['Boolean']['input']>;
  employmentType_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  employmentType_not?: InputMaybe<Scalars['String']['input']>;
  employmentType_not_contains?: InputMaybe<Scalars['String']['input']>;
  employmentType_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  endDate_exists?: InputMaybe<Scalars['Boolean']['input']>;
  endDate_gt?: InputMaybe<Scalars['DateTime']['input']>;
  endDate_gte?: InputMaybe<Scalars['DateTime']['input']>;
  endDate_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  endDate_lt?: InputMaybe<Scalars['DateTime']['input']>;
  endDate_lte?: InputMaybe<Scalars['DateTime']['input']>;
  endDate_not?: InputMaybe<Scalars['DateTime']['input']>;
  endDate_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  jobTitle?: InputMaybe<Scalars['String']['input']>;
  jobTitle_contains?: InputMaybe<Scalars['String']['input']>;
  jobTitle_exists?: InputMaybe<Scalars['Boolean']['input']>;
  jobTitle_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  jobTitle_not?: InputMaybe<Scalars['String']['input']>;
  jobTitle_not_contains?: InputMaybe<Scalars['String']['input']>;
  jobTitle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  logo_exists?: InputMaybe<Scalars['Boolean']['input']>;
  skills?: InputMaybe<CfSkillsModelNestedFilter>;
  skillsCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  startDate_exists?: InputMaybe<Scalars['Boolean']['input']>;
  startDate_gt?: InputMaybe<Scalars['DateTime']['input']>;
  startDate_gte?: InputMaybe<Scalars['DateTime']['input']>;
  startDate_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  startDate_lt?: InputMaybe<Scalars['DateTime']['input']>;
  startDate_lte?: InputMaybe<Scalars['DateTime']['input']>;
  startDate_not?: InputMaybe<Scalars['DateTime']['input']>;
  startDate_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  uid?: InputMaybe<Scalars['String']['input']>;
  uid_contains?: InputMaybe<Scalars['String']['input']>;
  uid_exists?: InputMaybe<Scalars['Boolean']['input']>;
  uid_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  uid_not?: InputMaybe<Scalars['String']['input']>;
  uid_not_contains?: InputMaybe<Scalars['String']['input']>;
  uid_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type WorkExperienceModelLinkingCollections = {
  __typename?: 'WorkExperienceModelLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type WorkExperienceModelLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum WorkExperienceModelOrder {
  CompanyNameAsc = 'companyName_ASC',
  CompanyNameDesc = 'companyName_DESC',
  CountryAsc = 'country_ASC',
  CountryDesc = 'country_DESC',
  EmploymentStatusAsc = 'employmentStatus_ASC',
  EmploymentStatusDesc = 'employmentStatus_DESC',
  EmploymentTypeAsc = 'employmentType_ASC',
  EmploymentTypeDesc = 'employmentType_DESC',
  EndDateAsc = 'endDate_ASC',
  EndDateDesc = 'endDate_DESC',
  JobTitleAsc = 'jobTitle_ASC',
  JobTitleDesc = 'jobTitle_DESC',
  StartDateAsc = 'startDate_ASC',
  StartDateDesc = 'startDate_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  UidAsc = 'uid_ASC',
  UidDesc = 'uid_DESC'
}

export type WorkExperienceModelSkillsCollection = {
  __typename?: 'WorkExperienceModelSkillsCollection';
  items: Array<Maybe<SkillsModel>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export enum WorkExperienceModelSkillsCollectionOrder {
  SkillNameAsc = 'skillName_ASC',
  SkillNameDesc = 'skillName_DESC',
  SourceUrlAsc = 'sourceUrl_ASC',
  SourceUrlDesc = 'sourceUrl_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  UidAsc = 'uid_ASC',
  UidDesc = 'uid_DESC'
}

export type _Node = {
  _id: Scalars['ID']['output'];
};

export type CfSkillsModelNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfSkillsModelNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfSkillsModelNestedFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  logoCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  skillName?: InputMaybe<Scalars['String']['input']>;
  skillName_contains?: InputMaybe<Scalars['String']['input']>;
  skillName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  skillName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  skillName_not?: InputMaybe<Scalars['String']['input']>;
  skillName_not_contains?: InputMaybe<Scalars['String']['input']>;
  skillName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  skillType_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  skillType_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  skillType_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  skillType_exists?: InputMaybe<Scalars['Boolean']['input']>;
  sourceUrl?: InputMaybe<Scalars['String']['input']>;
  sourceUrl_contains?: InputMaybe<Scalars['String']['input']>;
  sourceUrl_exists?: InputMaybe<Scalars['Boolean']['input']>;
  sourceUrl_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sourceUrl_not?: InputMaybe<Scalars['String']['input']>;
  sourceUrl_not_contains?: InputMaybe<Scalars['String']['input']>;
  sourceUrl_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  uid?: InputMaybe<Scalars['String']['input']>;
  uid_contains?: InputMaybe<Scalars['String']['input']>;
  uid_exists?: InputMaybe<Scalars['Boolean']['input']>;
  uid_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  uid_not?: InputMaybe<Scalars['String']['input']>;
  uid_not_contains?: InputMaybe<Scalars['String']['input']>;
  uid_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};
