"use client";
import styled, { keyframes } from "styled-components";
import { theme } from "../tokens/themes.js"; 
import { Button } from "./button.jsx";  

/* SHIMMER ANIMATION */
const shimmerAnim = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

// BASE CARD
const CardBase = styled.div`
  border-radius: ${theme.radius.lg};
  padding: ${theme.spacing.md};
  color: ${theme.colors.text};
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  box-shadow: 0 6px 20px ${theme.colors.shadow};
  transition: all 0.3s ease;
  overflow: hidden;

  width: 340px;
  max-width: 340px;
  min-width: 340px;

  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 10px 25px rgba(130, 80, 220, 0.35);
  }

  h2, h3, h4 {
    font-family: ${theme.fonts.title};
    color: ${theme.colors.primarySoft};
    margin-bottom: ${theme.spacing.sm};
  }

  p {
    font-size: 0.9rem;
    color: ${theme.colors.textSoft};
    line-height: 1.5;
  }
`;

const GlassCard = styled(CardBase)`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  text-align: left;
  border: 1px solid rgba(255,255,255,0.04);
  box-shadow: 0 10px 30px rgba(2,2,7,0.6);

  h2, h3, h4 {
    color: #A78BFA;
  }

  p {
    color: #9CA3AF;
  }
`;

const ProfileCard = styled(CardBase)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(145deg, #221a3d, #2d1f58);
  text-align: center;
  border: 1px solid rgba(255,255,255,0.04);
  box-shadow: 0 10px 30px rgba(2,2,7,0.6);

  h2, h3, h4 {
    color: #A78BFA;
  }

  p {
    color: #9CA3AF;
  }

  img {
    width: 90px;
    height: 90px;
    object-fit: cover;
    border-radius: 50%;
    border: 2px solid #A78BFA;
    margin-bottom: ${theme.spacing.sm};
  }
`;

const StatsCard = styled(CardBase)`
  background: linear-gradient(180deg, #1e163b, #2a1e52);
  text-align: center;
  padding: ${theme.spacing.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 220px;
  border: 1px solid rgba(255,255,255,0.04);
  box-shadow: 0 10px 30px rgba(2,2,7,0.6);

  .image-box {
    width: 100%;
    height: 150px;
    border-radius: ${theme.radius.md};
    overflow: hidden;
    margin-bottom: ${theme.spacing.md};
    border: 1px solid rgba(160, 120, 255, 0.3);
    box-shadow: 0 0 10px rgba(140, 90, 255, 0.25);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease, filter 0.3s ease;
    }

    &:hover img {
      transform: scale(1.06);
      filter: brightness(1.1);
    }
  }

  h2 {
    color: #A78BFA;
    font-size: 1.8rem;
    margin-bottom: ${theme.spacing.xs};
  }

  p {
    color: #9CA3AF;
  }
`;

const FeatureCard = styled(CardBase)`
  background: linear-gradient(180deg, #1d1636, #291e4f);
  text-align: center;
  padding: ${theme.spacing.lg};
  border: 1px solid rgba(255,255,255,0.04);
  box-shadow: 0 10px 30px rgba(2,2,7,0.6);
  .image-box {
    width: 100%;
    height: 150px;
    border-radius: ${theme.radius.md};
    overflow: hidden;
    margin-bottom: ${theme.spacing.md};
    border: 1px solid ${theme.colors.primarySoft};
    position: relative;
    box-shadow: 0 0 15px rgba(160, 120, 255, 0.25);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: brightness(0.85);
      transition: all 0.4s ease;
    }

    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at center, rgba(180, 120, 255, 0.15), transparent 70%);
      pointer-events: none;
    }

    &:hover img {
      transform: scale(1.05);
      filter: brightness(1);
    }
  }

  h3 {
    color: #A78BFA;
    margin-bottom: ${theme.spacing.xs};
  }

  p {
    color: #9CA3AF;
    font-size: 0.9rem;
  }
`;

/* NEW VARIANT — SHIMMER */
const ShimmerCard = styled(CardBase)`
  background: linear-gradient(90deg, rgba(255,255,255,0.05), rgba(255,255,255,0.2), rgba(255,255,255,0.05));
  background-size: 400px 100%;
  animation: ${shimmerAnim} 2.5s infinite linear;
  border: 1px solid rgba(255,255,255,0.04);
  box-shadow: 0 10px 30px rgba(2,2,7,0.6);

  h2, h3, h4 {
    color: #A78BFA;
  }

  p {
    color: #9CA3AF;
  }
`;

export const Card = ({ 
  variant = "glass", 
  children, 
  title, 
  description, 
  actionLabel, 
  onAction,
  image,
  stats 
}) => {
  const renderContent = () => {
    if (children) return children;
    
    return (
      <>
        {image && (
          <div className="image-box">
            <img src={image} alt={title || "Card image"} />
          </div>
        )}
        
        {title && <h3>{title}</h3>}
        
        {description && <p>{description}</p>}
        
        {stats && (
          <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginTop: 'auto' }}>
            {Array.isArray(stats) ? (
              stats.map((stat, index) => (
                <div key={index} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: theme.colors.primarySoft }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: theme.colors.textSoft }}>
                    {stat.label}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: theme.colors.primarySoft }}>
                  {stats}
                </div>
                <div style={{ fontSize: '0.8rem', color: theme.colors.textSoft }}>
                  Progress
                </div>
              </div>
            )}
          </div>
        )}
        
        {actionLabel && onAction && variant !== 'glass' && (
          <div style={{ 
            marginTop: (variant === 'stats' || variant === 'profile' || variant === 'feature') ? '20px' : 'auto',  // <-- Tambahkan profile dan feature
            width: '100%', 
            display: 'flex', 
            justifyContent: 'center' 
          }}>
            <Button 
              variant={variant === 'profile' ? 'outline' : 'primary'} 
              label={actionLabel} 
              onClick={onAction}
              style={{ width: '80%', minWidth: '140px', maxWidth: 'none', fontSize: '0.85rem' }}
            />
          </div>
        )}
      </>
    );
  };

  switch (variant) {
    case "glass":
      return <GlassCard>{renderContent()}</GlassCard>;
    case "profile":
      return <ProfileCard>{renderContent()}</ProfileCard>;
    case "stats":
      return <StatsCard>{renderContent()}</StatsCard>;
    case "feature":
      return <FeatureCard>{renderContent()}</FeatureCard>;
    case "shimmer":
      return <ShimmerCard>{renderContent()}</ShimmerCard>;
    default:
      return <CardBase>{renderContent()}</CardBase>;
  }
};
