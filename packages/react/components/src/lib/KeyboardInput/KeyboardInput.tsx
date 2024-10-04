import React from 'react'

export type TKeyboardInputRef = HTMLElement
export type TKeyboardInputProps = React.HTMLAttributes<TKeyboardInputRef>

/**
 * Render the keyboard input component.
 * @param {TKeyboardInputProps} props - The keyboard input component properties
 * @param {TKeyboardInputRef} ref - The keyboard input component reference
 * @returns The rendered keyboard input component
 */
const KeyboardInput = React.forwardRef<TKeyboardInputRef, TKeyboardInputProps>(
  ({ children, ...rest }, ref) => {
    return (
      <kbd ref={ref} {...rest}>
        {children}
      </kbd>
    )
  }
)

KeyboardInput.displayName = 'KeyboardInput'

export default KeyboardInput
