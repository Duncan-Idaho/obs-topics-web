import { createRouter, createWebHistory } from 'vue-router'
import TopicsView from '../views/TopicsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'topics',
      component: TopicsView
    },
    {
      path: '/import',
      name: 'import',
      component: () => import('../views/ImportView.vue')
    },
    {
      path: '/columns',
      name: 'columns',
      component: () => import('../views/ColumnsView.vue')
    },
  ]
})

export default router
