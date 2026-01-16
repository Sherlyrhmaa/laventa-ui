"use client";
import { useState, useEffect, createContext, useContext, useRef } from "react";
import styled, { ThemeProvider } from "styled-components";
import { Button } from "./components/button";
import { Card } from "./components/card";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { Sidebar } from "./components/sidebar";
import { themes } from "./tokens/themes";  

// ============= THEME CONTEXT =============
const ThemeContext = createContext({
  isDark: true,
  toggleTheme: () => {},
});

// Custom hook untuk menggunakan theme context
const useTheme = () => useContext(ThemeContext);

// ============= STYLED COMPONENTS =============
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: ${props => props.theme.gradients.darkLav};
  color: ${props => props.theme.colors.text};
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  transition: background 0.3s ease, color 0.3s ease;
`;

const ThemeToggleButton = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.theme.colors.text};
  border-radius: ${props => props.theme.radius.pill};
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.2rem;

  &:hover {
    background: ${props => props.theme.colors.surfaceLight || props.theme.colors.surface};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Main = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
  width: 100%;
  margin-top: 80px;
  position: relative;
  z-index: 1;
`;

const SidebarWrapper = styled.div`
  flex-shrink: 0;
  width: 200px;
  position: fixed;
  top: 80px;
  left: 0;
  bottom: 0;
  overflow-y: auto;
  z-index: 900;
  border-right: 1px solid rgba(255,255,255,0.1);
  background: ${props => props.theme.gradients.darkLav};
  backdrop-filter: blur(10px);
  transition: background 0.3s ease, border-color 0.3s ease;
  
  @media (max-width: 900px) {
    display: none;
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  margin-left: ${props => props.$showSidebar ? '200px' : '0'};
  width: ${props => props.$showSidebar ? 'calc(100% - 200px)' : '100%'};
  min-height: calc(100vh - 140px);
  position: relative;
  transition: margin-left 0.3s ease, width 0.3s ease;
  
  @media (max-width: 900px) {
    margin-left: 0;
    width: 100%;
  }
`;

const Content = styled.main`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.xl} ${props => props.theme.spacing.xxl} ${props => props.theme.spacing.xl};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.background};
  min-height: calc(100vh - 140px);
  box-sizing: border-box;
  position: relative;
  transition: background 0.3s ease;

  @media (max-width: 900px) {
    padding: ${props => props.theme.spacing.lg};
    margin-left: 0;
    width: 100%;
    min-height: auto;
    padding-bottom: ${props => props.theme.spacing.xxl};
  }
`;

const HeroSection = styled.section`
  width: 100%;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: ${props => props.theme.spacing.xxl} ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.radius.xl};
  margin-bottom: ${props => props.theme.spacing.xxl};
  position: relative;
  overflow: hidden;
  border: 1px solid ${props => props.theme.colors.border};
  box-shadow: ${props => props.theme.colors.shadow};
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('https://i.pinimg.com/736x/8d/3c/a4/8d3ca450d1676beacd40f6f47ed601da.jpg');
    background-size: cover;
    background-position: center;
    opacity: ${props => props.theme === themes.light ? 0.05 : 0.2};
    z-index: -1;
  }
`;

const HeroTitle = styled.h1`
  font-family: ${props => props.theme.fonts.title};
  font-size: 5rem;
  font-weight: bold;
  background: ${props => props.theme === themes.dark 
    ? 'linear-gradient(90deg, #f5f0ff, #b79aff, #8a6eff)'
    : 'linear-gradient(90deg, #4338CA, #4F46E5, #6D28D9)'};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${props => props.theme.spacing.lg};
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 3.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  color: ${props => props.theme.colors.text};
  max-width: 800px;
  margin-bottom: ${props => props.theme.spacing.xl};
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const CTAButton = styled(Button)`
  font-size: 1.1rem;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  margin-top: ${props => props.theme.spacing.lg};
`;

const SectionTitle = styled.h2`
  font-family: ${props => props.theme.fonts.title};
  font-size: 2.2rem;
  text-align: center;
  background: ${props => props.theme === themes.dark 
    ? 'linear-gradient(90deg, #f5f0ff, #b79aff)'
    : 'linear-gradient(90deg, #4338CA, #4F46E5)'};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: bold;
  margin: ${props => props.theme.spacing.xxl} 0 ${props => props.theme.spacing.xl} 0;
  width: 100%;
  
  &:after {
    content: '';
    display: block;
    width: 100px;
    height: 4px;
    background: ${props => props.theme === themes.dark 
      ? 'linear-gradient(90deg, #b79aff, #8a6eff)'
      : 'linear-gradient(90deg, #4F46E5, #6D28D9)'};
    margin: ${props => props.theme.spacing.sm} auto;
    border-radius: ${props => props.theme.radius.sm};
  }
`;

const SectionDescription = styled.p`
  text-align: center;
  color: ${props => props.theme.colors.textSecondary || props.theme.colors.muted};
  max-width: 800px;
  margin: 0 auto ${props => props.theme.spacing.xl} auto;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const CodeBlock = styled.pre`
  background: ${props => props.theme === themes.dark 
    ? 'rgba(0, 0, 0, 0.3)' 
    : 'rgba(241, 245, 249, 0.9)'};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.radius.md};
  padding: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.text};
  font-family: "Courier New", monospace;
  font-size: 1rem;
  overflow-x: auto;
  margin: ${props => props.theme.spacing.lg} 0;
`;

const ComponentTitle = styled.h1`
  font-family: ${props => props.theme.fonts.title};
  font-size: 2.5rem;
  text-align: left;
  background: ${props => props.theme === themes.dark 
    ? 'linear-gradient(90deg, #f5f0ff, #b79aff)'
    : 'linear-gradient(90deg, #4338CA, #4F46E5)'};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: bold;
  margin: 0;
  padding-bottom: ${props => props.theme.spacing.md};
  letter-spacing: 0.5px;
  width: 100%;
  text-shadow: 0 0 20px ${props => props.theme === themes.dark 
    ? 'rgba(183, 154, 255, 0.3)' 
    : 'rgba(79, 70, 229, 0.2)'};
`;

const VariantSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
  padding: ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.radius.lg};
  border: 1px solid ${props => props.theme.colors.border};
  width: 100%;
  max-width: 1200px;
  box-sizing: border-box;
  position: relative;
  backdrop-filter: blur(5px);
  box-shadow: ${props => props.theme.colors.shadow};
  transition: background 0.3s ease, border-color 0.3s ease;

  @media (max-width: 768px) {
    padding: ${props => props.theme.spacing.lg};
    margin-bottom: ${props => props.theme.spacing.lg};
  }

  @media (max-width: 480px) {
    padding: ${props => props.theme.spacing.md};
  }
`;

const ComponentGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: ${props => props.theme.spacing.lg};
  justify-content: center;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 1024px) {
    gap: 1.5rem;
    padding: ${props => props.theme.spacing.lg};
  }

  @media (max-width: 768px) {
    gap: 1.5rem;
    padding: ${props => props.theme.spacing.md};
  }

  @media (max-width: 480px) {
    gap: 1rem;
    padding: ${props => props.theme.spacing.sm};
  }

  @media (max-width: 360px) {
    gap: 1rem;
    padding: ${props => props.theme.spacing.sm};
  }
`;

const VariantTitle = styled.h2`
  font-family: ${props => props.theme.fonts.title};
  font-size: 1.3rem;
  color: ${props => props.theme.colors.text};
  margin: 0;
  padding-bottom: ${props => props.theme.spacing.sm};
  letter-spacing: 0.5px;
  font-weight: 600;
  position: relative;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  
  &:before {
    content: '';
    width: 4px;
    height: 24px;
    background: ${props => props.theme === themes.dark 
      ? 'linear-gradient(180deg, #b79aff, #8a6eff)'
      : 'linear-gradient(180deg, #4F46E5, #6D28D9)'};
    border-radius: ${props => props.theme.radius.sm};
    display: inline-block;
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: ${props => props.theme === themes.dark 
      ? 'linear-gradient(90deg, rgba(183, 154, 255, 0.8) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(183, 154, 255, 0.8) 100%)'
      : 'linear-gradient(90deg, rgba(79, 70, 229, 0.8) 0%, rgba(148, 163, 184, 0.2) 50%, rgba(79, 70, 229, 0.8) 100%)'};
    border-radius: 1px;
  }
`;

const ButtonDemoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.radius.md};
  width: 100%;
  
  & > button {
    width: auto !important;
    display: inline-flex !important;
    align-self: flex-start !important;
  }
`;

const CardDemoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.radius.md};
  width: 100%;
  
  & > div {
    max-width: 250px;
    width: 100%;
  }
`;

const HeaderDemoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.radius.md};
  width: 100%;
  
  & > header {
    width: 100%;
    margin: 0 auto;
  }
`;

const FooterDemoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.radius.md};
  width: 100%;
  
  & > footer {
    width: 100%;
    margin: 0 auto;
  }
`;

const SidebarDemoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.radius.md};
  width: 100%;
  
  & > aside {
    width: 200px;
  }
`;

const CopyButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.primarySoft};
  color: ${props => props.theme.colors.primary};
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 10;
  font-family: ${props => props.theme.fonts.body};
  backdrop-filter: blur(10px);
  
  &:hover {
    background: ${props => props.theme.colors.primarySoft}20;
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  svg {
    width: 14px;
    height: 14px;
    opacity: 0.9;
  }
`;

const ComponentOverviewCard = styled.div`
  width: 100%;
  max-width: 240px;
  min-height: 160px;
  background: ${props => props.$isDark ? 
    'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' : 
    'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'};
  border: 2px solid ${props => props.$isDark ? 
    'rgba(167, 139, 250, 0.2)' : 
    'rgba(99, 102, 241, 0.15)'};
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: ${props => props.$isDark ? 
    '0 4px 20px rgba(0, 0, 0, 0.3)' : 
    '0 4px 20px rgba(0, 0, 0, 0.08)'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899);
    border-radius: 12px 12px 0 0;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.$isDark ? 
      '0 12px 28px rgba(0, 0, 0, 0.4)' : 
      '0 12px 28px rgba(0, 0, 0, 0.12)'};
    border-color: ${props => props.$isDark ? 
      'rgba(167, 139, 250, 0.4)' : 
      'rgba(99, 102, 241, 0.25)'};
  }

  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: ${props => props.$isDark ? '#e2e8f0' : '#1e293b'};
    margin: 8px 0 12px 0;
    font-family: ${props => props.theme.fonts.title};
  }

  p {
    font-size: 0.8rem;
    color: ${props => props.$isDark ? '#94a3b8' : '#64748b'};
    line-height: 1.4;
    margin: 0 0 16px 0;
    flex-grow: 1;
  }

  .view-button {
    background: ${props => props.$isDark ? 
      'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' : 
      'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)'};
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-family: ${props => props.theme.fonts.body};
    margin-top: auto;

    &:hover {
      transform: translateY(-2px);
      box-shadow: ${props => props.$isDark ? 
        '0 6px 20px rgba(99, 102, 241, 0.4)' : 
        '0 6px 20px rgba(79, 70, 229, 0.3)'};
    }

    &:active {
      transform: translateY(0);
    }

    svg {
      width: 14px;
      height: 14px;
    }
  }

  @media (max-width: 768px) {
    max-width: 220px;
    min-height: 140px;
    padding: 16px;

    h3 {
      font-size: 1rem;
      margin: 6px 0 10px 0;
    }

    p {
      font-size: 0.75rem;
      margin: 0 0 14px 0;
    }

    .view-button {
      padding: 6px 10px;
      font-size: 0.75rem;

      svg {
        width: 12px;
        height: 12px;
      }
    }
  }

  @media (max-width: 480px) {
    max-width: 100%;
    min-height: 120px;
    padding: 14px;

    h3 {
      font-size: 0.95rem;
      margin: 4px 0 8px 0;
    }

    p {
      font-size: 0.7rem;
      margin: 0 0 12px 0;
    }

    .view-button {
      padding: 5px 8px;
      font-size: 0.7rem;

      svg {
        width: 10px;
        height: 10px;
      }
    }
  }
`;

