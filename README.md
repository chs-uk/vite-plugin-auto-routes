# vite-plugin-auto-routes

A vite plugin for automatic routing in Vue 3 based on your file structure.

# Why?

You want automatic routing from a file structure, as you'd get in [Nuxt](https://nuxtjs.org/guide/routing/). Specifically, you want to turn this file tree:

```
pages/
--| user/
-----| index.vue
-----| one.vue
--| index.vue
```

into this:

```js
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue',
    },
    {
      name: 'user',
      path: '/user',
      component: 'pages/user/index.vue',
    },
    {
      name: 'user-one',
      path: '/user/one',
      component: 'pages/user/one.vue',
    },
  ]
}
```

Paramaters and child components are supported in the same way as Nuxt. See the [example](example/) for a more complete example pages directory.

There already exists a Vue 2 + [vue-cli plugin](https://github.com/ktsn/vue-cli-plugin-auto-routing) for this, but not for Vue 3 + vite.

# Usage

## Installation

With npm:

```
npm i --save-dev vite-plugin-auto-routes
```

With yarn:

```
yarn add -D vite-plugin-auto-routes
```

Then in your `vite.config.js` file add:

```js
const viteAutoRoute = require('vite-plugin-auto-routes')

module.exports = {
  plugins: [viteAutoRoute({ pagesDir: 'src/pages' })],
}
```

Routes will now be available by importing `vue-auto-routes` in your app. You can then set up your router as you normally would, for example (using vue-router-next for Vue 3):

```js
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from 'vue-auto-routes'
import App from './App.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
createApp(App).use(router).mount('#app')
```

# Limitations

## Hot module reloading

If you create new pages that will generate new routes, they currently will not be available until you refresh the page. Editing existing pages will hot reload as normal.

# To do

- [x] Support single flat directory
- [x] Support child components through nested directories
- [x] Support route parameters
- [x] Custom pages directory
- [ ] Custom route block

# Inspirations

- [Nuxt routing](https://nuxtjs.org/guide/routing/)
- [vue-cli-plugin-auto-routing](https://github.com/ktsn/vue-cli-plugin-auto-routing)
