import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const HelloWorld = () => import('../components/HelloWorld')
const TeamForm = () => import('../components/teams/TeamForm')
const TeamList = () => import('../components/teams/TeamList')

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HelloWorld
    },
    {
      path: '/teams',
      name: 'team-list',
      component: TeamList,
      children: [
        {
          path: 'create',
          name: 'create-team',
          component: TeamForm
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
