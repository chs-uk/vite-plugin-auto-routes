const fs = require('fs')
const path = require('path')
const virtual = require('@rollup/plugin-virtual')

module.exports = function () {
  const files = fs.readdirSync('./src/pages')
  const routes = files
    .map((f) => `{ path: '/${f.split('.')[0]}', component: () => import('/src/pages/${f}') }`)
    .join(', \n')

  const moduleContent = `
    export const routes = [
      ${routes}
    ]
  `
  console.log(moduleContent)

  const moduleName = 'vue-auto-routes'

  const configureServer = [
    async ({ app }) => {
      app.use(async (ctx, next) => {
        if (ctx.path.endsWith('@modules/' + moduleName)) {
          ctx.type = 'js'
          ctx.body = moduleContent
        } else {
          await next()
        }
      })
    },
  ]

  const rollupInputOptions = {
    plugins: [virtual({ [moduleName]: moduleContent })],
  }

  return { configureServer, rollupInputOptions }
}
