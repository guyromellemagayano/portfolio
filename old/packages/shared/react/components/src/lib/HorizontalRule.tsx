'use client';

import { forwardRef, type HTMLAttributes } from 'react';

export type THorizontalRuleRef = HTMLHRElement;
export type THorizontalRuleProps = HTMLAttributes<THorizontalRuleRef>;

/**
 * Render the horizontal rule component
 * @param {THorizontalRuleProps} props - The horizontal rule component properties
 * @param {THorizontalRuleRef} ref - The horizontal rule component reference
 * @returns The rendered horizontal rule component
 */
const HorizontalRule = forwardRef<THorizontalRuleRef, THorizontalRuleProps>(
  ({ ...rest }, ref) => {
    return <hr ref={ref} {...rest} />;
  },
);

HorizontalRule.displayName = 'HorizontalRule';

export default HorizontalRule;
