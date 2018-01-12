import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const HelloWorld = () => import('../components/HelloWorld')
const TeamForm = () => import('../components/teams/TeamForm')
const TeamList = () => import('../components/teams/TeamList')
const CategoryList = () => import('../components/categories/CategoryList')
const CategoryPropositionsList = () => import('../components/categories/CategoryPropositionsList')
const PropositionDisplay = () => import('../components/propositions/PropositionDisplay')
const PropositionResults = () => import('../components/propositions/PropositionResults')
const PropositionList = () => import('../components/propositions/PropositionList')
const PropositionUpdate = () => import('../components/propositions/PropositionUpdate')
const TeamMembersList = () => import('../components/teams/TeamUsersList')

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
      path: '/teams/:slug/users',
      name: 'team-members-list',
      component: TeamMembersList
    },
    {
      path: '/teams/:slug/categories',
      name: 'category-list',
      component: CategoryList
    },
    {
      path: '/teams/:slug/categories/propositions',
      name: 'category-proposition-list',
      component: CategoryPropositionsList
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
      path: '/teams/:slug/propositions/:idProposition/results',
      name: 'display-results',
      component: PropositionResults
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
