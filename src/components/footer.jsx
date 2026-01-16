"use client";
import styled, { keyframes } from "styled-components";
import { theme } from "../tokens/themes.js";
import { FaInstagram, FaTiktok, FaFacebook, FaTwitter } from "react-icons/fa";

/* WAVE GLOW ANIMATION */
const waveGlowAnim = keyframes`
  0% { 
    box-shadow: 0 0 5px rgba(180, 150, 255, 0.3), 0 0 10px rgba(180, 150, 255, 0.2), 0 0 15px rgba(180, 150, 255, 0.1);
  }
  25% { 
    box-shadow: 0 0 10px rgba(210, 180, 255, 0.4), 0 0 20px rgba(210, 180, 255, 0.3), 0 0 30px rgba(210, 180, 255, 0.2);
  }
  50% { 
    box-shadow: 0 0 15px rgba(240, 210, 255, 0.5), 0 0 30px rgba(240, 210, 255, 0.4), 0 0 45px rgba(240, 210, 255, 0.3);
  }
  75% { 
    box-shadow: 0 0 10px rgba(210, 180, 255, 0.4), 0 0 20px rgba(210, 180, 255, 0.3), 0 0 30px rgba(210, 180, 255, 0.2);
  }
  100% { 
    box-shadow: 0 0 5px rgba(180, 150, 255, 0.3), 0 0 10px rgba(180, 150, 255, 0.2), 0 0 15px rgba(180, 150, 255, 0.1);
  }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.1); opacity: 0.8; }
  100% { transform: scale(1); opacity: 0.5; }
`;

/* ===== BASE FOOTER ===== */
const BaseFooter = styled.footer`
  font-family: ${theme.fonts.body};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  font-size: 0.9rem;
  letter-spacing: 0.4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  text-align: center;
  box-shadow: 0 -3px 10px rgba(0, 0, 0, 0.3);
  min-height: 60px;
  width: 100%;
  box-sizing: border-box;
`;

