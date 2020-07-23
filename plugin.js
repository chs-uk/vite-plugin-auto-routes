const fs = require('fs')
const virtual = require('@rollup/plugin-virtual')

function parsePagesDirectory() {
  const files = fs
    .readdirSync('./src/pages')
    .map((f) => ({ name: f.split('.')[0], importPath: `/src/pages/${f}` }))

  const imports = files.map((f) => `import ${f.name} from '${f.importPath}'`)

  const routes = files.map(
    (f) => `{
        name: '${f.name}',
        path: '/${f.name}',
        component: ${f.name},
        ...(${f.name}.__routeOptions || {}),
      }
      `,
  )

  return { imports, routes }
}

module.exports = function () {
  const { imports, routes } = parsePagesDirectory()

  const moduleContent = `
    ${imports.join('\n')}
    export const routes = [${routes.join(', \n')}]
  `

  const configureServer = [
    async ({ app }) => {
      app.use(async (ctx, next) => {
        if (ctx.path.startsWith('/@modules/vue-auto-routes')) {
          ctx.type = 'js'
          ctx.body = moduleContent
        } else {
          await next()
        }
      })
    },
  ]

  const rollupInputOptions = {
    plugins: [virtual({ 'vue-auto-routes': moduleContent })],
  }

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
