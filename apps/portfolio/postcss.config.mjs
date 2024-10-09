/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    'postcss-import': {},
    'postcss-focus-visible': {
      replaceWith: '[data-focus-visible-added]'
    },
    'postcss-preset-env': {
      features: { 'nesting-rules': false }
    },
    'tailwindcss/nesting': 'postcss-nesting',
    tailwindcss: {},
    autoprefixer: {}
  }
}

export default config
