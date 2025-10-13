/**
 * @fileoverview Require test classification comments
 * @author Guy Romelle Magayano
 */

export default {
  meta: {
    type: "suggestion",
    docs: {
      description: "Require test classification comments in test files",
      category: "Best Practices",
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      missingTestClassification:
        "Test file must have classification comment with test type and coverage requirements",
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
        const comments = sourceCode.getAllComments();

        // Look for test classification comment
        const hasClassification = comments.some(
          (comment) =>
            comment.value.includes("TEST CLASSIFICATION") ||
            comment.value.includes("Test Type:") ||
            comment.value.includes("Coverage:") ||
            comment.value.includes("Risk Tier:")
        );

        if (!hasClassification) {
          context.report({
            node,
            messageId: "missingTestClassification",
          });
        }
      },
    };
  },
};
