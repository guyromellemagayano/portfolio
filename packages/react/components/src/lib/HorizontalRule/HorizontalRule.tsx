'use client'

import { HTMLAttributes, forwardRef } from 'react'

export type HorizontalRuleRef = HTMLHRElement
export type HorizontalRuleProps = HTMLAttributes<HorizontalRuleRef>

/**
 * Render the horizontal rule component.
 * @param children - The children of the horizontal rule.
 * @param rest - The rest of the props of the horizontal rule.
 * @returns The rendered horizontal rule component.
 */
export const HorizontalRule = forwardRef<
  HorizontalRuleRef,
  HorizontalRuleProps
>(({ ...rest }, ref) => {
  return <hr ref={ref} {...rest} />
})

HorizontalRule.displayName = 'HorizontalRule'

export default HorizontalRule
