import { describe, expect, it } from "vitest";

describe("Centralized Mocks", () => {
  describe("@web/components mocks", () => {
    it("should have Card component mock defined", async () => {
      const mocks = await import("../__mocks__/@web/components");
      expect(mocks.Card).toBeDefined();
      // Card is an object with sub-components attached, so it's not a plain function
      expect(typeof mocks.Card).toBe("object");
    });

    it("should have Card sub-components mock defined", async () => {
      const mocks = await import("../__mocks__/@web/components");
      expect(mocks.Card.Title).toBeDefined();
      expect(mocks.Card.Description).toBeDefined();
      expect(mocks.Card.Cta).toBeDefined();
      expect(mocks.Card.Eyebrow).toBeDefined();
      expect(mocks.Card.Link).toBeDefined();
    });

    it("should have Container components mock defined", async () => {
      const mocks = await import("../__mocks__/@web/components");
      expect(mocks.Container).toBeDefined();
      expect(mocks.ContainerInner).toBeDefined();
      expect(mocks.ContainerOuter).toBeDefined();
    });

    it("should have Footer components mock defined", async () => {
      const mocks = await import("../__mocks__/@web/components");
      expect(mocks.Footer).toBeDefined();
      expect(mocks.FooterLegal).toBeDefined();
      expect(mocks.FooterNavigation).toBeDefined();
    });

    it("should have Article components mock defined", async () => {
      const mocks = await import("../__mocks__/@web/components");
      expect(mocks.ArticleBase).toBeDefined();
      expect(mocks.ArticleLayout).toBeDefined();
      expect(mocks.ArticleList).toBeDefined();
      expect(mocks.ArticleListItem).toBeDefined();
      expect(mocks.ArticleNavButton).toBeDefined();
    });

    it("should have utility components mock defined", async () => {
      const mocks = await import("../__mocks__/@web/components");
      expect(mocks.Div).toBeDefined();
      expect(mocks.Span).toBeDefined();
      expect(mocks.Prose).toBeDefined();
      expect(mocks.Icon).toBeDefined();
      expect(mocks.Icon.ArrowLeft).toBeDefined();
      expect(mocks.Icon.ArrowRight).toBeDefined();
    });
  });

  describe("@portfolio/utils mocks", () => {
    it("should have utility functions mock defined", async () => {
      const mocks = await import("../__mocks__/@portfolio/utils");

      expect(mocks.useComponentId).toBeDefined();
      expect(mocks.setDisplayName).toBeDefined();
      expect(mocks.createComponentProps).toBeDefined();
      expect(mocks.hasAnyRenderableContent).toBeDefined();
      expect(mocks.hasMeaningfulText).toBeDefined();
      expect(mocks.hasValidContent).toBeDefined();
      expect(mocks.formatDateSafely).toBeDefined();
      expect(mocks.isValidLink).toBeDefined();
      expect(mocks.getLinkTargetProps).toBeDefined();
      expect(mocks.hasValidNavigationLinks).toBeDefined();
      expect(mocks.filterValidNavigationLinks).toBeDefined();
      expect(mocks.isValidImageSrc).toBeDefined();
      expect(mocks.cn).toBeDefined();
      expect(mocks.formatDate).toBeDefined();
    });

    it("should have working cn utility", async () => {
      const mocks = await import("../__mocks__/@portfolio/utils");
      const result = mocks.cn("class1", "class2", false && "class3", "class4");
      expect(result).toBe("class1 class2 class4");
    });

    it("should have working useComponentId hook", async () => {
      const mocks = await import("../__mocks__/@portfolio/utils");
      const result = mocks.useComponentId({
        debugId: "test-id",
        debugMode: true,
      });
      expect(result.componentId).toBe("test-id");
      expect(result.isDebugMode).toBe(true);
    });
  });

  describe("@portfolio/hooks mocks", () => {
    it("should have hook functions mock defined", async () => {
      const mocks = await import("../__mocks__/@portfolio/hooks");

      expect(mocks.useComponentId).toBeDefined();
      expect(mocks.useRouter).toBeDefined();
      expect(mocks.usePathname).toBeDefined();
      expect(mocks.useSearchParams).toBeDefined();
      expect(mocks.useIntersection).toBeDefined();
      expect(mocks.useInView).toBeDefined();
    });

    it("should have working useRouter hook", async () => {
      const mocks = await import("../__mocks__/@portfolio/hooks");
      const router = mocks.useRouter();
      expect(router).toBeDefined();
      expect(router.push).toBeDefined();
      expect(router.back).toBeDefined();
      expect(router.forward).toBeDefined();
      expect(router.refresh).toBeDefined();
      expect(router.replace).toBeDefined();
      expect(router.prefetch).toBeDefined();
    });

    it("should have working usePathname hook", async () => {
      const mocks = await import("../__mocks__/@portfolio/hooks");
      const pathname = mocks.usePathname();
      expect(pathname).toBe("/");
    });
  });

  describe("@portfolio/logger mocks", () => {
    it("should have logger functions mock defined", async () => {
      const mocks = await import("../__mocks__/@portfolio/logger");

      expect(mocks.logger).toBeDefined();
      expect(mocks.logInfo).toBeDefined();
      expect(mocks.logWarn).toBeDefined();
      expect(mocks.logError).toBeDefined();
      expect(mocks.logDebug).toBeDefined();
    });

    it("should allow calling logger functions", async () => {
      const mocks = await import("../__mocks__/@portfolio/logger");
      expect(() => mocks.logInfo("test")).not.toThrow();
      expect(() => mocks.logDebug("test")).not.toThrow();
    });
  });
});
