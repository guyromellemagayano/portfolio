/**
 * @fileoverview Require ARIA attributes for accessibility
 * @author Guy Romelle Magayano
 */

export default {
  meta: {
    type: "suggestion",
    docs: {
      description: "Require ARIA attributes for interactive elements",
      category: "Accessibility",
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      missingAriaLabel:
        "Interactive element must have aria-label or aria-labelledby",
      missingAriaRole:
        "Element with interactive behavior must have appropriate ARIA role",
    },
  },

  create(context) {
    return {
      JSXElement(node) {
        const tagName = node.openingElement.name.name;

        // Check for interactive elements
        if (["button", "a", "input", "select", "textarea"].includes(tagName)) {
          const hasAriaLabel = node.openingElement.attributes.some(
            (attr) =>
              attr.name &&
              (attr.name.name === "aria-label" ||
                attr.name.name === "aria-labelledby")
          );

          if (!hasAriaLabel) {
            context.report({
              node,
              messageId: "missingAriaLabel",
            });
          }
        }

        // Check for elements with onClick that need ARIA roles
        const hasOnClick = node.openingElement.attributes.some(
          (attr) => attr.name && attr.name.name === "onClick"
        );

        if (hasOnClick && !["button", "a"].includes(tagName)) {
          const hasAriaRole = node.openingElement.attributes.some(
            (attr) => attr.name && attr.name.name === "role"
          );

          if (!hasAriaRole) {
            context.report({
              node,
              messageId: "missingAriaRole",
            });
          }
        }
      },
    };
  },
};
