import React from 'react'

export type HorizontalRuleRef = HTMLHRElement
export type HorizontalRuleProps = React.HTMLAttributes<HorizontalRuleRef>

/**
 * Render the horizontal rule component
 * @param {HorizontalRuleProps} props - The horizontal rule component properties
 * @param {HorizontalRuleRef} ref - The horizontal rule component reference
 * @returns The rendered horizontal rule component
 */
const HorizontalRule = React.forwardRef<HorizontalRuleRef, HorizontalRuleProps>(
  (props, ref) => {
    const { ...rest } = props

    return <hr ref={ref} {...rest} />
  }
)

HorizontalRule.displayName = 'HorizontalRule'

export default HorizontalRule
