import { ButtonContainer, ButtonVariant } from "./Button.styles";

interface ButtonProps {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

export function Button({ variant = "primary", children }: ButtonProps) {
  return <ButtonContainer variant={variant}>{children}</ButtonContainer>;
}
