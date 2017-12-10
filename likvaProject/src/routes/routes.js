import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const HelloWorld = () => import('../components/HelloWorld')
const TeamForm = () => import('../components/TeamForm')

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HelloWorld
    },
    {
      path: '/teams/create',
      name: 'create-team',
      component: TeamForm
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
