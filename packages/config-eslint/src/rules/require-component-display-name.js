/**
 * @fileoverview Require component display names
 * @author Guy Romelle Magayano
 */

export default {
  meta: {
    type: "suggestion",
    docs: {
      description: "Require setDisplayName for all components",
      category: "Best Practices",
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      missingDisplayName:
        "Component must use setDisplayName for proper debugging",
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

        // Check if file exports a component
        const exportsComponent =
          text.includes("export") &&
          (text.includes("const") || text.includes("function")) &&
          (text.includes("Component") || text.includes("Props"));

        if (exportsComponent) {
          const hasSetDisplayName = text.includes("setDisplayName");

          if (!hasSetDisplayName) {
            context.report({
              node,
              messageId: "missingDisplayName",
            });
          }
        }
      },
    };
  },
};
