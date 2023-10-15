import { createRouter, createWebHistory } from 'vue-router'
import TopicsView from '../views/TopicsView.vue'
import StandardLayout from '../StandardLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/labels/:formatType/:id',
      name: 'label',
      component: () => import('../views/LabelView.vue'),
      props: true
    },
    {
      path: '/start',
      name: 'start',
      component: () => import('../views/StartTimeView.vue'),
      props: true
    },
    {
      path: '/',
      name: 'main',
      component: StandardLayout,
      children: [
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
    }
  ]
})

export default router
