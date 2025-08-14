"use client";

import { useContext } from "react";

import { useRouter } from "next/navigation";

import { Button } from "@guyromellemagayano/components";

import { AppContext } from "@web/app/context";
import {
  ArrowLeftIcon,
  ARTICLE_LAYOUT_COMPONENT_LABELS,
} from "@web/components/layouts/article";

import styles from "./ArticleNavButton.module.css";

/** A button that navigates to the previous pathname. */
export const ArticleNavButton = function () {
  let router = useRouter();
  let { previousPathname } = useContext(AppContext);

  if (!previousPathname) return null;

  const element = (
    <Button
      type="button"
      aria-label={ARTICLE_LAYOUT_COMPONENT_LABELS.goBackToArticles}
      className={styles.articleNavButton}
      onClick={() => router.back()}
    >
      <ArrowLeftIcon className={styles.articleNavButtonIcon} />
    </Button>
  );

  return element;
};

ArticleNavButton.displayName = "ArticleNavButton";
