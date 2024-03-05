module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'tailwindcss/nesting': 'postcss-nesting',
    'postcss-import': {},
    'postcss-focus-visible': {
      replaceWith: '[data-focus-visible-added]'
    },
    'postcss-preset-env': {
      features: { 'nesting-rules': false }
    },
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
  }
}
