/**
 * @fileoverview Require i18n constants in components
 * @author Guy Romelle Magayano
 */

export default {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Require i18n constants file for components with user-facing text",
      category: "Best Practices",
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      missingI18n:
        "Component with user-facing text must have corresponding Component.i18n.ts file",
    },
  },

  create(context) {
    const filename = context.getFilename();

    // Only apply to component files
    if (!filename.includes("/components/") || !filename.endsWith(".tsx")) {
      return {};
    }

    return {
      Program(node) {
        const sourceCode = context.getSourceCode();
        const text = sourceCode.getText();

        // Check if component has user-facing text (strings in JSX)
        const hasUserFacingText =
          /['"`][^'"`]*['"`]/.test(text) &&
          (text.includes("aria-label") ||
            text.includes("title") ||
            text.includes("placeholder") ||
            (text.includes(">") && text.includes("<")));

        if (hasUserFacingText) {
          // Extract component name from filename
          const componentName = filename.split("/").pop().replace(".tsx", "");
        const _expectedI18nPath = filename.replace(
          ".tsx",
          "/constants/" + componentName + ".i18n.ts"
        );

          // Check if i18n file exists (this would need to be enhanced with file system access)
          // For now, we'll just warn about the requirement
          context.report({
            node,
            messageId: "missingI18n",
          });
        }
      },
    };
  },
};
