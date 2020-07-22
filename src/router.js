import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { routes } from 'vue-auto-routes'

const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes,
})

export default router
