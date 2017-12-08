import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const HelloWorld = () => import('../components/HelloWorld')
const Login = () => import('../components/users/Login')

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
