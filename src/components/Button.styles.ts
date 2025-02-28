import styled, { css } from "styled-components";

export type ButtonVariant = "primary" | "secondary" | "success" | "danger";

interface ButtonContainerProps {
  variant: ButtonVariant;
}

const buttonVariants = {
  primary: "purple",
  secondary: "orange",
  success: "red",
  danger: "green",
};

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;
  border-radius: 4px;
  border: 0;
  margin: 8px;

  background-color: ${({ theme }) => theme["green-500"]};
  color: ${({ theme }) => theme.white};

  /* ${({ variant }) => css`
    background-color: ${buttonVariants[variant]};
  `} */
`;
