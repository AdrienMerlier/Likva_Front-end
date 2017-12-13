import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const HelloWorld = () => import('../components/HelloWorld')
const TeamForm = () => import('../components/teams/TeamForm')
const TeamList = () => import('../components/teams/TeamList')
const PropositionDisplay = () => import('../components/propositions/PropositionDisplay')
const PropositionList = () => import('../components/propositions/PropositionList')

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
      component: TeamList
    },
    {
      path: '/teams/create',
      name: 'create-team',
      component: TeamForm
    },
    {
      path: '/teams/:slug/propositions',
      name: 'proposition-list',
      component: PropositionList
    },
    {
      path: '/teams/:slug/propositions/:idProposition',
      name: 'display-proposition',
      component: PropositionDisplay
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
