// tokens/themes.js
export const themes = {
  dark: {
    colors: {
      // Warna utama lavender
      primary: "#b79aff",
      primarySoft: "#8a6eff",
      accent: "#7c3aed",
      gold: "#fbbf24",
      
      // Background & surfaces - lavender theme
      background: "linear-gradient(135deg, #0f0a1e 0%, #1a0b2e 100%)",
      surface: "#1a0b2e",
      surfaceLight: "#2d1b69",
      cardGlass: "rgba(183, 154, 255, 0.08)",
      softGlow: "rgba(183, 154, 255, 0.15)",
      
      // Text colors
      text: "#f3f4f6",
      textSecondary: "#d1d5db",
      muted: "#9ca3af",
      dim: "#6b7280",
      
      // Border & shadows
      border: "rgba(183, 154, 255, 0.1)",
      borderLight: "rgba(183, 154, 255, 0.05)",
      shadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
      shadowLight: "0 4px 20px rgba(183, 154, 255, 0.1)",
      
      // Status colors
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#3b82f6",
    },

    fonts: {
      title: "'Playfair Display', serif",
      body: "'Poppins', sans-serif",
    },

    radius: {
      xs: "6px",
      sm: "10px",
      md: "14px",
      lg: "22px",
      xl: "32px",
      pill: "999px",
    },

    spacing: {
      xxs: "6px",
      xs: "8px",
      sm: "12px",
      md: "20px",
      lg: "32px",
      xl: "48px",
      xxl: "64px",
    },

    effects: {
      transition: "200ms cubic-bezier(0.2, 0.8, 0.2, 1)",
      heavyShadow: "0 20px 50px rgba(0, 0, 0, 0.4)",
      glassBlur: "blur(10px)",
      hoverScale: "scale(1.02)",
    },

    layout: {
      maxWidth: "1200px",
      pagePadding: "28px",
      headerHeight: "80px",
      footerHeight: "60px",
    },

    gradients: {
      // Gradient untuk header
      headerGradient: "linear-gradient(135deg, #1a0b2e 0%, #2d1b69 100%)",
      // Gradient untuk background
      darkLav: "linear-gradient(135deg, #0f0a1e 0%, #1a0b2e 50%, #0f0a1e 100%)",
      // Gradient lavender untuk buttons/cards
      lavender: "linear-gradient(135deg, #b79aff 0%, #8a6eff 60%)",
      // Soft gradient untuk surfaces
      purpleGlow: "linear-gradient(135deg, rgba(183, 154, 255, 0.15) 0%, rgba(138, 110, 255, 0.08) 100%)",
      // Gradient untuk footer
      footerGradient: "linear-gradient(135deg, #1a0b2e 0%, #2d1b69 100%)",
      gold: "linear-gradient(135deg, #fbbf24 0%, #fde68a 100%)",
    },

    variants: {
      button: {
        primary: "#b79aff",
        secondary: "#8a6eff",
        outline: "transparent",
        glow: "#7c3aed",
      },
      card: {
        glass: "rgba(183, 154, 255, 0.08)",
        gradient: "linear-gradient(135deg, #b79aff 0%, #8a6eff 60%)",
        solid: "#1a0b2e",
      }
    }
  },

  light: {
    colors: {
      // Warna utama lavender yang lebih gelap untuk kontras
      primary: "#7c3aed",
      primarySoft: "#6d28d9",
      accent: "#5b21b6",
      gold: "#d97706",
      
      // Background & surfaces - lavender light theme
      background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #f8fafc 100%)",
      surface: "#ffffff",
      surfaceLight: "#f9fafb",
      cardGlass: "rgba(255, 255, 255, 0.95)",
      softGlow: "rgba(124, 58, 237, 0.1)",
      
      // Text colors - lebih kontras
      text: "#111827",
      textSecondary: "#374151",
      muted: "#4b5563",
      dim: "#6b7280",
      
      // Border & shadows - lebih jelas
      border: "rgba(124, 58, 237, 0.1)",
      borderLight: "rgba(124, 58, 237, 0.05)",
      shadow: "0 6px 24px rgba(0, 0, 0, 0.08)",
      shadowLight: "0 3px 12px rgba(124, 58, 237, 0.15)",
      
      // Status colors
      success: "#059669",
      warning: "#d97706",
      error: "#dc2626",
      info: "#2563eb",
    },

    fonts: {
      title: "'Playfair Display', serif",
      body: "'Poppins', sans-serif",
    },

    radius: {
      xs: "6px",
      sm: "10px",
      md: "14px",
      lg: "22px",
      xl: "32px",
      pill: "999px",
    },

    spacing: {
      xxs: "6px",
      xs: "8px",
      sm: "12px",
      md: "20px",
      lg: "32px",
      xl: "48px",
      xxl: "64px",
    },

    effects: {
      transition: "200ms cubic-bezier(0.2, 0.8, 0.2, 1)",
      heavyShadow: "0 20px 50px rgba(0, 0, 0, 0.15)",
      glassBlur: "blur(10px)",
      hoverScale: "scale(1.02)",
    },

    layout: {
      maxWidth: "1200px",
      pagePadding: "28px",
      headerHeight: "80px",
      footerHeight: "60px",
    },

    gradients: {
      // Gradient untuk header light mode
      headerGradient: "linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)",
      // Gradient untuk background light
      darkLav: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #f8fafc 100%)",
      // Gradient lavender untuk buttons/cards light
      lavender: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 60%)",
      // Soft gradient untuk surfaces light
      purpleGlow: "linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(109, 40, 217, 0.05) 100%)",
      // Gradient untuk footer light
      footerGradient: "linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)",
      gold: "linear-gradient(135deg, #d97706 0%, #fbbf24 100%)",
    },

    variants: {
      button: {
        primary: "#7c3aed",
        secondary: "#6d28d9",
        outline: "transparent",
        glow: "#5b21b6",
      },
      card: {
        glass: "rgba(255, 255, 255, 0.95)",
        gradient: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 60%)",
        solid: "#ffffff",
      }
    }
  },
};

// Default theme
export const theme = themes.dark;

// Utility functions
export const getThemeColor = (theme, colorPath) => {
  const path = colorPath.split('.');
  let result = theme;
  
  for (const key of path) {
    if (result[key] === undefined) {
      console.warn(`Color path "${colorPath}" not found in theme`);
      return theme.colors.primary;
    }
    result = result[key];
  }
  
  return result;
};

export const THEME_NAMES = {
  DARK: 'dark',
  LIGHT: 'light'
};