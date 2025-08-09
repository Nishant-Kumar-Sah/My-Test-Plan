import { createRouter, createWebHistory } from 'vue-router'
import AllTestPlans from '../views/AllTestPlans.vue'
import TestPlanDetail from '../views/TestPlanDetail.vue'

const routes = [
  { path: '/', redirect: '/test-plans' },
  { path: '/test-plans', component: AllTestPlans },
  { path: '/test-plan/:id', component: TestPlanDetail },
  // Add a catch-all route for any unmatched paths
  { path: '/:pathMatch(.*)*', redirect: '/test-plans' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