/* ===== VARIANTS ===== */
const variants = {
  center: styled(BaseFooter)`
    background: linear-gradient(135deg, #1a1635, #2a1d52);
    color: ${theme.colors.text};

    p { margin: 0; font-weight: 500; color: #e5e2ff; }
    small { font-size: 0.8rem; opacity: 0.75; line-height: 1.4; display: block; max-width: 480px; color: #c8c4f0; }
  `,
  gradient: styled(BaseFooter)`
    background: ${props => props.theme === 'light' 
      ? 'linear-gradient(135deg, #e2e8f0, #cbd5e1)' 
      : 'linear-gradient(135deg, #2b2060, #3d2c7d)'};
    color: ${props => props.theme === 'light' ? '#2d1b69' : '#f3eaff'};
    font-weight: 600;

    .socials { display: flex; gap: ${theme.spacing.md}; margin-top: ${theme.spacing.sm}; }

    .socials a {
      text-decoration: none; color: ${props => props.theme === 'light' ? '#4a3c7d' : '#f3eaff'}; font-size: 1.4rem; transition: 0.3s ease;
      &:hover { color: ${props => props.theme === 'light' ? '#6b5b95' : '#bca8ff'}; transform: scale(1.15); }
    }

    p { margin: 0; font-size: 0.95rem; color: ${props => props.theme === 'light' ? '#2d1b69' : '#ede6ff'}; }
    small { font-size: 0.8rem; color: ${props => props.theme === 'light' ? '#4a3c7d' : '#cfc5ff'}; }
  `,
  links: styled(BaseFooter)`
    background: ${props => props.theme === 'light' 
      ? 'linear-gradient(135deg, #f8fafc, #f1f5f9)' 
      : 'linear-gradient(135deg, #1f1840, #30275e)'};
    color: ${props => props.theme === 'light' ? '#2d1b69' : '#e9e3ff'};
    align-items: flex-start;
    text-align: left;
    padding: ${theme.spacing.lg};
    gap: ${theme.spacing.md};

    .footer-top { display: flex; justify-content: space-between; width: 100%; flex-wrap: wrap; gap: ${theme.spacing.md}; }
    .col { flex: 1; min-width: 180px; }
    .col h4 { margin-bottom: ${theme.spacing.sm}; font-family: ${theme.fonts.title}; font-size: 1rem; color: ${props => props.theme === 'light' ? '#2d1b69' : '#d0c3ff'}; }
    .col a { display: block; color: ${props => props.theme === 'light' ? '#4a3c7d' : '#e9e3ff'}; text-decoration: none; font-size: 0.9rem; margin: 3px 0; &:hover { color: ${props => props.theme === 'light' ? '#6b5b95' : '#b79aff'}; } }

    input { padding: 8px 12px; border-radius: ${theme.radius.sm}; border: none; outline: none; width: 80%; background: ${props => props.theme === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255,255,255,0.1)'}; color: ${props => props.theme === 'light' ? '#2d1b69' : 'white'}; }
    button { margin-top: 6px; padding: 6px 12px; background: ${props => props.theme === 'light' ? '#6b5b95' : '#b79aff'}; color: ${props => props.theme === 'light' ? 'white' : '#1a1635'}; border: none; border-radius: ${theme.radius.sm}; cursor: pointer; font-weight: 600; transition: 0.3s ease; &:hover { background: ${props => props.theme === 'light' ? '#4a3c7d' : '#d0c3ff'}; } }

    .bottom { width: 100%; text-align: center; margin-top: ${theme.spacing.md}; font-size: 0.8rem; opacity: 0.7; }
  `,
  waveGlow: styled(BaseFooter)`
    background: linear-gradient(135deg, #1a1435, #281f50);
    color: #f3eaff;
    border: 2px solid rgba(180, 150, 255, 0.3);
    animation: ${waveGlowAnim} 3s ease-in-out infinite;
    position: relative;
    overflow: hidden;
    border-radius: ${theme.radius.md};

    &:before {
      content: '';
      position: absolute;
      top:0; left:0;
      width: 100%; height: 100%;
      background: radial-gradient(circle at center, rgba(180,150,255,0.1) 0%, transparent 70%);
      animation: ${pulse} 4s linear infinite;
    }

    p, small { position: relative; z-index:1; }
    p { margin: 0; font-size: 1rem; font-weight: 600; color: #e9e3ff; }
    small { font-size: 0.85rem; color: #cfc5ff; }
  `,
};

/* ===== FOOTER COMPONENT === */
export const Footer = ({ variant = "center", content = {} }) => {
  const Variant = variants[variant] || variants.center;

  return (
    <Variant>
      {variant === "center" && (
        <>
          <p>{content.p}</p>
          <small>{content.small}</small>
        </>
      )}

      {variant === "gradient" && (
        <>
          <p>{content.p}</p>
          <small>{content.small}</small>
          <div className="socials">
            {(content.socials || []).map((s, i) => {
              switch (s.toLowerCase()) {
                case "instagram":
                  return <FaInstagram key={i} />;
                case "tiktok":
                  return <FaTiktok key={i} />;
                case "facebook":
                  return <FaFacebook key={i} />;
                case "twitter":
                  return <FaTwitter key={i} />;
                default:
                  return null;
              }
            })}
          </div>
        </>
      )}

      {variant === "links" && (
        <>
          <div className="footer-top">
            {(content.columns || []).map((col, idx) => (
              <div className="col" key={idx}>
                <h4>{col.title}</h4>
                {col.links?.map((l, i) => (
                  <a key={i} href={l.href}>
                    {l.label}
                  </a>
                ))}
                {col.input && <input type="text" placeholder={col.input.placeholder} />}
                {col.button && <button>{col.button.label}</button>}
              </div>
            ))}
          </div>
          <div className="bottom">{content.bottom}</div>
        </>
      )}

      {variant === "waveGlow" && (
        <>
          <p>{content.p}</p>
          <small>{content.small}</small>
        </>
      )}
    </Variant>
  );
};

