import { Svg } from "@guyromellemagayano/components";

import type { ChevronRightIconProps } from "@web/components/card";

/** A component that renders a chevron right icon. */
export const ChevronRightIcon = function ChevronRightIcon(
  props: ChevronRightIconProps
) {
  return (
    <Svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6.75 5.75 9.25 8l-2.5 2.25"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

ChevronRightIcon.displayName = "ChevronRightIcon";
