"use client";
import styled, { keyframes } from "styled-components";
import { theme } from "../tokens/themes.js";

/* GLOW TITLE ANIMATION */
const glowTitleAnim = keyframes`
  0% { text-shadow: 0 0 5px #b79aff, 0 0 10px #cbb7ff; }
  50% { text-shadow: 0 0 12px #e1d4ff, 0 0 22px #d4c2ff; }
  100% { text-shadow: 0 0 5px #b79aff, 0 0 10px #cbb7ff; }
`;

/* wave-like light moving across text */
const waveLightAnim = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

/* animated gradient line moving left to right */
const gradientLineRightAnim = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
`;

/* animated gradient line moving right to left */
const gradientLineLeftAnim = keyframes`
  0% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

/* ===== BASE HEADER ===== */
const BaseHeader = styled.header`
  width: 100%;
  padding: 1.2rem 2rem;
  font-family: ${theme.fonts.title};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: ${theme.effects.transition};
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  min-height: 80px;
  border-radius: 0;
  margin: 0;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 0.8rem 1rem;
    min-height: 64px;
    align-items: center;
    justify-content: center;
  }
`;

/* ===== HEADER VARIANTS ===== */
const variants = {
  default: styled(BaseHeader)`
    background: linear-gradient(135deg, #1a1635, #2b2060);
    color: ${theme.colors.text};

    h3 {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      margin: 0;
      font-size: 1.8rem;
      letter-spacing: 1px;
      color: ${theme.colors.text};
    }

    nav {
      position: absolute;
      right: 2rem;
      display: flex;
      gap: 1.2rem;

      a {
        color: ${theme.colors.text};
        text-decoration: none;
        font-weight: 500;
        transition: color 0.3s ease;

        &:hover {
          color: ${theme.colors.primarySoft};
        }
      }
    }

    @media (max-width: 768px) {
      h3 {
        position: static;
        transform: none;
        text-align: center;
        font-size: 1.2rem;
      }

      nav {
        position: static;
        right: auto;
        margin-top: ${theme.spacing.xs};
        gap: ${theme.spacing.sm};
      }
    }
  `,

  center: styled(BaseHeader)`
    background: ${props => props.theme.gradients.headerGradient};
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    h3 {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      margin: 0;
      font-size: 2.2rem;
      font-weight: bold;
      letter-spacing: 1px;
      color: #fff;
      text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
    }

    nav {
      position: absolute;
      right: 2rem;
      display: flex;
      gap: 1.5rem;
      align-items: center;

      a {
        color: #fff;
        text-decoration: none;
        font-weight: 500;
        font-size: 1rem;
        transition: color 0.3s ease;

        &:hover {
          color: #b79aff;
        }
      }
    }

    @media (max-width: 768px) {
      h3 {
        position: static;
        transform: none;
        text-align: center;
        font-size: 1.5rem;
      }

      nav {
        position: static;
        right: auto;
        margin-top: ${theme.spacing.sm};
        gap: ${theme.spacing.md};
      }
    }
  `,

  withLogo: styled(BaseHeader)`
    background: ${props => props.theme === 'light' 
      ? 'linear-gradient(135deg, #f1f5f9, #e2e8f0)' 
      : 'linear-gradient(135deg, #1a1635 0%, #33276a 100%)'};
    color: ${props => props.theme === 'light' ? '#2d1b69' : '#fff'};

    img {
      position: absolute;
      left: 2rem;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 2px solid ${props => props.theme === 'light' ? '#6b5b95' : '#cbb8ff'};
      box-shadow: 0 0 8px ${props => props.theme === 'light' ? 'rgba(107, 91, 149, 0.4)' : 'rgba(162, 136, 255, 0.4)'};
      object-fit: cover;
    }

    h2 {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      margin: 0;
      font-weight: bold;
      font-size: 1.8rem;
      letter-spacing: 0.5px;
      color: ${props => props.theme === 'light' ? '#2d1b69' : '#eae4ff'};
      text-shadow: 0 2px 5px ${props => props.theme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.5)'};
    }

    nav {
      position: absolute;
      right: 2rem;
      display: flex;
      gap: 1.2rem;

      a {
        color: ${props => props.theme === 'light' ? '#4a3c7d' : '#fff'};
        text-decoration: none;
        font-weight: 500;
        transition: color 0.3s ease;

        &:hover {
          color: ${props => props.theme === 'light' ? '#6b5b95' : '#b79aff'};
        }
      }
    }

    @media (max-width: 768px) {
      img {
        position: static;
        width: 38px;
        height: 38px;
        margin-right: ${theme.spacing.md};
      }

      h2 {
        position: static;
        left: auto;
        transform: none;
        font-size: 1.1rem;
      }

      nav {
        position: static;
        right: auto;
        margin-left: 0;
        gap: ${theme.spacing.sm};
      }
    }
  `,

  withImage: styled(BaseHeader)`
    /* Sekarang image berasal dari props 'image' */
    background: ${({ image }) =>
      `url("${image || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80"}") center/cover no-repeat`};
    color: white;
    backdrop-filter: blur(2px);

    h2 {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      margin: 0;
      font-weight: bold;
      font-size: 1.8rem;
      color: #d9cfff;
      text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
    }

    nav {
      position: absolute;
      right: 2rem;
      display: flex;
      gap: 1.2rem;

      a {
        color: #fff;
        text-decoration: none;
        font-weight: 500;

        &:hover {
          color: #b79aff;
        }
      }
    }

    @media (max-width: 768px) {
      h2 {
        position: static;
        left: auto;
        transform: none;
        font-size: 1.1rem;
      }

      nav {
        position: static;
        right: auto;
        margin-top: ${theme.spacing.xs};
        gap: ${theme.spacing.sm};
      }
    }
  `,

  glowTitle: styled(BaseHeader)`
    background: linear-gradient(135deg, #1f1736, #322664);
    color: white;

    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      z-index: 1;
      pointer-events: none;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(220, 200, 255, 1) 50%,
        rgba(255, 255, 255, 0) 100%
      );
      background-size: 400% 100%;
      animation: ${gradientLineRightAnim} 4s linear infinite;
    }

    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      z-index: 1;
      pointer-events: none;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(180, 150, 255, 1) 50%,
        rgba(255, 255, 255, 0) 100%
      );
      background-size: 400% 100%;
      animation: ${gradientLineLeftAnim} 4s linear infinite;
    }

    h1 {
      position: relative;
      z-index: 2;
      font-size: 2rem;
      margin: 0;
      letter-spacing: 1px;
      text-align: center;
      color: #fff;
      text-shadow: 0 2px 10px rgba(220, 200, 255, 0.25),
        0 1px 0 rgba(0, 0, 0, 0.22);
      animation: ${glowTitleAnim} 3.6s ease-in-out infinite;
    }

    nav {
      position: absolute;
      right: 2rem;
      display: flex;
      gap: 1.2rem;

      a {
        color: #fff;
        text-decoration: none;
        font-weight: 500;
        transition: color 0.3s ease;

        &:hover {
          color: #b79aff;
          text-shadow: 0 0 8px rgba(183, 154, 255, 0.5);
        }
      }
    }

    @media (max-width: 768px) {
      nav {
        position: static;
        right: auto;
        margin-top: ${theme.spacing.xs};
        gap: ${theme.spacing.sm};
      }

      h1 {
        font-size: 1.2rem;
      }
    }
  `,
};

/* ===== HEADER COMPONENT ===== */
export const Header = ({
  variant = "default",
  title,
  logo,
  image, 
  navLinks,
  children,
  meta
}) => {
  const Variant = variants[variant] || variants.default;

  const renderNav = () => {
    if (Array.isArray(navLinks) && navLinks.length) {
      return (
        <nav>
          {navLinks.map((n, i) => (
            <a key={i} href={n.href || "#"}>
              {n.label}
            </a>
          ))}
        </nav>
      );
    }

    return (
      <nav>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </nav>
    );
  };

  return (
    <Variant image={image}>
      {children ? (
        children
      ) : (
        <>
          {variant === "withLogo" && (
            <>
              <img
                src={
                  logo ||
                  "https://img.pikbest.com/png-images/20241029/cute-little-cat-logo-_11020831.png!sw800"
                }
                alt="logo"
              />
              <h2>{title || "Header With Logo"}</h2>
              {renderNav()}
            </>
          )}

          {variant === "withImage" && (
            <>
              <img
                src={
                  logo ||
                  ""
                }
                alt="logo"
              />
              <h2>{title || "Header With Image"}</h2>
              {renderNav()}
            </>
          )}

          {variant === "glowTitle" && (
            <>
              <h1>{title || "Header With Glow Title"}</h1>
              {renderNav()}
            </>
          )}

          {variant === "default" && (
            <>
              <h3>{title || "Header Default"}</h3>
              {renderNav()}
            </>
          )}

          {variant === "center" && (
            <>
              <h3>{title || "Laventa UI"}</h3>
              {renderNav()}
            </>
          )}

          {meta && (
            <div
              style={{
                position: "absolute",
                left: "1rem",
                bottom: "6px",
                fontSize: "0.85rem",
                color: "rgba(255,255,255,0.85)",
              }}
            >
              {meta}
            </div>
          )}
        </>
      )}
    </Variant>
  );
};
