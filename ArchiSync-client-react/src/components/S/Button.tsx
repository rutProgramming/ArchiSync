import type { ButtonHTMLAttributes, ReactNode } from "react"
import { cn } from "./utils"
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  icon?: ReactNode
  iconPosition?: "left" | "right"
}

const Button = ({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "button",
        `button-${variant}`,
        `button-${size}`,
        // icon && "button-with-icon",
        // icon && iconPosition === "right" && "button-icon-right",
        className,
      )}
      {...props}
    >
      {icon && iconPosition === "left" && <span className="button-icon">{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span className="button-icon">{icon}</span>}
    </button>
  )
}

export default Button
