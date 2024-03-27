import { HTMLAttributes, forwardRef } from 'react'

export type KeyboardInputRef = HTMLElement
export type KeyboardInputProps = HTMLAttributes<KeyboardInputRef>

/**
 * Render the keyboard input component.
 * @param children - The children of the keyboard input.
 * @param rest - The rest of the props of the keyboard input.
 * @returns The rendered keyboard input component.
 */
export const KeyboardInput = forwardRef<KeyboardInputRef, KeyboardInputProps>(
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
