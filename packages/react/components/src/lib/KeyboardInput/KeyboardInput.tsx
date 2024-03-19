import { HTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type KeyboardInputRef = HTMLElement
export type KeyboardInputProps = HTMLAttributes<KeyboardInputRef>

/**
 * Render the keyboard input component.
 * @param children - The children of the keyboard input.
 * @param rest - The rest of the props of the keyboard input.
 * @returns The rendered keyboard input component.
 */
const KeyboardInput = forwardRef<KeyboardInputRef, KeyboardInputProps>(
  ({ children, ...rest }, ref) => {
    return (
      <kbd ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </kbd>
    )
  }
)

KeyboardInput.displayName = 'KeyboardInput'

export default KeyboardInput
