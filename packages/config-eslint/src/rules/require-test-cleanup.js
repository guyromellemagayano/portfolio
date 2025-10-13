/**
 * @fileoverview Require test cleanup in test files
 * @author Guy Romelle Magayano
 */

export default {
  meta: {
    type: "suggestion",
    docs: {
      description: "Require afterEach cleanup in test files",
      category: "Best Practices",
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      missingTestCleanup: "Test file must have afterEach cleanup hook",
    },
  },

  create(context) {
    const filename = context.getFilename();

    // Only apply to test files
    if (!filename.includes("__tests__") || !filename.endsWith(".test.tsx")) {
      return {};
    }

    return {
      Program(node) {
        const sourceCode = context.getSourceCode();
        const text = sourceCode.getText();

        // Check for afterEach cleanup
        const hasAfterEach =
          text.includes("afterEach") && text.includes("cleanup");

        if (!hasAfterEach) {
          context.report({
            node,
            messageId: "missingTestCleanup",
          });
        }
      },
    };
  },
};
