import { createRouter, createWebHistory } from 'vue-router'

import Requests from '@/components/views/requests/Requests.vue'
import TeachersList from '@/components/views/teachers/TeachersList.vue'
import Register from '@/components/views/Register.vue'
import NotFound from '@/components/views/NotFound.vue'
import ContactTeacher from '@/components/views/teachers/ContactTeacher.vue'
import TeacherDetails from '@/components/views/teachers/TeacherDetails.vue'
import UserAuth from '@/components/views/auth/UserAuth.vue'
import store from '../store/index.js'


const routes = [
  {
    path: '/',
    redirect: '/teachers'
  },
  {
    path: '/teachers',
    name: 'teachers',
    component: TeachersList,
  },
  {
    name: 'teacher-details', 
    path: '/details/:teacherId', 
    component: TeacherDetails, 
    props: true
  },
  {
    name: 'contact-teacher', 
    path: '/contact/:teacherId', 
    component: ContactTeacher, 
    props: true
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: { requiresAuth: true }
  },
  {
    path: '/requests',
    name: 'requests',
    component: Requests,
    meta: { requiresAuth: true }
  },
  {
    path: '/auth',
    name: 'auth',
    component: UserAuth,
    meta: { requiresUnauth: true }
  },
 {
  path: '/:notFound(.*)', component: NotFound
 } 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(function (to, _, next) {
  if(to.meta.requiresAuth && !store.getters.isAuthenticated){
    next('/auth')
  } else if(to.meta.requiresUnauth && store.getters.isAuthenticated){
    next('/teachers')
  } else{
    next()
  }
})

export default router
