"use client";
import styled, { keyframes, css } from "styled-components";
import { theme } from "../tokens/themes.js";

/* ================= BASE ================= */
const BaseButton = styled.button`
  font-family: ${theme.fonts.body};
  border: none;
  border-radius: ${theme.radius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all ${theme.effects.transition};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.xs};

  &:hover {
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }
`;

/* ================= ANIMATION ================= */
const breathingAnim = keyframes`
  0% { box-shadow: 0 0 8px rgba(180,150,255,0.4); }
  50% { box-shadow: 0 0 18px rgba(210,180,255,0.8); }
  100% { box-shadow: 0 0 8px rgba(180,150,255,0.4); }
`;

/* ================= SIZE STYLES ================= */
const sizeStyles = {
  sm: css`
    padding: ${theme.spacing.xs} ${theme.spacing.md};
    font-size: 0.875rem;
  `,
  md: css`
    padding: ${theme.spacing.sm} ${theme.spacing.lg};
    font-size: 1rem;
  `,
  lg: css`
    padding: ${theme.spacing.md} ${theme.spacing.xl};
    font-size: 1.125rem;
  `,
};

/* ================= VARIANT STYLES ================= */
const variantStyles = {
  primary: css`
    background: ${theme.gradients.lavender};
    color: white;
    box-shadow: ${theme.effects.heavyShadow};
  `,

  outline: css`
    background: transparent;
    border: 2px solid ${theme.colors.primary};
    color: ${theme.colors.primarySoft};
    &:hover {
      background: ${theme.colors.primary};
      color: white;
    }
  `,

  glow: css`
    background: ${theme.colors.primary};
    color: white;
    box-shadow: 0 0 15px ${theme.colors.accent};
    &:hover {
      box-shadow: 0 0 25px ${theme.colors.gold};
    }
  `,

  pill: css`
    background: ${theme.colors.primarySoft};
    color: ${theme.colors.text};
    border-radius: ${theme.radius.pill};
    border: 1px solid ${theme.colors.border};
    &:hover {
      background: ${theme.colors.softGlow};
    }
  `,

  iconRight: css`
    background: ${theme.gradients.lavender};
    color: white;
    svg {
      font-size: 1.1rem;
      margin-left: ${theme.spacing.xs};
    }
  `,

  breathing: css`
    background: ${theme.colors.primary};
    color: white;
    animation: ${breathingAnim} 3s ease-in-out infinite;
  `,
};

/* ================= FINAL STYLED BUTTON ================= */
const StyledButton = styled(BaseButton)`
  ${({ size }) => sizeStyles[size] || sizeStyles.md}
  ${({ variant }) => variantStyles[variant] || variantStyles.primary}
`;

/* ================= COMPONENT ================= */
export const Button = ({
  variant = "primary",
  size = "md",
  children,
  label,
  disabled = false,
  onClick,
  type = "button",
  className,
  ...props
}) => {
  const content = label || children;

  return (
    <StyledButton
      variant={variant}
      size={size}
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={className}
      {...props}
    >
      {content}
    </StyledButton>
  );
};
