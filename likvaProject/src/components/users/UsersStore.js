import Vuex from 'vuex'

const state = {
  user: {
    name: '',
    surname: '',
    email: '',
    teams: [],
    loaded: false
  },
  messages: [],
  actualTeam: {}
}

const getters = {
  userInfos: state => state.user,
  hasUserInfos: state => state.user.loaded,
  messages: state => state.messages,
  actualTeam: state => state.actualTeam,
  userTeamsCount: state => state.user.teams.length,
  userName: state => state.user.name,
  userSurname: sate => state.user.surname,
  userFullName: state => getters.userName(state) + ' ' + getters.userSurname(state),
  adminActualTeam: state => state.user.teams.filter(team => team.slug === state.actualTeam.slug).admin,
  adminTeams: state => state.user.teams.filter(team => team.admin),
  tokenSession: state => state.token
}

const mutations = {
  CHANGE_PARAM: (state, param, value) => {
    state.user.param = value
  },
  INSERT_USER: (state, user) => {
    state.user = user
  },
  ADD_TOKEN: (state, token) => {
    state.token = token
  },
  ADD_TEAM: (state, team) => {
    state.user.teams.push(team)
  },
  ADD_MESSAGE: (state, message) => {
    state.messages.push({
      content: message.content,
      type: message.type,
      concern: message.concern
    })
  },
  REMOVE_MESSAGE: (state, message) => {
    state.messages = state.messages.filter(msg => msg !== message)
  },
  CHANGE_ACTUAL_TEAM: (state, team) => {
    state.actualTeam.displayName = team.displayName
    state.actualTeam.slug = team.slug
  }
}

const actions = {
  insertUserStore: (store, user, token) => {
    store.commit('INSERT_USER', user)
    user.loaded = true
    store.commit('ADD_TOKEN', token)
  },
  addMessageUserStore: (store, message) => {
    console.log('I should print a message')
    store.commit('ADD_MESSAGE', message)
  },
  updateUserStore: (store, param, value) => {
    let message = {
      content: '',
      type: '',
      concern: 'user collection'
    }
    message.content = 'Votre profil a été mis à jour'
    message.type = 'success'
    store.commit('CHANGE_PARAM', param, value).then(_ => actions.addMessageUserStore(store, message), _ => {
      message.content = 'Erreur, lors de la mise à jour de votre profil'
      message.type = 'error'
      actions.addMessageUserStore(store, message)
    })
  },
  addTeamUserStore: (store, team) => {
    let message = {
      content: '',
      type: '',
      concern: 'Création équipe'
    }
    message.content = 'Vos équipes ont été mis à jour'
    message.type = 'alert-success'
    store.commit('ADD_TEAM', team).then(_ => actions.addMessageUserStore(store, message), _ => {
      message.content = 'Une erreur lors de la mise à jour de vos équipes est survenue'
      message.type = 'alert-danger'
      actions.addMessageUserStore(store, message)
    })
  },
  removeMessageUserStore: (store, msg) => {
    store.commit('REMOVE_MESSAGE', msg)
  },
  updateActualTeam: (store, team) => {
    console.log('L\'équipe a enregistrée est: ' + team)
    console.log('I should update the actual team with displayName: ' + team.displayName)
    console.log('Le slug est: ' + team.slug)
    store.commit('CHANGE_ACTUAL_TEAM', team)
  }
}

let store = new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
  strict: true
})

export default store
