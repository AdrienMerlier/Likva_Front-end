import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const HelloWorld = () => import('../components/HelloWorld')
const TeamForm = () => import('../components/teams/TeamForm')
const TeamList = () => import('../components/teams/TeamList')
const PropositionDisplay = () => import('../components/propositions/PropositionDisplay')
const PropositionList = () => import('../components/propositions/PropositionList')
const PropositionUpdate = () => import('../components/propositions/PropositionUpdate')

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
      path: '/teams/:slug/update',
      name: 'edit-team',
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
      path: '/teams/:slug/propositions/:idProposition/update',
      name: 'edit-proposition',
      component: PropositionUpdate
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
