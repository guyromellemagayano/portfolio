/**
 * @fileoverview Require proper import order
 * @author Guy Romelle Magayano
 */

export default {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Require proper import order: React, external, internal, relative",
      category: "Best Practices",
      recommended: true,
    },
    fixable: "code",
    schema: [],
    messages: {
      incorrectImportOrder:
        "Imports must be in order: React, external, internal, relative",
    },
  },

  create(context) {
    return {
      Program(node) {
        const _sourceCode = context.getSourceCode();
        const imports = node.body.filter(
          (node) => node.type === "ImportDeclaration"
        );

        if (imports.length < 2) return;

        for (let i = 1; i < imports.length; i++) {
          const current = imports[i];
          const previous = imports[i - 1];

          const currentSource = current.source.value;
          const previousSource = previous.source.value;

          // Check import order
          if (!isImportOrderCorrect(previousSource, currentSource)) {
            context.report({
              node: current,
              messageId: "incorrectImportOrder",
            });
          }
        }
      },
    };
  },
};

function isImportOrderCorrect(prevSource, currentSource) {
  const getImportType = (source) => {
    if (source === "react") return 0; // React first
    if (source.startsWith("@")) return 1; // External packages
    if (source.startsWith("./") || source.startsWith("../")) return 3; // Relative
    return 2; // Internal
  };

  return getImportType(prevSource) <= getImportType(currentSource);
}
