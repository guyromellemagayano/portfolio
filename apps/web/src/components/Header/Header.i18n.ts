// ============================================================================
// HEADER COMPONENT INTERNATIONALIZATION
// ============================================================================

export type HeaderI18n = Readonly<Record<string, string>>;
export const HEADER_I18N = {
  // Navigation labels
  home: "Home",
  about: "About",
  articles: "Articles",
  projects: "Projects",
  speaking: "Speaking",
  uses: "Uses",

  // Menu labels
  menu: "Menu",
  closeMenu: "Close menu",
  navigation: "Navigation",

  // Theme labels
  toggleTheme: "Toggle theme",
  lightMode: "Light mode",
  darkMode: "Dark mode",

  // Accessibility labels
  avatar: "Avatar",
  mainNavigation: "Main navigation",
  mobileNavigation: "Mobile navigation",
  desktopNavigation: "Desktop navigation",
} as const satisfies HeaderI18n;
