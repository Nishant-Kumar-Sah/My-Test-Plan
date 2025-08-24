import { createRouter, createWebHistory } from 'vue-router'
import AllTestPlans from '../views/AllTestPlans.vue'
import TestPlanDetail from '../views/TestPlanDetail.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import EditProfile from '../views/EditProfile.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/edit-profile', component: EditProfile },
  { path: '/test-plans', component: AllTestPlans },
  { path: '/test-plan/:id', component: TestPlanDetail },
  // Add a catch-all route for any unmatched paths
  { path: '/:pathMatch(.*)*', redirect: '/login' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
