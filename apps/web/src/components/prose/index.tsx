import { Div, type DivProps } from "@guyromellemagayano/components";

import { cn } from "@web/lib";

export interface ProseProps extends DivProps {}

/**
 * A component that renders a prose element.
 */
export const Prose = (props: ProseProps) => {
  const { className, ...rest } = props;

  return <Div className={cn("prose dark:prose-invert", className)} {...rest} />;
};

Prose.displayName = "Prose";
