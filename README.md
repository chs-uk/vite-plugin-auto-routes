# vite-plugin-auto-routes

A vite plugin for automatic routing in Vue 3.

# Why?

You want automatic routing from a directory structure, as you'd get in [Nuxt](https://nuxtjs.org/guide/routing/). Specifically, you want to turn this file tree:

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

There already exists a Vue 2 + [vue-cli plugin](https://github.com/ktsn/vue-cli-plugin-auto-routing) for this, but not for Vue 3 + vite.

# Usage

## Installation

Npm install coming soon. If you want to use/expand on this right now, copy [plugin.js](plugin.js) and then use it as follows:

In your `vite.config.js` file add:

```js
const viteAutoRoute = require('./plugin.js') // or wherever you've put this plugin

module.exports = {
  plugins: [viteAutoRoute()],
}
```

Routes will now be available by importing `vue-auto-routes`. You can then set up your router as you normally would, for example (using vue-router-next for Vue 3):

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

# Features

## Custom route blocks

You can provide additional route config in a custom route block on any page, for example:

```vue
<route>
{
  "meta": {
    "requiresLogin": true,
  }
}
</route>
```

# Inspirations

- [Nuxt routing](https://nuxtjs.org/guide/routing/)
- [vue-cli-plugin-auto-routing](https://github.com/ktsn/vue-cli-plugin-auto-routing)

# To do

- [x] Generate routes for a single pages folder `/src/pages` containing only `.vue` files
- [x] Custom route block
- [ ] Custom pages directory
- [ ] Support child components through nested directories
- [ ] Support route parameters
- [ ] Publish to npm
- [ ] Hot module reloading
