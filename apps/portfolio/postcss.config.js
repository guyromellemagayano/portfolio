const { join } = require('path')

module.exports = {
  plugins: {
    tailwindcss: {
      config: join(__dirname, 'tailwind.config.js')
    },
    autoprefixer: {},
    'tailwindcss/nesting': 'postcss-nesting',
    'postcss-focus-visible': {
      replaceWith: '[data-focus-visible-added]'
    },
    'postcss-import': {},
    'postcss-preset-env': {
      features: { 'nesting-rules': false }
    },
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
  }
}
