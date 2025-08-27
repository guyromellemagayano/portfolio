import React from "react";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  type ComponentProps,
  hasMeaningfulText,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/lib";

import { type FooterComponentLabels } from "../../_data";
import styles from "./FooterLegal.module.css";

interface FooterLegalProps
  extends Omit<React.ComponentProps<"p">, "children">,
    FooterComponentLabels,
    ComponentProps {}

/** Footer legal subcomponent for displaying the legal text. */
const FooterLegal: React.FC<FooterLegalProps> = setDisplayName(
  function FooterLegal(props) {
    const { className, internalId, debugMode, legalText, ...rest } = props;

    const { id, isDebugMode } = useComponentId({
      internalId,
      debugMode,
    });

    if (!hasMeaningfulText(legalText)) return null;

    const element = (
      <p
        {...rest}
        className={cn(styles.footerLegal, className)}
        data-footer-legal-id={id}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="footer-legal-root"
      >
        {legalText}
      </p>
    );

    return element;
  }
);

export { FooterLegal };
