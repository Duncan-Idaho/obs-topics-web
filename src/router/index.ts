import { createRouter, createWebHistory } from 'vue-router'

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
      component: () => import('../DualLayout.vue'),
      children: [
        {
          path: '/',
          name: 'topics',
          component: () => import('../views/TopicsView.vue')
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
        {
          path: '/assignments',
          name: 'assignments',
          component: () => import('../views/AssignmentView.vue')
        },
        {
          path: '/settings',
          name: 'settings',
          component: () => import('../views/SettingsView.vue')
        },
      ]
    }
  ]
})

export default router
