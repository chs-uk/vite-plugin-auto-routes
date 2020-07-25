const viteAutoRoute = require('./src/plugin.js')

module.exports = {
  plugins: [viteAutoRoute({ pagesDir: './example/pages' })],
}
