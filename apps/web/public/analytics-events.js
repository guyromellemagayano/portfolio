/* global HTMLFormElement, HTMLInputElement, IntersectionObserver, document, window */

(function initializePortfolioAnalytics() {
  if (window.__portfolioAnalyticsInitialized) {
    return;
  }

  const currentScript = document.currentScript;
  const googleAnalyticsMeasurementId =
    currentScript?.dataset.googleAnalyticsMeasurementId || "";

  if (!googleAnalyticsMeasurementId) {
    return;
  }

  window.__portfolioAnalyticsInitialized = true;

  const textLimit = 120;
  const scrollDepths = [25, 50, 75, 90];
  const sentScrollDepths = new Set();
  const searchTimers = new WeakMap();

  function normalizeText(value) {
    return String(value || "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, textLimit);
  }

  function getUrl(href) {
    try {
      return new URL(href, window.location.href);
    } catch {
      return null;
    }
  }

  function getElementLabel(element) {
    return normalizeText(
      element.dataset.analyticsLabel ||
        element.getAttribute("aria-label") ||
        element.getAttribute("title") ||
        element.querySelector("h1,h2,h3,h4,h5,h6")?.textContent ||
        element.textContent
    );
  }

  function getAnalyticsParams(element) {
    return {
      content_type: element.dataset.analyticsContentType || undefined,
      content_id: element.dataset.analyticsContentId || undefined,
      content_name:
        element.dataset.analyticsContentName ||
        getElementLabel(element) ||
        undefined,
      placement: element.dataset.analyticsPlacement || undefined,
      method: element.dataset.analyticsMethod || undefined,
      lead_type: element.dataset.analyticsLeadType || undefined,
    };
  }

  function sendAnalyticsEvent(eventName, params = {}) {
    if (typeof window.gtag !== "function") {
      return;
    }

    window.gtag("event", eventName, {
      send_to: googleAnalyticsMeasurementId,
      page_location: window.location.href,
      page_title: document.title,
      ...params,
    });
  }

  function trackLinkClick(event) {
    const link = event.target?.closest?.("a[href]");

    if (!link) {
      return;
    }

    const href = link.getAttribute("href") || "";
    const url = getUrl(link.href || href);
    const isMailto = href.startsWith("mailto:");
    const isTelephone = href.startsWith("tel:");
    const isExternal =
      Boolean(url) &&
      !isMailto &&
      !isTelephone &&
      url.origin !== window.location.origin;
    const isDownload =
      link.hasAttribute("download") ||
      Boolean(
        url?.pathname.match(/\.(csv|docx?|pdf|pptx?|rtf|txt|xlsx?|zip)$/i)
      );
    const linkType = isMailto
      ? "email"
      : isTelephone
        ? "telephone"
        : isDownload
          ? "download"
          : isExternal
            ? "outbound"
            : "internal";
    const linkText = getElementLabel(link);
    const destinationPath =
      url?.origin === window.location.origin ? url.pathname : "";
    const params = {
      ...getAnalyticsParams(link),
      content_type: link.dataset.analyticsContentType || linkType || undefined,
      content_id:
        link.dataset.analyticsContentId ||
        (url ? `${url.pathname}${url.search}${url.hash}` : href) ||
        undefined,
      link_text: linkText || undefined,
      link_type: linkType,
      link_url: isMailto || isTelephone ? href : url?.href || href,
      link_domain: url?.hostname || undefined,
    };

    sendAnalyticsEvent("select_content", params);

    if (link.dataset.analyticsEvent) {
      sendAnalyticsEvent(link.dataset.analyticsEvent, params);
      return;
    }

    if (isMailto) {
      sendAnalyticsEvent("generate_lead", {
        ...params,
        method: "email",
        lead_type: "direct_contact",
      });
      return;
    }

    if (destinationPath === "/contact") {
      sendAnalyticsEvent("lead_start", {
        ...params,
        method: "site_navigation",
      });
    }
  }

  function trackFormSubmit(event) {
    const form = event.target;

    if (!(form instanceof HTMLFormElement)) {
      return;
    }

    const searchInput = form.matches('[role="search"]')
      ? form.querySelector("input")
      : null;
    const searchTerm = normalizeText(searchInput?.value);

    if (searchTerm) {
      sendAnalyticsEvent("search", {
        search_term: searchTerm,
        method: "form_submit",
      });
      return;
    }

    sendAnalyticsEvent("generate_lead", {
      ...getAnalyticsParams(form),
      form_id: form.id || undefined,
      form_name:
        form.getAttribute("name") ||
        form.getAttribute("aria-label") ||
        undefined,
      method: form.method || "form",
      lead_type: form.dataset.analyticsLeadType || "form_submit",
    });
  }

  function trackSearchInput(event) {
    const input = event.target;

    if (!(input instanceof HTMLInputElement)) {
      return;
    }

    const searchRegion = input.closest('[role="search"]');

    if (!searchRegion) {
      return;
    }

    const searchTerm = normalizeText(input.value);
    const existingTimer = searchTimers.get(input);

    if (existingTimer) {
      window.clearTimeout(existingTimer);
    }

    if (searchTerm.length < 2) {
      return;
    }

    const nextTimer = window.setTimeout(() => {
      sendAnalyticsEvent("search", {
        search_term: searchTerm,
        method: "inline_search",
      });
    }, 900);

    searchTimers.set(input, nextTimer);
  }

  function trackScrollDepth() {
    const pageHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;

    if (pageHeight <= viewportHeight) {
      return;
    }

    const viewportBottom = window.scrollY + viewportHeight;
    const percentScrolled = Math.min(
      100,
      Math.round((viewportBottom / pageHeight) * 100)
    );

    scrollDepths.forEach((depth) => {
      if (percentScrolled >= depth && !sentScrollDepths.has(depth)) {
        sentScrollDepths.add(depth);
        sendAnalyticsEvent("scroll_depth", {
          percent_scrolled: depth,
        });
      }
    });
  }

  function getSectionName(section) {
    const headingId = section.getAttribute("aria-labelledby");
    const heading = headingId ? document.getElementById(headingId) : null;

    return normalizeText(heading?.textContent || section.id);
  }

  function observeSections() {
    if (!("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const section = entry.target;

          observer.unobserve(section);
          sendAnalyticsEvent("section_view", {
            section_id:
              section.getAttribute("aria-labelledby") ||
              section.id ||
              undefined,
            section_name: getSectionName(section) || undefined,
          });
        });
      },
      { threshold: 0.45 }
    );

    document
      .querySelectorAll("main section[aria-labelledby]")
      .forEach((section) => observer.observe(section));
  }

  function observeContentImpressions() {
    if (!("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const element = entry.target;

          observer.unobserve(element);
          sendAnalyticsEvent("content_impression", {
            ...getAnalyticsParams(element),
            content_type: element.dataset.analyticsImpression || undefined,
          });
        });
      },
      { threshold: 0.55 }
    );

    document
      .querySelectorAll("[data-analytics-impression]")
      .forEach((element) => observer.observe(element));
  }

  function trackButtonClick(event) {
    const button = event.target?.closest?.("button");

    if (!button) {
      return;
    }

    const interactionName = button.dataset.mobileMenuOpen
      ? "mobile_menu_open"
      : button.dataset.mobileMenuClose
        ? "mobile_menu_close"
        : button.dataset.analyticsInteraction;

    if (!interactionName) {
      return;
    }

    sendAnalyticsEvent("ui_interaction", {
      interaction_name: interactionName,
      interaction_label: getElementLabel(button) || undefined,
    });
  }

  function initializeAnalyticsEvents() {
    document.addEventListener("click", trackLinkClick);
    document.addEventListener("click", trackButtonClick);
    document.addEventListener("submit", trackFormSubmit);
    document.addEventListener("input", trackSearchInput);
    window.addEventListener("scroll", trackScrollDepth, { passive: true });
    trackScrollDepth();
    observeSections();
    observeContentImpressions();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeAnalyticsEvents, {
      once: true,
    });
  } else {
    initializeAnalyticsEvents();
  }
})();
