import { Div } from "@guyromellemagayano/components";

import type { ProseProps } from "@web/components/prose";
import { cn } from "@web/lib";

import styles from "./Prose.module.css";

/** A component that renders a prose element. */
export const Prose = function Prose(props: ProseProps) {
  const { className, ...rest } = props;

  return <Div className={cn(styles.proseContainer, className)} {...rest} />;
};

Prose.displayName = "Prose";
