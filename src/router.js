import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from 'vue-auto-routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
