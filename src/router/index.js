import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import SignIn from '@/components/auth/Sign_in'
import SignUp from '@/components/auth/Sign_up'
import Add from '@/components/Add'
import Faq from '@/components/Faq'
import LinkGuard from './links-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/welcomePage',
      name: 'about',
      component: Faq
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: LinkGuard
    },
    {
      path: '/sign_in',
      name: 'sign_in',
      component: SignIn
    },
    {
      path: '/add_new',
      name: 'add_new',
      component: Add,
      beforeEnter: LinkGuard
    },
    {
      path: '/sign_up',
      name: 'sign_up',
      component: SignUp
    }
  ],
  mode: 'history'
})