const CopyIcon = ({ theme }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={theme.colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

const CopiedIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const VariantCodeWrapper = styled.div`
  position: relative;
  border-radius: ${props => props.theme.radius.md};
  margin: 0;
  overflow: hidden;
  background: ${props => props.theme === themes.dark 
    ? 'rgba(0, 0, 0, 0.3)' 
    : 'rgba(241, 245, 249, 0.9)'};
  border: 1px solid ${props => props.theme.colors.border};
  width: 100%;
  transition: background 0.3s ease;
`;

const VariantCode = styled.pre`
  color: ${props => props.theme.colors.text};
  padding: 50px ${props => props.theme.spacing.md} ${props => props.theme.spacing.md} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.radius.md};
  font-size: 0.85rem;
  font-family: "Courier New", monospace;
  white-space: pre-wrap;
  overflow-x: auto;
  margin: 0;
  line-height: 1.4;
  border-left: 3px solid ${props => props.theme.colors.primary};
`;

const AlertContainer = styled.div`
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.surface};
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.radius.md};
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  font-family: ${props => props.theme.fonts.body};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  max-width: 90%;
  backdrop-filter: blur(10px);
  box-sizing: border-box;
  box-shadow: ${props => props.theme.effects.heavyShadow};
`;

const FooterWrapper = styled.div`
  width: 100%;
  flex-shrink: 0;
  background: ${props => props.theme.gradients.footerGradient || props.theme.gradients.darkLav};
  position: relative;
  border-top: 1px solid ${props => props.theme.colors.border};
  z-index: 950;
  height: 60px;
  transition: all 0.3s ease;
`;

const FooterContentWrapper = styled.div`
  width: 100%;
  background: ${props => props.theme.gradients.footerGradient || props.theme.gradients.darkLav};
  margin: 0;
  padding: 0;
  transition: background 0.3s ease;
`;

const LandingPage = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ComponentsPage = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// ============= MAIN COMPONENT =============
export default function Page() {
  const [selectedComponent, setSelectedComponent] = useState("beranda");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isInComponentSection, setIsInComponentSection] = useState(false);
  const [showOnlyNavigation, setShowOnlyNavigation] = useState(false);
  
  const componentsPageRef = useRef(null);
  const landingPageRef = useRef(null);
  const contentContainerRef = useRef(null);

  // Load theme preference dari localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('laventa-ui-theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  // Save theme preference ke localStorage
  useEffect(() => {
    localStorage.setItem('laventa-ui-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const currentTheme = isDarkMode ? themes.dark : themes.light;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle scroll untuk tracking apakah berada di komponen section
  useEffect(() => {
    const handleScroll = () => {
      if (componentsPageRef.current && contentContainerRef.current) {
        const contentContainerTop = contentContainerRef.current.offsetTop;
        const scrollPosition = window.scrollY;
        const componentsPageTop = contentContainerTop + componentsPageRef.current.offsetTop;
        
        if (scrollPosition >= componentsPageTop - 100) {
          setIsInComponentSection(true);
        } else {
          setIsInComponentSection(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset state saat component berubah
  useEffect(() => {
    if (selectedComponent === "komponen") {
      setShowOnlyNavigation(true);
      // Scroll ke komponen section setelah render
      setTimeout(() => {
        if (componentsPageRef.current) {
          componentsPageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else if (selectedComponent === "beranda") {
      setShowOnlyNavigation(false);
      setIsInComponentSection(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedComponent]);

  const sidebarMenu = [
    { label: "Button" },
    { label: "Card" },
    { label: "Header" },
    { label: "Footer" },
    { label: "Sidebar" },
  ];

  const showAlertMessage = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
      showAlertMessage("Copied to clipboard!");
    } catch (err) {
      showAlertMessage("Failed to copy code");
    }
  };

  const handleBerandaClick = () => {
    setSelectedComponent("beranda");
    setIsInComponentSection(false);
    setShowOnlyNavigation(false);
    // Scroll ke landing page dengan delay
    setTimeout(() => {
      if (landingPageRef.current) {
        landingPageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  const handleKomponenClick = () => {
    setSelectedComponent("komponen");
    setIsInComponentSection(true);
    setShowOnlyNavigation(true);
  };

  const renderMulaiSekarang = () => (
    <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: currentTheme.spacing.xl }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: currentTheme.colors.text, marginBottom: currentTheme.spacing.lg }}>
          Yuk Kita Mulai!
        </h1>
        <p style={{ color: currentTheme.colors.text, lineHeight: '1.6', fontSize: '1.1rem' }}>
          Ikuti langkah-langkah berikut untuk mulai menggunakan Laventa UI di proyek Anda.
        </p>
      </div>

      <VariantSection style={{ backgroundColor: isDarkMode ? 'rgba(30, 25, 50, 0.6)' : 'rgba(241, 245, 249, 0.8)' }}>
        <VariantTitle style={{ fontSize: '1.3rem' }}>Cara Install</VariantTitle>
        <p style={{ color: currentTheme.colors.text, lineHeight: '1.6', marginBottom: currentTheme.spacing.md, fontSize: '1.1rem' }}>
          Install Laventa UI menggunakan npm atau yarn:
        </p>
        <div style={{ display: 'flex', gap: currentTheme.spacing.sm, alignItems: 'center', flexWrap: 'wrap' }}>
          <CodeBlock style={{ flex: 1, minWidth: '200px', fontSize: '1.1rem' }}>
            npm i laventa-ui
          </CodeBlock>
          <span style={{ color: currentTheme.colors.muted, fontSize: '1rem' }}>atau</span>
          <CodeBlock style={{ flex: 1, minWidth: '200px', fontSize: '1.1rem' }}>
            yarn add laventa-ui
          </CodeBlock>
        </div>
      </VariantSection>

      <VariantSection style={{ backgroundColor: isDarkMode ? 'rgba(30, 25, 50, 0.6)' : 'rgba(241, 245, 249, 0.8)' }}>
        <VariantTitle style={{ fontSize: '1.3rem' }}>Konfigurasi Next.js</VariantTitle>
        <p style={{ color: currentTheme.colors.text, lineHeight: '1.6', marginBottom: currentTheme.spacing.md, fontSize: '1.1rem' }}>
          Ubah isi File next.config.mjs menjadi seperti ini:
        </p>
        <div style={{ display: 'flex', gap: currentTheme.spacing.sm, alignItems: 'center', flexWrap: 'wrap' }}>
          <CodeBlock style={{ flex: 1, minWidth: '200px', fontSize: '1.1rem' }}>
            {`/** @type {import('next').NextConfig} */
            const nextConfig = {
              transpilePackages: ["laventa-ui"],
            };
            export default nextConfig;`}
          </CodeBlock>
        </div>
      </VariantSection>

      <VariantSection style={{ backgroundColor: isDarkMode ? 'rgba(30, 25, 50, 0.6)' : 'rgba(241, 245, 249, 0.8)' }}>
        <VariantTitle style={{ fontSize: '1.3rem' }}>Cara Import Component</VariantTitle>
        <p style={{ color: currentTheme.colors.text, lineHeight: '1.6', marginBottom: currentTheme.spacing.md, fontSize: '1.1rem' }}>
          Import semua komponen:
        </p>
        <CodeBlock style={{ fontSize: '1.1rem' }}>
    {`import { Button, Card, Header, Footer, Sidebar } from "laventa-ui";`}
        </CodeBlock>
        <p style={{ color: currentTheme.colors.text, lineHeight: '1.6', marginTop: currentTheme.spacing.md, marginBottom: currentTheme.spacing.md, fontSize: '1.1rem' }}>
          Atau import per komponen:
        </p>
        <CodeBlock style={{ fontSize: '1.1rem' }}>
{`import { Button } from "laventa-ui";`}
        </CodeBlock>
      </VariantSection>

      <VariantSection style={{ backgroundColor: isDarkMode ? 'rgba(30, 25, 50, 0.6)' : 'rgba(241, 245, 249, 0.8)' }}>
        <VariantTitle style={{ fontSize: '1.3rem' }}>Contoh Penggunaan</VariantTitle>
        <CodeBlock style={{ fontSize: '1.1rem' }}>
{`"use client";
import { Button } from "laventa-ui";

export default function ButtonPrimary() {
  return (
    <Button variant="primary">
      Klik Saya
    </Button>
  );
}`}
        </CodeBlock>
      </VariantSection>

      <VariantSection style={{ backgroundColor: isDarkMode ? 'rgba(30, 25, 50, 0.6)' : 'rgba(241, 245, 249, 0.8)' }}>
        <VariantTitle style={{ fontSize: '1.3rem' }}>Catatan</VariantTitle>
        <p style={{ color: currentTheme.colors.text, lineHeight: '1.6', fontSize: '1.1rem' }}>
          Jika kamu menggunakan Next.js App Router, pastikan file yang menggunakan komponen Laventa UI diberi "use client".
        </p>
      </VariantSection>

      <div style={{ textAlign: 'center', marginTop: currentTheme.spacing.xl }}>
        <p style={{ color: currentTheme.colors.text, lineHeight: '1.6', fontSize: '1.2rem' }}>
          Selanjutnya buka menu <span 
            style={{ 
              color: isDarkMode ? '#b79aff' : '#4F46E5', 
              fontWeight: 'bold', 
              cursor: 'pointer', 
              textDecoration: 'underline',
              transition: 'all 0.2s ease'
            }} 
            onClick={handleKomponenClick}
            onMouseOver={(e) => e.target.style.color = isDarkMode ? '#9c7cf0' : '#4338CA'}
            onMouseOut={(e) => e.target.style.color = isDarkMode ? '#b79aff' : '#4F46E5'}
          >
            Components
          </span> untuk melihat semua komponen yang tersedia dan cara penggunaannya.
        </p>
      </div>
    </div>
  );

  const renderButtonVariants = () => (
    <>
      <VariantSection>
        <VariantTitle>Primary Button</VariantTitle>
        <ButtonDemoWrapper>
          <Button 
            variant="primary"
            label="Submit"
            onClick={() => showAlertMessage("Data berhasil dikirim")}
          />
        </ButtonDemoWrapper>
        <VariantCodeWrapper>
          <CopyButton onClick={() => copyToClipboard(`"use client";
import { Button } from "laventa-ui";

export default function PrimaryButton() {
  return (
    <Button 
      variant="primary"
      label="Submit"
      onClick={() => console.log("Button clicked")}
    />
  );
}`, "btn-primary")}>
            {copiedId === "btn-primary" ? <CopiedIcon /> : <CopyIcon theme={currentTheme} />}
            {copiedId === "btn-primary" ? "Copied!" : "Copy"}
          </CopyButton>
          <VariantCode>
{`"use client";
import { Button } from "laventa-ui";

export default function PrimaryButton() {
  return (
    <Button 
      variant="primary"
      label="Submit"
      onClick={() => console.log("Button clicked")}
    />
  );
}`}
          </VariantCode>
        </VariantCodeWrapper>
      </VariantSection>

      <VariantSection>
        <VariantTitle>Outline Button</VariantTitle>
        <ButtonDemoWrapper>
          <Button variant="outline">Outline</Button>
        </ButtonDemoWrapper>
        <VariantCodeWrapper>
          <CopyButton onClick={() => copyToClipboard(`"use client";
import { Button } from "laventa-ui";

export default function OutlineButton() {
  return (
    <Button variant="outline">
      Outline
    </Button>
  );
}`, "btn-outline")}>
            {copiedId === "btn-outline" ? <CopiedIcon /> : <CopyIcon theme={currentTheme} />}
            {copiedId === "btn-outline" ? "Copied!" : "Copy"}
          </CopyButton>
          <VariantCode>
{`"use client";
import { Button } from "laventa-ui";

export default function OutlineButton() {
  return (
    <Button variant="outline">
      Outline
    </Button>
  );
}`}
          </VariantCode>
        </VariantCodeWrapper>
      </VariantSection>

      <VariantSection>
        <VariantTitle>Glow Button</VariantTitle>
        <ButtonDemoWrapper>
          <Button 
            variant="glow"
            label="⚠️ Warning"
            onClick={() => showAlertMessage("⚠️ Perhatian! Terjadi peringatan.")}
          />
        </ButtonDemoWrapper>
        <VariantCodeWrapper>
          <CopyButton onClick={() => copyToClipboard(`"use client";
import { Button } from "laventa-ui";

export default function GlowButton() {
  return (
    <Button 
      variant="glow"
      label="⚠️ Warning"
      onClick={() => console.log("Warning button clicked")}
    />
  );
}`, "btn-glow")}>
            {copiedId === "btn-glow" ? <CopiedIcon /> : <CopyIcon theme={currentTheme} />}
            {copiedId === "btn-glow" ? "Copied!" : "Copy"}
          </CopyButton>
          <VariantCode>
{`"use client";
import { Button } from "laventa-ui";

export default function GlowButton() {
  return (
    <Button 
      variant="glow"
      label="⚠️ Warning"
      onClick={() => console.log("Warning button clicked")}
    />
  );
}`}
          </VariantCode>
        </VariantCodeWrapper>
      </VariantSection>

      <VariantSection>
        <VariantTitle>Pill Button</VariantTitle>
        <ButtonDemoWrapper>
          <Button variant="pill">Pill</Button>
        </ButtonDemoWrapper>
        <VariantCodeWrapper>
          <CopyButton onClick={() => copyToClipboard(`"use client";
import { Button } from "laventa-ui";

export default function PillButton() {
  return (
    <Button variant="pill">
      Pill
    </Button>
  );
}`, "btn-pill")}>
            {copiedId === "btn-pill" ? <CopiedIcon /> : <CopyIcon theme={currentTheme} />}
            {copiedId === "btn-pill" ? "Copied!" : "Copy"}
          </CopyButton>
          <VariantCode>
{`"use client";
import { Button } from "laventa-ui";

export default function PillButton() {
  return (
    <Button variant="pill">
      Pill
    </Button>
  );
}`}
          </VariantCode>
        </VariantCodeWrapper>
      </VariantSection>

      <VariantSection>
        <VariantTitle>Breathing Button</VariantTitle>
        <ButtonDemoWrapper>
          <Button 
            variant="breathing"
            label="Info"
          />
        </ButtonDemoWrapper>
        <VariantCodeWrapper>
          <CopyButton onClick={() => copyToClipboard(`"use client";
import { Button } from "laventa-ui";

export default function BreathingButton() {
  return (
    <Button 
      variant="breathing"
      label="Info"
    />
  );
}`, "btn-breathing")}>
            {copiedId === "btn-breathing" ? <CopiedIcon /> : <CopyIcon theme={currentTheme} />}
            {copiedId === "btn-breathing" ? "Copied!" : "Copy"}
          </CopyButton>
          <VariantCode>
{`"use client";
import { Button } from "laventa-ui";

export default function BreathingButton() {
  return (
    <Button 
      variant="breathing"
      label="Info"
    />
  );
}`}
          </VariantCode>
        </VariantCodeWrapper>
      </VariantSection>
    </>
  );

  const renderCardVariants = () => (
    <>
      <VariantSection>
        <VariantTitle>Glass Card</VariantTitle>
        <CardDemoWrapper>
          <Card 
            variant="glass"
            title="Glass Card"
            description="Varian kartu dengan efek kaca blur yang elegan dan transparan."
          />
        </CardDemoWrapper>
        <VariantCodeWrapper>
          <CopyButton onClick={() => copyToClipboard(`"use client";
import { Card } from "laventa-ui";

export default function GlassCard() {
  return (
    <Card 
      variant="glass"
      title="Glass Card"
      description="Varian kartu dengan efek kaca blur yang elegan dan transparan."
    />
  );
}`, "card-glass")}>
            {copiedId === "card-glass" ? <CopiedIcon /> : <CopyIcon theme={currentTheme} />}
            {copiedId === "card-glass" ? "Copied!" : "Copy"}
          </CopyButton>
          <VariantCode>
{`"use client";
import { Card } from "laventa-ui";

export default function GlassCard() {
  return (
    <Card 
      variant="glass"
      title="Glass Card"
      description="Varian kartu dengan efek kaca blur yang elegan dan transparan."
    />
  );
}`}
          </VariantCode>
        </VariantCodeWrapper>
      </VariantSection>

      <VariantSection>
        <VariantTitle>Profile Card</VariantTitle>
        <CardDemoWrapper>
          <Card 
            variant="profile"
            title="Profile Card"
            description="Menampilkan gambar profil dan teks di tengah, cocok untuk user atau anggota tim."
            image="https://i.pinimg.com/736x/25/c3/ac/25c3ac48ae4c0785ac5ba98842f4bb7b.jpg"
            imageAlt="Profile"
            actionLabel="Follow"
            onAction={() => showAlertMessage("Profile followed!")}
          />
        </CardDemoWrapper>
        <VariantCodeWrapper>
          <CopyButton onClick={() => copyToClipboard(`"use client";
import { Card } from "laventa-ui";

export default function ProfileCard() {
  return (
    <Card 
      variant="profile"
      title="Profile Card"
      description="Menampilkan gambar profil dan teks di tengah, cocok untuk user atau anggota tim."
      image="https://example.com/profile.jpg"
      imageAlt="Profile"
      actionLabel="Follow"
      onAction={() => console.log("Follow clicked")}
    />
  );
}`, "card-profile")}>
            {copiedId === "card-profile" ? <CopiedIcon /> : <CopyIcon theme={currentTheme} />}
            {copiedId === "card-profile" ? "Copied!" : "Copy"}
          </CopyButton>
          <VariantCode>
{`"use client";
import { Card } from "laventa-ui";

export default function ProfileCard() {
  return (
    <Card 
      variant="profile"
      title="Profile Card"
      description="Menampilkan gambar profil dan teks di tengah, cocok untuk user atau anggota tim."
      image="https://example.com/profile.jpg"
      imageAlt="Profile"
      actionLabel="Follow"
      onAction={() => console.log("Follow clicked")}
    />
  );
}`}
          </VariantCode>
        </VariantCodeWrapper>
      </VariantSection>

      <VariantSection>
        <VariantTitle>Stats Card</VariantTitle>
        <CardDemoWrapper>
          <Card 
            variant="stats"
            title="Stats Card"
            description="Menampilkan data statistik atau progress project."
            image="https://i.pinimg.com/1200x/b2/db/1c/b2db1c2902681c1cc99f4d6edb79d3a1.jpg"
            imageAlt="Stats Background"
            stats="92%"
          />
        </CardDemoWrapper>
        <VariantCodeWrapper>
          <CopyButton onClick={() => copyToClipboard(`"use client";
import { Card } from "laventa-ui";

export default function StatsCard() {
  return (
    <Card 
      variant="stats"
      title="Stats Card"
      description="Menampilkan data statistik atau progress project dengan tampilan visual menarik."
      image="https://example.com/stats-bg.jpg"
      imageAlt="Stats Background"
      stats="92%"
    />
  );
}`, "card-stats")}>
            {copiedId === "card-stats" ? <CopiedIcon /> : <CopyIcon theme={currentTheme} />}
            {copiedId === "card-stats" ? "Copied!" : "Copy"}
          </CopyButton>
          <VariantCode>
{`"use client";
import { Card } from "laventa-ui";

export default function StatsCard() {
  return (
    <Card 
      variant="stats"
      title="Stats Card"
      description="Menampilkan data statistik atau progress project dengan tampilan visual menarik."
      image="https://example.com/stats-bg.jpg"
      imageAlt="Stats Background"
      stats="92%"
    />
  );
}`}
          </VariantCode>
        </VariantCodeWrapper>
      </VariantSection>

      <VariantSection>
        <VariantTitle>Feature Card</VariantTitle>
        <CardDemoWrapper>
          <Card 
            variant="feature"
            title="Feature Card"
            description="Komponen dengan visual menonjol dan gradient lembut, cocok untuk highlight fitur penting."
            image="https://i.pinimg.com/736x/8d/3c/a4/8d3ca450d1676beacd40f6f47ed601da.jpg"
            imageAlt="Feature"
            actionLabel="Explore"
            onAction={() => showAlertMessage("Feature Card clicked!")}
          />
        </CardDemoWrapper>
        <VariantCodeWrapper>
          <CopyButton onClick={() => copyToClipboard(`"use client";
import { Card } from "laventa-ui";

export default function FeatureCard() {
  return (
    <Card 
      variant="feature"
      title="Feature Card"
      description="Komponen dengan visual menonjol dan gradient lembut, cocok untuk highlight fitur penting."
      image="https://example.com/feature.jpg"
      imageAlt="Feature"
      actionLabel="Explore"
      onAction={() => console.log("Explore clicked")}
    />
  );
}`, "card-feature")}>
            {copiedId === "card-feature" ? <CopiedIcon /> : <CopyIcon theme={currentTheme} />}
            {copiedId === "card-feature" ? "Copied!" : "Copy"}
          </CopyButton>
          <VariantCode>
{`"use client";
import { Card } from "laventa-ui";

export default function FeatureCard() {
  return (
    <Card 
      variant="feature"
      title="Feature Card"
      description="Komponen dengan visual menonjol dan gradient lembut, cocok untuk highlight fitur penting."
      image="https://example.com/feature.jpg"
      imageAlt="Feature"
      actionLabel="Explore"
      onAction={() => console.log("Explore clicked")}
    />
  );
}`}
          </VariantCode>
        </VariantCodeWrapper>
      </VariantSection>

      <VariantSection>
        <VariantTitle>Shimmer Card</VariantTitle>
        <CardDemoWrapper>
          <Card 
            variant="shimmer"
            title="Shimmer Card"
            description="Varian kartu dengan efek shimmer/kilauan yang berjalan secara terus menerus."
          />
        </CardDemoWrapper>
        <VariantCodeWrapper>
          <CopyButton onClick={() => copyToClipboard(`"use client";
import { Card } from "laventa-ui";

export default function ShimmerCard() {
  return (
    <Card 
      variant="shimmer"
      title="Shimmer Card"
      description="Varian kartu dengan efek shimmer/kilauan yang berjalan secara terus menerus."
    />
  );
}`, "card-shimmer")}>
            {copiedId === "card-shimmer" ? <CopiedIcon /> : <CopyIcon theme={currentTheme} />}
            {copiedId === "card-shimmer" ? "Copied!" : "Copy"}
          </CopyButton>
          <VariantCode>
{`"use client";
import { Card } from "laventa-ui";

export default function ShimmerCard() {
  return (
    <Card 
      variant="shimmer"
      title="Shimmer Card"
      description="Varian kartu dengan efek shimmer/kilauan yang berjalan secara terus menerus."
    />
  );
}`}
          </VariantCode>
        </VariantCodeWrapper>
      </VariantSection>
    </>
  );

  const renderHeaderVariants = () => (
    <>
      <VariantSection>
        <VariantTitle>Default Header</VariantTitle>
        <HeaderDemoWrapper>
          <Header variant="default">
            <h3>Header Default</h3>
            <nav>
              <a href="#" onClick={(e) => e.preventDefault()}>Home</a>
              <a href="#" onClick={(e) => e.preventDefault()}>About</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Contact</a>
            </nav>
          </Header>
        </HeaderDemoWrapper>
        <VariantCodeWrapper>
          <CopyButton onClick={() => copyToClipboard(`"use client";
import { Header } from "laventa-ui";

export default function DefaultHeader() {
  return (
    <Header variant="default">
      <h3>Header Default</h3>
      <nav>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </nav>
    </Header>
  );
}`, "header-default")}>
            {copiedId === "header-default" ? <CopiedIcon /> : <CopyIcon theme={currentTheme} />}
            {copiedId === "header-default" ? "Copied!" : "Copy"}
          </CopyButton>
          <VariantCode>
{`"use client";
import { Header } from "laventa-ui";

export default function DefaultHeader() {
  return (
    <Header variant="default">
      <h3>Header Default</h3>
      <nav>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </nav>
    </Header>
  );
}`}
          </VariantCode>
        </VariantCodeWrapper>
      </VariantSection>

      <VariantSection>
        <VariantTitle>Header with Logo</VariantTitle>
        <HeaderDemoWrapper>
          <Header variant="withLogo">
            <img src="https://img.pikbest.com/png-images/20241029/cute-little-cat-logo-_11020831.png!sw800" alt="logo"/>
            <h2>Header With Logo</h2>
            <nav>
              <a href="#" onClick={(e) => e.preventDefault()}>Home</a>
              <a href="#" onClick={(e) => e.preventDefault()}>About</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Contact</a>
            </nav>
          </Header>
        </HeaderDemoWrapper>
        <VariantCodeWrapper>
          <CopyButton onClick={() => copyToClipboard(`"use client";
import { Header } from "laventa-ui";

export default function HeaderWithLogo() {
  return (
    <Header variant="withLogo">
      <img src="/path/to/logo.png" alt="logo"/>
      <h2>Header With Logo</h2>
      <nav>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </nav>
    </Header>
  );
}`, "header-logo")}>
            {copiedId === "header-logo" ? <CopiedIcon /> : <CopyIcon theme={currentTheme} />}
            {copiedId === "header-logo" ? "Copied!" : "Copy"}
          </CopyButton>
          <VariantCode>
{`"use client";
import { Header } from "laventa-ui";

export default function HeaderWithLogo() {
  return (
    <Header variant="withLogo">
      <img src="/path/to/logo.png" alt="logo"/>
      <h2>Header With Logo</h2>
      <nav>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </nav>
    </Header>
  );
}`}
          </VariantCode>
        </VariantCodeWrapper>
      </VariantSection>

      <VariantSection>
        <VariantTitle>Header with Image</VariantTitle>
        <HeaderDemoWrapper>
          <Header variant="withImage"
            title="Header With Image"
            image="https://i.pinimg.com/1200x/5f/a9/b9/5fa9b9a5c4c7bd5e0d4423dc1bb487a4.jpg"
          >
            <h1>Header With Image</h1>
            <nav>
              <a href="#" onClick={(e) => e.preventDefault()}>Home</a>
              <a href="#" onClick={(e) => e.preventDefault()}>About</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Contact</a>
            </nav>
          </Header>
        </HeaderDemoWrapper>
        <VariantCodeWrapper>
          <CopyButton onClick={() => copyToClipboard(`"use client";
import { Header } from "laventa-ui";

export default function HeaderWithImage() {
  return (
    <Header 
      variant="withImage"
      title="Header With Image"
      image="/path/to/background-image.jpg"
    >
      <h1>Header With Image</h1>
      <nav>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </nav>
    </Header>
  );
}`, "header-image")}>
            {copiedId === "header-image" ? <CopiedIcon /> : <CopyIcon theme={currentTheme} />}
            {copiedId === "header-image" ? "Copied!" : "Copy"}
          </CopyButton>
          <VariantCode>
{`"use client";
import { Header } from "laventa-ui";

export default function HeaderWithImage() {
  return (
    <Header 
      variant="withImage"
      title="Header With Image"
      image="/path/to/background-image.jpg"
    >
      <h1>Header With Image</h1>
      <nav>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </nav>
    </Header>
  );
}`}
          </VariantCode>
        </VariantCodeWrapper>
      </VariantSection>

      <VariantSection>
        <VariantTitle>Header with Glow Title</VariantTitle>
        <HeaderDemoWrapper>
          <Header variant="glowTitle">
            <h1>Header With Glow Title</h1>
            <nav>
              <a href="#" onClick={(e) => e.preventDefault()}>Home</a>
              <a href="#" onClick={(e) => e.preventDefault()}>About</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Contact</a>
            </nav>
          </Header>
        </HeaderDemoWrapper>
        <VariantCodeWrapper>
          <CopyButton onClick={() => copyToClipboard(`"use client";
import { Header } from "laventa-ui";

export default function HeaderwithGlowTitle() {
  return (
    <Header variant="glowTitle">
      <h1>Header With Glow Title</h1>
      <nav>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </nav>
    </Header>
  );
}`, "header-glow")}>
            {copiedId === "header-glow" ? <CopiedIcon /> : <CopyIcon theme={currentTheme} />}
            {copiedId === "header-glow" ? "Copied!" : "Copy"}
          </CopyButton>
          <VariantCode>
{`"use client";
import { Header } from "laventa-ui";

export default function HeaderwithGlowTitle() {
  return (
    <Header variant="glowTitle">
      <h1>Header With Glow Title</h1>
      <nav>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </nav>
    </Header>
  );
}`}
          </VariantCode>
        </VariantCodeWrapper>
      </VariantSection>
    </>
  );

  const renderFooterVariants = () => (
    <>
      <VariantSection>
        <VariantTitle>Center Footer</VariantTitle>
        <FooterDemoWrapper>
          <Footer variant="center"
            content={{
              p: "© Laventa-UI",
              small: "Created with care and crafted to inspire simplicity.",
            }}
          />
        </FooterDemoWrapper>
        <VariantCodeWrapper>
          <CopyButton onClick={() => copyToClipboard(`"use client";
import { Footer } from "laventa-ui";

export default function CenterFooter() {
  return (
    <Footer 
      variant="center"
      content={{
        p: "© Laventa-UI",
        small: "Created with care and crafted to inspire simplicity.",
      }}
    />
  );
}`, "footer-center")}>
            {copiedId === "footer-center" ? <CopiedIcon /> : <CopyIcon theme={currentTheme} />}
            {copiedId === "footer-center" ? "Copied!" : "Copy"}
          </CopyButton>
          <VariantCode>
{`"use client";
import { Footer } from "laventa-ui";

export default function CenterFooter() {
  return (
    <Footer 
      variant="center"
      content={{
        p: "© Laventa-UI",
        small: "Created with care and crafted to inspire simplicity.",
      }}
    />
  );
}`}
          </VariantCode>
        </VariantCodeWrapper>
      </VariantSection>

      <VariantSection>
        <VariantTitle>Gradient Footer</VariantTitle>
        <FooterDemoWrapper>
          <Footer 
            variant="gradient" 
            content={{
              p: "Follow Lavender Studio",
              small: "Stay inspired and connected with us online",
              socials: ["instagram", "tiktok", "facebook", "twitter"]
            }}
          />
        </FooterDemoWrapper>
        <VariantCodeWrapper>
          <CopyButton onClick={() => copyToClipboard(`"use client";
import { Footer } from "laventa-ui";

export default function GradientFooter() {
  return (
    <Footer 
        variant="gradient" 
        content={{
          p: "Follow Lavender Studio",
          small: "Stay inspired and connected with us online",
          socials: ["instagram", "tiktok", "facebook", "twitter"]
        }}
      />
  );
}`, "footer-gradient")}>
            {copiedId === "footer-gradient" ? <CopiedIcon /> : <CopyIcon theme={currentTheme} />}
            {copiedId === "footer-gradient" ? "Copied!" : "Copy"}
          </CopyButton>
          <VariantCode>
{`"use client";
import { Footer } from "laventa-ui";

export default function GradientFooter() {
  return (
    <Footer 
        variant="gradient" 
        content={{
          p: "Follow Lavender Studio",
          small: "Stay inspired and connected with us online",
          socials: ["instagram", "tiktok", "facebook", "twitter"]
        }}
      />
  );
}`}
          </VariantCode>
        </VariantCodeWrapper>
      </VariantSection>

      <VariantSection>
        <VariantTitle>Links Footer</VariantTitle>
        <FooterDemoWrapper>
          <Footer variant="links"
            content={{
              columns: [
                {
                  title: "About",
                  links: [
                    { label: "Our Story", href: "#" },
                    { label: "Team", href: "#" },
                    { label: "Careers", href: "#" },
                  ],
                },
                {
                  title: "Support",
                  links: [
                    { label: "Help Center", href: "#" },
                    { label: "Terms", href: "#" },
                    { label: "Privacy Policy", href: "#" },
                  ],
                },
                {
                  title: "Newsletter",
                  input: { placeholder: "Your email..." },
                  button: { label: "Subscribe" },
                },
              ],
              bottom: "© Laventa-UI. All rights reserved.",
            }}
          />
        </FooterDemoWrapper>
        <VariantCodeWrapper>
          <CopyButton onClick={() => copyToClipboard(`"use client";
import { Footer } from "laventa-ui";

export default function LinksFooter() {
  return (
    <Footer 
      variant="links"
      content={{
        columns: [
          {
            title: "About",
            links: [
              { label: "Our Story", href: "/about" },
              { label: "Team", href: "/team" },
              { label: "Careers", href: "/careers" },
            ],
          },
          {
            title: "Support",
            links: [
              { label: "Help Center", href: "/help" },
              { label: "Terms", href: "/terms" },
              { label: "Privacy Policy", href: "/privacy" },
            ],
          },
          {
            title: "Newsletter",
            input: { placeholder: "Your email..." },
            button: { label: "Subscribe" },
          },
        ],
        bottom: "© Laventa-UI. All rights reserved.",
      }}
    />
  );
}`, "footer-links")}>
            {copiedId === "footer-links" ? <CopiedIcon /> : <CopyIcon theme={currentTheme} />}
            {copiedId === "footer-links" ? "Copied!" : "Copy"}
          </CopyButton>
          <VariantCode>
{`"use client";
import { Footer } from "laventa-ui";

export default function LinksFooter() {
  return (
    <Footer 
      variant="links"
      content={{
        columns: [
          {
            title: "About",
            links: [
              { label: "Our Story", href: "/about" },
              { label: "Team", href: "/team" },
              { label: "Careers", href: "/careers" },
            ],
          },
          {
            title: "Support",
            links: [
              { label: "Help Center", href: "/help" },
              { label: "Terms", href: "/terms" },
              { label: "Privacy Policy", href: "/privacy" },
            ],
          },
          {
            title: "Newsletter",
            input: { placeholder: "Your email..." },
            button: { label: "Subscribe" },
          },
        ],
        bottom: "© Laventa-UI. All rights reserved.",
      }}
    />
  );
}`}
          </VariantCode>
        </VariantCodeWrapper>
      </VariantSection>

      <VariantSection>
        <VariantTitle>Wave Glow Footer</VariantTitle>
        <FooterDemoWrapper>
          <Footer 
            variant="waveGlow"
            content={{
              p: "Laventa-UI",
              small: "Beautiful wave-like glowing border animation",
            }}
          />
        </FooterDemoWrapper>
        <VariantCodeWrapper>
          <CopyButton onClick={() => copyToClipboard(`"use client";
import { Footer } from "laventa-ui";

export default function WaveGlowFooter() {
  return (
    <Footer 
      variant="waveGlow"
      content={{
        p: "Laventa-UI",
        small: "Beautiful wave-like glowing border animation",
      }}
    />
  );
}`, "footer-wave")}>
            {copiedId === "footer-wave" ? <CopiedIcon /> : <CopyIcon theme={currentTheme} />}
            {copiedId === "footer-wave" ? "Copied!" : "Copy"}
          </CopyButton>
          <VariantCode>
{`"use client";
import { Footer } from "laventa-ui";

export default function WaveGlowFooter() {
  return (
    <Footer 
      variant="waveGlow"
      content={{
        p: "Laventa-UI",
        small: "Beautiful wave-like glowing border animation",
      }}
    />
  );
}`}
          </VariantCode>
        </VariantCodeWrapper>
      </VariantSection>
    </>
  );

  const renderSidebarVariants = () => (
    <>
      <VariantSection>
        <VariantTitle>Gradient Sidebar</VariantTitle>
        <SidebarDemoWrapper>
          <Sidebar
            variant="gradient"
            menu={[
              { label: "Dashboard" },
              { label: "Profile" },
              { label: "Settings" },
              { label: "Logout" },
            ]}
            title="Navigation"
            onSelect={(item) => console.log("Selected:", item)}
          />
        </SidebarDemoWrapper>
        <VariantCodeWrapper>
          <CopyButton onClick={() => copyToClipboard(`"use client";
import { Sidebar } from "laventa-ui";

export default function GradientSidebar() {
  return (
    <Sidebar
      variant="gradient"
      menu={[
        { label: "Dashboard" },
        { label: "Profile" },
        { label: "Settings" },
        { label: "Logout" },
      ]}
      title="Navigation"
      onSelect={(item) => console.log("Selected:", item)}
    />
  );
}`, "sidebar-gradient")}>
            {copiedId === "sidebar-gradient" ? <CopiedIcon /> : <CopyIcon theme={currentTheme} />}
            {copiedId === "sidebar-gradient" ? "Copied!" : "Copy"}
          </CopyButton>
          <VariantCode>
{`"use client";
import { Sidebar } from "laventa-ui";

export default function GradientSidebar() {
  return (
    <Sidebar
      variant="gradient"
      menu={[
        { label: "Dashboard" },
        { label: "Profile" },
        { label: "Settings" },
        { label: "Logout" },
      ]}
      title="Navigation"
      onSelect={(item) => console.log("Selected:", item)}
    />
  );
}`}
          </VariantCode>
        </VariantCodeWrapper>
      </VariantSection>

      <VariantSection>
        <VariantTitle>Glass Sidebar</VariantTitle>
        <SidebarDemoWrapper>
          <Sidebar
            variant="glass"
            menu={[
              { label: "Dashboard", icon: "📊" },
              { label: "Profile", icon: "👤" },
              { label: "Settings", icon: "⚙️" },
              { label: "Logout", icon: "🚪" },
            ]}
            title="Navigation"
            onSelect={(item) => console.log("Selected:", item)}
          />
        </SidebarDemoWrapper>
        <VariantCodeWrapper>
          <CopyButton onClick={() => copyToClipboard(`"use client";
import { Sidebar } from "laventa-ui";

export default function GlassSidebar() {
  return (
    <Sidebar
      variant="glass"
      menu={[
        { label: "Dashboard", icon: "📊" },
        { label: "Profile", icon: "👤" },
        { label: "Settings", icon: "⚙️" },
        { label: "Logout", icon: "🚪" },
      ]}
      title="Navigation"
      onSelect={(item) => console.log("Selected:", item)}
    />
  );
}`, "sidebar-glass")}>
            {copiedId === "sidebar-glass" ? <CopiedIcon /> : <CopyIcon theme={currentTheme} />}
            {copiedId === "sidebar-glass" ? "Copied!" : "Copy"}
          </CopyButton>
          <VariantCode>
{`"use client";
import { Sidebar } from "laventa-ui";

export default function GlassSidebar() {
  return (
    <Sidebar
      variant="glass"
      menu={[
        { label: "Dashboard", icon: "📊" },
        { label: "Profile", icon: "👤" },
        { label: "Settings", icon: "⚙️" },
        { label: "Logout", icon: "🚪" },
      ]}
      title="Navigation"
      onSelect={(item) => console.log("Selected:", item)}
    />
  );
}`}
          </VariantCode>
        </VariantCodeWrapper>
      </VariantSection>

      <VariantSection>
        <VariantTitle>Modern Sidebar</VariantTitle>
        <SidebarDemoWrapper>
          <Sidebar
            variant="modern"
            menu={[
              { label: "Dashboard" },
              { label: "Profile" },
              { label: "Settings" },
              { label: "Logout" },
            ]}
            bottomButton={{
              label: "Get in Touch",
              onClick: () => alert("Get in Touch Clicked"),
            }}
            title="Navigation"
            onSelect={(item) => console.log("Selected:", item)}
          />
        </SidebarDemoWrapper>
        <VariantCodeWrapper>
          <CopyButton onClick={() => copyToClipboard(`"use client";
import { Sidebar } from "laventa-ui";

export default function ModernSidebar() {
  return (
    <Sidebar
      variant="modern"
      menu={[
        { label: "Dashboard" },
        { label: "Profile" },
        { label: "Settings" },
        { label: "Logout" },
      ]}
      bottomButton={{
        label: "Get in Touch",
        onClick: () => console.log("Get in Touch clicked"),
      }}
      title="Navigation"
      onSelect={(item) => console.log("Selected:", item)}
    />
  );
}`, "sidebar-modern")}>
            {copiedId === "sidebar-modern" ? <CopiedIcon /> : <CopyIcon theme={currentTheme} />}
            {copiedId === "sidebar-modern" ? "Copied!" : "Copy"}
          </CopyButton>
          <VariantCode>
{`"use client";
import { Sidebar } from "laventa-ui";

export default function ModernSidebar() {
  return (
    <Sidebar
      variant="modern"
      menu={[
        { label: "Dashboard" },
        { label: "Profile" },
        { label: "Settings" },
        { label: "Logout" },
      ]}
      bottomButton={{
        label: "Get in Touch",
        onClick: () => console.log("Get in Touch clicked"),
      }}
      title="Navigation"
      onSelect={(item) => console.log("Selected:", item)}
    />
  );
}`}
          </VariantCode>
        </VariantCodeWrapper>
      </VariantSection>

      <VariantSection>
        <VariantTitle>Border Animation Sidebar</VariantTitle>
        <SidebarDemoWrapper>
          <Sidebar
            variant="BorderAnimation"
            menu={[
              { label: "Dashboard"},
              { label: "Profile"},
              { label: "Settings"},
              { label: "Logout"},
            ]}
            title="Navigation"
            onSelect={(item) => console.log("Selected:", item)}
          />
        </SidebarDemoWrapper>
        <VariantCodeWrapper>
          <CopyButton onClick={() => copyToClipboard(`"use client";
import { Sidebar } from "laventa-ui";

export default function ComponentSidebar() {
  return (
    <Sidebar
      variant="BorderAnimation"
      menu={[
        { label: "Dashboard" },
        { label: "Profile" },
        { label: "Settings"},
        { label: "Logout"},
      ]}
      title="Navigation"
      onSelect={(item) => console.log("Selected:", item)}
    />
  );
}`, "sidebar-stagger")}>
            {copiedId === "sidebar-stagger" ? <CopiedIcon /> : <CopyIcon theme={currentTheme} />}
            {copiedId === "sidebar-stagger" ? "Copied!" : "Copy"}
          </CopyButton>
          <VariantCode>
{`"use client";
import { Sidebar } from "laventa-ui";

export default function ComponentSidebar() {
  return (
    <Sidebar
      variant="BorderAnimation"
      menu={[
        { label: "Dashboard"},
        { label: "Profile"},
        { label: "Settings"},
        { label: "Logout"},
      ]}
      title="Navigation"
      onSelect={(item) => console.log("Selected:", item)}
    />
  );
}`}
          </VariantCode>
        </VariantCodeWrapper>
      </VariantSection>
    </>
  );

  const renderLandingPage = () => (
    <LandingPage ref={landingPageRef}>
      <HeroSection id="hero-section">
        <HeroTitle>Welcome to Laventa UI</HeroTitle>
        <HeroSubtitle>
          Bangun Tampilan Website Lebih Cepat, Lebih Rapi, dan Lebih Elegan
        </HeroSubtitle>
        <div style={{ display: 'flex', gap: currentTheme.spacing.lg, marginTop: currentTheme.spacing.xl, flexWrap: 'wrap', justifyContent: 'center' }}>
          <CTAButton 
            variant="primary"
            label="Mulai Sekarang"
            onClick={() => setSelectedComponent("mulai-sekarang")}
          />
          <CTAButton 
            variant="outline"
            label="Lihat Component"
            onClick={handleKomponenClick}
          />
        </div>
      </HeroSection>
    </LandingPage>
  );

  const renderKomponenSection = () => (
    <ComponentsPage ref={componentsPageRef}>
      <SectionTitle id="komponen-section">Komponen Tersedia</SectionTitle>
      <SectionDescription>
        Pilih komponen yang Anda butuhkan, cukup ambil dan copy kode. Semua komponen telah dirancang responsif dan mudah dikustomisasi.
      </SectionDescription>
      
      <ComponentGrid>
        <ComponentOverviewCard $isDark={isDarkMode} onClick={() => setSelectedComponent("button")}>
          <h3>Button</h3>
          <p>Tombol interaktif dengan berbagai gaya dan efek untuk aksi pengguna.</p>
          <button className="view-button">
            Lihat Komponen
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </ComponentOverviewCard>
        
        <ComponentOverviewCard $isDark={isDarkMode} onClick={() => setSelectedComponent("card")}>
          <h3>Card</h3>
          <p>Container untuk menampilkan konten dengan tampilan visual yang menarik.</p>
          <button className="view-button">
            Lihat Komponen
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </ComponentOverviewCard>
        
        <ComponentOverviewCard $isDark={isDarkMode} onClick={() => setSelectedComponent("header")}>
          <h3>Header</h3>
          <p>Komponen navigasi dan branding untuk header halaman.</p>
          <button className="view-button">
            Lihat Komponen
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </ComponentOverviewCard>
        
        <ComponentOverviewCard $isDark={isDarkMode} onClick={() => setSelectedComponent("footer")}>
          <h3>Footer</h3>
          <p>Bagian bawah halaman dengan berbagai layout dan gaya.</p>
          <button className="view-button">
            Lihat Komponen
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </ComponentOverviewCard>
        
        <ComponentOverviewCard $isDark={isDarkMode} onClick={() => setSelectedComponent("sidebar")}>
          <h3>Sidebar</h3>
          <p>Navigasi vertikal dengan desain modern dan elegan.</p>
          <button className="view-button">
            Lihat Komponen
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </ComponentOverviewCard>
      </ComponentGrid>
    </ComponentsPage>
  );

  const renderBeranda = () => (
    <>
      {renderLandingPage()}
      {renderKomponenSection()}
    </>
  );

  const renderComponentContent = () => {
    switch (selectedComponent) {
      case "beranda":
        return renderBeranda();
      case "mulai-sekarang":
        return renderMulaiSekarang();
      case "komponen":
        return (
          <>
            {renderLandingPage()}
            {renderKomponenSection()}
          </>
        );
      case "button":
        return renderButtonVariants();
      case "card":
        return renderCardVariants();
      case "header":
        return renderHeaderVariants();
      case "footer":
        return renderFooterVariants();
      case "sidebar":
        return renderSidebarVariants();
      default:
        return renderBeranda();
    }
  };

  // Tentukan apakah sidebar harus ditampilkan
  const showSidebar = !["beranda", "komponen", "mulai-sekarang"].includes(selectedComponent);
  
  // Tentukan apakah judul komponen harus ditampilkan
  const showComponentTitle = !["beranda", "komponen", "mulai-sekarang"].includes(selectedComponent);

  return (
    <ThemeProvider theme={currentTheme}>
      <ThemeContext.Provider value={{ isDark: isDarkMode, toggleTheme }}>
        <Layout>
          {/* Custom Header dengan style center variant */}
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '80px',
            background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 3px 8px rgba(0, 0, 0, 0.25)',
            backdropFilter: 'blur(10px)'
          }}>
            {/* Judul Laventa UI */}
            <h3 style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              margin: 0,
              fontSize: '2.2rem',
              fontWeight: 'bold',
              letterSpacing: '1px',
              color: '#fff',
              textShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
              fontFamily: currentTheme.fonts.title
            }}>
              Laventa UI
            </h3>

            {/* Navigation dan Theme Toggle */}
            <div style={{
              position: 'absolute',
              right: '2rem',
              display: 'flex',
              gap: '1.5rem',
              alignItems: 'center'
            }}>
              <nav style={{
                display: !isMobile ? 'flex' : 'none',
                gap: '1.5rem',
                alignItems: 'center'
              }}>
                <a href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleBerandaClick();
                  }}
                  style={{
                    color: (selectedComponent === "beranda" || !isInComponentSection) ? '#b79aff' : '#fff',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    fontWeight: '500',
                    padding: '8px 16px',
                    borderRadius: currentTheme.radius.sm,
                    transition: 'all 0.2s ease',
                    backgroundColor: (selectedComponent === "beranda" || !isInComponentSection) ? 'rgba(183, 154, 255, 0.1)' : 'transparent'
                  }}
                  onMouseOver={(e) => {
                    if (selectedComponent !== "beranda" && isInComponentSection) {
                      e.target.style.backgroundColor = 'rgba(183, 154, 255, 0.1)';
                      e.target.style.color = '#b79aff';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (selectedComponent !== "beranda" && isInComponentSection) {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#fff';
                    }
                  }}>
                  Beranda
                </a>

                <a href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleKomponenClick();
                  }}
                  style={{
                    color: (isInComponentSection || selectedComponent === "komponen") ? '#b79aff' : '#fff',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    fontWeight: '500',
                    padding: '8px 16px',
                    borderRadius: currentTheme.radius.sm,
                    transition: 'all 0.2s ease',
                    backgroundColor: (isInComponentSection || selectedComponent === "komponen") ? 'rgba(183, 154, 255, 0.1)' : 'transparent'
                  }}
                  onMouseOver={(e) => {
                    if (!isInComponentSection && selectedComponent !== "komponen") {
                      e.target.style.backgroundColor = 'rgba(183, 154, 255, 0.1)';
                      e.target.style.color = '#b79aff';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isInComponentSection && selectedComponent !== "komponen") {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#fff';
                    }
                  }}>
                  Komponen
                </a>
              </nav>

              <ThemeToggleButton onClick={toggleTheme}>
                {isDarkMode ? '☀️' : '🌙'}
              </ThemeToggleButton>

              <button
                onClick={() => setIsBurgerOpen(!isBurgerOpen)}
                style={{
                  display: isMobile ? 'block' : 'none',
                  background: 'none',
                  border: 'none',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '1.5rem',
                  padding: '8px',
                  borderRadius: currentTheme.radius.sm,
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = 'rgba(183, 154, 255, 0.1)';
                  e.target.style.color = '#b79aff';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#fff';
                }}
              >
                {isBurgerOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>

          <Main>
            {showSidebar && (
              <SidebarWrapper>
                <Sidebar
                  variant="gradient"
                  menu={sidebarMenu}
                  title="Components"
                  onSelect={(item) => setSelectedComponent(item.toLowerCase())}
                />
              </SidebarWrapper>
            )}

            <ContentContainer 
              ref={contentContainerRef}
              $showSidebar={showSidebar}
            >
              <Content>
                {showComponentTitle && (
                  <ComponentTitle>
                    {selectedComponent === "button" ? "Button Variants" :
                     selectedComponent === "card" ? "Card Variants" :
                     selectedComponent === "header" ? "Header Variants" :
                     selectedComponent === "footer" ? "Footer Variants" :
                     selectedComponent === "sidebar" ? "Sidebar Variants" :
                     selectedComponent.charAt(0).toUpperCase() + selectedComponent.slice(1) + " Variants"}
                  </ComponentTitle>
                )}
                
                {renderComponentContent()}

                {showAlert && (
                  <AlertContainer>
                    <span>{alertMessage}</span>
                  </AlertContainer>
                )}
              </Content>
            </ContentContainer>
          </Main>

          {isBurgerOpen && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.5)',
                zIndex: 999,
                display: 'flex',
                justifyContent: 'flex-end'
              }}
              onClick={() => setIsBurgerOpen(false)}
            >
              <div
                style={{
                  width: '250px',
                  background: currentTheme.colors.surface,
                  padding: currentTheme.spacing.lg,
                  boxShadow: `-2px 0 10px ${isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'}`,
                  borderLeft: `1px solid ${currentTheme.colors.border}`
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div style={{ marginBottom: currentTheme.spacing.xl, textAlign: 'center' }}>
                  <h3 style={{ color: currentTheme.colors.text, margin: 0 }}>Navigation</h3>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: currentTheme.spacing.sm }}>
                  <button
                    onClick={() => {
                      handleBerandaClick();
                      setIsBurgerOpen(false);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: currentTheme.colors.text,
                      textAlign: 'left',
                      padding: currentTheme.spacing.sm,
                      borderRadius: currentTheme.radius.sm,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = `${currentTheme.colors.primarySoft}20`;
                      e.target.style.color = currentTheme.colors.primary;
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = currentTheme.colors.text;
                    }}
                  >
                    Beranda
                  </button>
                  
                  <button
                    onClick={() => {
                      handleKomponenClick();
                      setIsBurgerOpen(false);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: currentTheme.colors.text,
                      textAlign: 'left',
                      padding: currentTheme.spacing.sm,
                      borderRadius: currentTheme.radius.sm,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = `${currentTheme.colors.primarySoft}20`;
                      e.target.style.color = currentTheme.colors.primary;
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = currentTheme.colors.text;
                    }}
                  >
                    Komponen
                  </button>
                </div>
              </div>
            </div>
          )}

          <FooterWrapper>
            <FooterContentWrapper>
              <Footer 
                variant="center"
                content={{
                  p: "© Laventa-UI",
                  small: "Created with care and crafted to inspire simplicity."
                }}
              />
            </FooterContentWrapper>
          </FooterWrapper>
        </Layout>
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}