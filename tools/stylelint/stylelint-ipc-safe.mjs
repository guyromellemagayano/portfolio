import stylelint from "stylelint";

function sanitizeLintResult(result) {
  if (!result || typeof result !== "object") {
    return result;
  }

  if (!Array.isArray(result.results)) {
    return result;
  }

  return {
    ...result,
    results: result.results.map((item) => {
      if (!item || typeof item !== "object") {
        return item;
      }

      const { _postcssResult, ...safeItem } = item;
      return safeItem;
    }),
  };
}

const stylelintIpcSafe = {
  ...stylelint,
  lint: async (...args) => {
    const result = await stylelint.lint(...args);
    return sanitizeLintResult(result);
  },
};

export default stylelintIpcSafe;
