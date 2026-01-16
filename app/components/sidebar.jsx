// Sidebar.jsx
"use client";
import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { theme } from "../tokens/themes.js";

/* ==== STAGGER ANIMATION ==== */
const fadeSlide = keyframes`
  0% { opacity: 0; transform: translateX(-12px); }
  100% { opacity: 1; transform: translateX(0); }
`;

/* ==== BORDER FLOW ANIMATION (ONLY FOR menuStagger) ==== */
const borderFlow = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
`;

/* ===== BASE SIDEBAR ===== */
const BaseSidebar = styled.aside`
  height: 100%;
  padding: ${theme.spacing.lg};
  color: white;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  transition: ${theme.effects.transition};
  border-radius: 0;
  width: 200px;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;

  h3 {
    margin: 0 0 ${theme.spacing.sm} 0;
    font-family: ${theme.fonts.title};
    font-size: 1.1rem;
  }

  button {
    background: none;
    border: none;
    color: inherit;
    text-align: left;
    padding: ${theme.spacing.sm};
    font-family: ${theme.fonts.body};
    font-weight: 500;
    cursor: pointer;
    border-radius: ${theme.radius.sm};
    transition: all ${theme.effects.transition};
    display: flex;
    align-items: center;
    gap: 8px;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    &.active {
      background: rgba(255, 255, 255, 0.25);
      box-shadow: 0 0 12px rgba(167, 139, 250, 0.6);
    }
  }
`;

/* ===== SIDEBAR VARIANTS ===== */

// Variant Gradient 
const TextSidebar = styled(BaseSidebar)`
  background: linear-gradient(180deg, #4b3ca3, #2a1f5d);
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
`;

// Variant Glass 
const IconSidebar = styled(BaseSidebar)`
  background: ${props => props.theme === 'light' 
    ? 'linear-gradient(180deg, #f1f5f9, #e2e8f0)' 
    : 'linear-gradient(180deg, #31296d, #1c163f)'};
  box-shadow: 0 0 15px ${props => props.theme === 'light' ? 'rgba(0, 0, 0, 0.15)' : 'rgba(0, 0, 0, 0.4)'};

  button {
    gap: 10px;

    border-bottom: 1px solid ${props => props.theme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.12)'};
    border-radius: 0;
  }

  button:last-child {
    border-bottom: none;
  }
`;

// Variant modern
const ButtonSidebar = styled(BaseSidebar)`
  background: ${props => props.theme === 'light' 
    ? 'linear-gradient(180deg, #f8fafc, #f1f5f9)' 
    : 'linear-gradient(180deg, #20193d, #352870)'};
  padding-top: ${theme.spacing.xl};

  .bottom-btn {
    margin-top: auto;
    background: ${props => props.theme === 'light' ? '#6b5b95' : theme.colors.primarySoft};
    color: ${props => props.theme === 'light' ? 'white' : '#fff'};
    padding: 8px 12px;
    border: none;
    border-radius: ${theme.radius.sm};
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background: ${props => props.theme === 'light' ? '#4a3c7d' : theme.colors.primary};
    }
  }
`;

/* Variant BorderAnimation */
const BorderAnimationSidebar = styled(BaseSidebar)`
  position: relative;
  background: ${props => props.theme === 'light' 
    ? 'linear-gradient(180deg, #f1f5f9, #e2e8f0)' 
    : 'linear-gradient(180deg, #3a2f78, #241b4a)'};
  box-shadow: 0 0 14px ${props => props.theme === 'light' ? 'rgba(0, 0, 0, 0.12)' : 'rgba(0, 0, 0, 0.35)'};
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    padding: 2px;
    border-radius: inherit;
    background: ${props => props.theme === 'light' 
      ? 'linear-gradient(90deg, #6b5b95, #4a3c7d, #6b5b95, #4a3c7d, #6b5b95)' 
      : 'linear-gradient(90deg, #a78bfa, #7c7cff, #b794f4, #7c7cff, #a78bfa)'};
    background-size: 200% 200%;
    animation: ${borderFlow} 4s linear infinite;

    -webkit-mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  button {
    position: relative;
    opacity: 0;
    animation: ${fadeSlide} 0.45s ease forwards;
    z-index: 1;
  }
`;

/* Variant mapping */
const variants = {
  gradient: TextSidebar,
  glass: IconSidebar,
  modern: ButtonSidebar,
  BorderAnimation: BorderAnimationSidebar,
};

/* ===== SIDEBAR COMPONENT ===== */
export const Sidebar = ({ 
  variant = "gradient", 
  menu = [], 
  onSelect,
  bottomButton,   
  title = "Navigasi"
}) => {
  const Variant = variants[variant] || variants.gradient;
  const [activeItem, setActiveItem] = useState(null);

  const displayMenu = menu.length > 0 ? menu : [
    { label: "Home", icon: "🏠" },
    { label: "About", icon: "👤" },
    { label: "Services", icon: "⚙️" },
    { label: "Contact", icon: "📞" }
  ];

  return (
    <Variant>
      <h3>{title}</h3>

      {displayMenu.map((item, index) => (
        <button
          key={item.label}
          className={activeItem === item.label ? "active" : ""}
          onClick={() => {
            setActiveItem(item.label);
            onSelect && onSelect(item.label.toLowerCase());
          }}
          style={variant === "menuStagger" ? { animationDelay: `${index * 0.08}s` } : {}}
        >
          {(variant === "glass" || variant === "menuStagger") && item.icon && <span>{item.icon}</span>}
          {item.label}
        </button>
      ))}

      {variant === "modern" && bottomButton && (
        <button 
          className="bottom-btn" 
          onClick={() => bottomButton.onClick && bottomButton.onClick()}
        >
          {bottomButton.label}
        </button>
      )}
    </Variant>
  );
};
