import { author } from "@studio/schemaTypes/documents/author";
import { blog } from "@studio/schemaTypes/documents/blog";
import { blogIndex } from "@studio/schemaTypes/documents/blog-index";
import { faq } from "@studio/schemaTypes/documents/faq";
import { footer } from "@studio/schemaTypes/documents/footer";
import { homePage } from "@studio/schemaTypes/documents/home-page";
import { navbar } from "@studio/schemaTypes/documents/navbar";
import { page } from "@studio/schemaTypes/documents/page";
import { settings } from "@studio/schemaTypes/documents/settings";

export const singletons = [homePage, blogIndex, settings, footer, navbar];

export const documents = [blog, page, faq, author, ...singletons];
