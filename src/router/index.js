import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
const router = createRouter({
  history: createWebHistory('chatfire'),
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/chat',
      children: [
        {
          path: 'chat',
          name: 'chat',
          meta: {
            title: '知盒 GPT'
          },
          component: () => import('@/views/chat/index.vue')
        },
      ]
    },

  ]
})

export default router
