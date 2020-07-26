const virtual = require('@rollup/plugin-virtual')
const { parsePagesDirectory } = require('./directory-parser')

function makeModuleContent({ pagesDir }) {
  const { routes } = parsePagesDirectory(pagesDir)
  return `export const routes = [${routes.join(', \n')}]`
}

module.exports = function ({ pagesDir } = { pagesDir: 'src/pages/' }) {
  const configureServer = [
    async ({ app }) => {
      app.use(async (ctx, next) => {
        if (ctx.path.startsWith('/@modules/vue-auto-routes')) {
          ctx.type = 'js'
          ctx.body = makeModuleContent({ pagesDir })
        } else {
          await next()
        }
      })
    },
  ]

  const rollupInputOptions = {
    plugins: [virtual({ 'vue-auto-routes': makeModuleContent({ pagesDir }) })],
  }

  /* Note: these route options are not yet used anywhere */
  const vueCustomBlockTransforms = {
    route: ({ code }) => {
      return `
        export default function (Component) {
          Component.__routeOptions = ${code}
        }
      `
    },
  }

  return { configureServer, rollupInputOptions, vueCustomBlockTransforms }
}
