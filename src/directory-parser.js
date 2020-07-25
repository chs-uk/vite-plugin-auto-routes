const fs = require('fs')
const path = require('path')

function parsePagesDirectory(
  dir,
  { prependName, prependPath } = { prependName: '', prependPath: '/' },
) {
  let routes = []

  const siblings = fs.readdirSync(dir, { withFileTypes: true })

  const files = siblings
    .filter((f) => f.isFile() && f.name.endsWith('.vue') && !f.name.startsWith('-'))
    .map((f) => f.name)

  const directories = siblings.filter((f) => f.isDirectory()).map((d) => d.name)

  for (const name of files) {
    const f = { name: name.split('.')[0], importPath: path.join(dir, name) }

    const routeOptions = []
    // Route name
    if (!directories.includes(f.name) || !fs.existsSync(path.join(dir, f.name, 'index.vue'))) {
      const routeName =
        f.name === 'index' && prependName
          ? prependName.slice(0, -1)
          : prependName + f.name.replace(/^_/, '')
      routeOptions.push(`name: '${routeName}'`)
    }
    // Route path
    routeOptions.push(
      `path: '${prependPath}${f.name === 'index' ? '' : f.name.replace(/^_/, ':')}'`,
    )
    // Route component
    routeOptions.push(`component: () => import('/${f.importPath}')`)
    // Route children
    if (directories.includes(f.name)) {
      children = parsePagesDirectory(path.join(dir, f.name), {
        prependName: `${prependName}${f.name.replace(/^_/, '')}-`,
        prependPath: '',
      }).routes
      routeOptions.push(`children: [ ${children.join(', ')} ]`)
    }
    routes.push(`{ ${routeOptions.join(', ')} }`)
  }

  // If a directory exists with the same name as a sibling file, it means the folder acts as
  // children routes. Those children are dealt with above, so we filter them out here.
  const filesWithoutExtension = files.map((f) => f.slice(0, -4))
  const remainingDirectories = directories.filter((d) => !filesWithoutExtension.includes(d))
  for (const name of remainingDirectories) {
    const parsedDir = parsePagesDirectory(path.join(dir, name), {
      prependName: `${prependName}${name.replace(/^_/, '')}-`,
      prependPath: `${prependPath}${name.replace(/^_/, ':')}/`,
    })
    routes = routes.concat(parsedDir.routes)
  }

  return { routes }
}

module.exports = {
  parsePagesDirectory,
}
