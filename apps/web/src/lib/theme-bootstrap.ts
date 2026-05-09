/**
 * @file apps/web/src/lib/theme-bootstrap.ts
 * @author Guy Romelle Magayano
 * @description Theme bootstrap helpers for the shared document shell.
 */

export const LIGHT_THEME_COLOR = "#fafaf9";
export const DARK_THEME_COLOR = "#09090b";

/** Builds the inline theme bootstrap script used before the page renders. */
export function buildThemeBootstrapScript(): string {
  return `
(() => {
  const storageKey = "theme";
  const root = document.documentElement;
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  const media = window.matchMedia("(prefers-color-scheme: dark)");

  function getStoredTheme() {
    try {
      const theme = window.localStorage.getItem(storageKey);
      return theme === "dark" || theme === "light" ? theme : null;
    } catch {
      return null;
    }
  }

  function getSystemTheme() {
    return media.matches ? "dark" : "light";
  }

  function getPreferredTheme() {
    return getStoredTheme() ?? getSystemTheme();
  }

  function applyTheme(theme) {
    const nextTheme = theme === "dark" ? "dark" : "light";
    root.classList.toggle("dark", nextTheme === "dark");
    root.dataset.theme = nextTheme;
    root.style.colorScheme = nextTheme;

    if (themeColorMeta) {
      themeColorMeta.setAttribute(
        "content",
        nextTheme === "dark" ? ${JSON.stringify(DARK_THEME_COLOR)} : ${JSON.stringify(LIGHT_THEME_COLOR)}
      );
    }

    window.dispatchEvent(
      new CustomEvent("portfolio-theme-change", {
        detail: { theme: nextTheme },
      })
    );
  }

  function setPreferredTheme(theme) {
    const nextTheme = theme === "dark" ? "dark" : "light";

    try {
      window.localStorage.setItem(storageKey, nextTheme);
    } catch {}

    applyTheme(nextTheme);
  }

  function clearPreferredTheme() {
    try {
      window.localStorage.removeItem(storageKey);
    } catch {}

    applyTheme(getPreferredTheme());
  }

  function getResolvedTheme() {
    return root.classList.contains("dark") ? "dark" : "light";
  }

  window.__portfolioTheme = {
    clearPreferredTheme,
    getPreferredTheme,
    getResolvedTheme,
    getStoredTheme,
    getSystemTheme,
    setPreferredTheme,
    toggleTheme() {
      setPreferredTheme(getResolvedTheme() === "dark" ? "light" : "dark");
    },
  };

  applyTheme(getPreferredTheme());

  const handleSystemThemeChange = () => {
    if (!getStoredTheme()) {
      applyTheme(getPreferredTheme());
    }
  };

  if (typeof media.addEventListener === "function") {
    media.addEventListener("change", handleSystemThemeChange);
  } else if (typeof media.addListener === "function") {
    media.addListener(handleSystemThemeChange);
  }
})();
`;
}
