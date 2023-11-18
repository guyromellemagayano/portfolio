const { join } = require('path')

module.exports = {
  plugins: {
    tailwindcss: {
      config: join(__dirname, 'tailwind.config.js')
    },
    autoprefixer: {},
    'postcss-focus-visible': {
      replaceWith: '[data-focus-visible-added]'
    }
  }
}
