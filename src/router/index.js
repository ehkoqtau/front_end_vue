import Vue from 'vue'
import Router from 'vue-router'
import MemberArea from '@/components/MemberArea'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import Register from '@/components/Register'
import NotFound from '@/components/404.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      alias: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/members',
      name: 'Member',
      component: MemberArea
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})
