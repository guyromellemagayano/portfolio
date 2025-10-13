/**
 * @fileoverview Require proper type organization
 * @author Guy Romelle Magayano
 */

export default {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Require proper type organization (inline types, no separate .types.ts files)",
      category: "Best Practices",
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      separateTypesFile:
        "Avoid separate .types.ts files - use inline types in component files",
    },
  },

  create(context) {
    const filename = context.getFilename();

    // Check if file is a separate types file
    if (filename.endsWith(".types.ts") && !filename.includes("_types/")) {
      context.report({
        node: context.getSourceCode().ast,
        messageId: "separateTypesFile",
      });
    }

    return {};
  },
};
