/**
 * @fileoverview Require proper data folder structure
 * @author Guy Romelle Magayano
 */

export default {
  meta: {
    type: "suggestion",
    docs: {
      description: "Require proper data folder structure for components",
      category: "Best Practices",
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      incorrectDataStructure:
        "Component data must be in _data/ folder, not data/ folder",
    },
  },

  create(context) {
    const filename = context.getFilename();

    // Check if file is in data/ folder instead of _data/
    if (filename.includes("/data/") && !filename.includes("/_data/")) {
      context.report({
        node: context.getSourceCode().ast,
        messageId: "incorrectDataStructure",
      });
    }

    return {};
  },
};
