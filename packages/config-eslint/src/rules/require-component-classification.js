/**
 * @fileoverview Require component classification comments
 * @author Guy Romelle Magayano
 */

export default {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Require component classification comments in React components",
      category: "Best Practices",
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      missingClassification:
        "Component must have classification comment with type, testing, structure, risk tier, and data source",
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
        const comments = sourceCode.getAllComments();

        // Look for classification comment
        const hasClassification = comments.some(
          (comment) =>
            comment.value.includes("COMPONENT CLASSIFICATION") ||
            comment.value.includes("Type:") ||
            comment.value.includes("Testing:") ||
            comment.value.includes("Structure:") ||
            comment.value.includes("Risk Tier:") ||
            comment.value.includes("Data Source:")
        );

        if (!hasClassification) {
          context.report({
            node,
            messageId: "missingClassification",
          });
        }
      },
    };
  },
};
