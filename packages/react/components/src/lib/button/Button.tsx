import { ButtonHTMLAttributes, forwardRef } from 'react'

export type ButtonRef = HTMLButtonElement
export type ButtonProps = ButtonHTMLAttributes<ButtonRef>

/**
 * Render the button component.
 * @param type - The type of the button.
 * @param children - The children of the button.
 * @param rest - The rest of the props of the button.
 * @returns The rendered button component.
 */
const Button = forwardRef<ButtonRef, ButtonProps>(
  ({ type = 'button', children, ...rest }, ref) => {
    return (
      <button ref={ref} type={type} {...rest}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
