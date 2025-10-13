/**
 * @fileoverview Require isMemoized prop in component interfaces
 * @author Guy Romelle Magayano
 */

export default {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Require isMemoized prop in component interfaces for performance control",
      category: "Best Practices",
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      missingMemoizationProp:
        "Component interface must include isMemoized?: boolean prop",
    },
  },

  create(context) {
    const filename = context.getFilename();

    // Only apply to component files
    if (!filename.includes("/components/") || !filename.endsWith(".tsx")) {
      return {};
    }

    return {
      TSInterfaceDeclaration(node) {
        const sourceCode = context.getSourceCode();
        const _text = sourceCode.getText();

        // Check if this is a component props interface
        if (node.id.name.endsWith("Props")) {
          const hasMemoizationProp = node.body.body.some(
            (prop) => prop.key && prop.key.name === "isMemoized"
          );

          if (!hasMemoizationProp) {
            context.report({
              node,
              messageId: "missingMemoizationProp",
            });
          }
        }
      },
    };
  },
};
