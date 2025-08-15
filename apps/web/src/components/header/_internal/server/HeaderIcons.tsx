import { Svg } from "@guyromellemagayano/components";

import type { CommonIconComponent } from "@web/components/header";

/** A close icon component. */
export const CloseIcon: CommonIconComponent = function CloseIcon(props) {
  const { ...rest } = props;

  return (
    <Svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...rest}>
      <path
        d="m17.25 6.75-10.5 10.5m0-10.5 10.5 10.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

CloseIcon.displayName = "CloseIcon";

/** A chevron down icon component. */
export const ChevronDownIcon: CommonIconComponent = function ChevronDownIcon(
  props
) {
  const { ...rest } = props;

  return (
    <Svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...rest}>
      <path
        d="m6 9 6 6 6-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

ChevronDownIcon.displayName = "ChevronDownIcon";

/** A sun icon component. */
export const SunIcon: CommonIconComponent = function SunIcon(props) {
  const { ...rest } = props;

  return (
    <Svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...rest}>
      <circle
        cx="12"
        cy="12"
        r="3.25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

SunIcon.displayName = "SunIcon";

/** A moon icon component. */
export const MoonIcon: CommonIconComponent = function MoonIcon(props) {
  const { ...rest } = props;

  return (
    <Svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...rest}>
      <path
        d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

MoonIcon.displayName = "MoonIcon";
