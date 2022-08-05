import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/operator-performance',
    name: 'operator-performance',
    component: () => import('../views/operatorPerformance/index.vue')
  },
  {
    path: '/operator-performance-report',
    name: 'operator-performance-report',
    component: () => import('../views/operatorPerformanceReport/index.vue')
  },
  {
    path: '/talk-time-report',
    name: 'talk-time-report',
    component: () => import('../views/talkTimeReport/index.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
