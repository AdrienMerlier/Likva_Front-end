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
  actualTeam: {},
  delegation: {
    hasDelegate: false,
    delegate: ''
  },
  delegateList: []
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
  tokenSession: state => state.token,
  delegateList: state => state.delegateList,
  delegation: state => state.delegation
}

const mutations = {
  CHANGE_PARAM: (state, param, value) => {
    state.user.param = value
  },
  INSERT_USER: (state, user) => {
    state.user = user
  },
  RAZ_STATE: (state) => {
    state = {
      user: {
        name: '',
        surname: '',
        email: '',
        teams: [],
        loaded: false
      },
    messages: [],
      actualTeam: {},
    delegation: {
      hasDelegate: false,
        delegate: ''
    },
    delegateList: []
  }
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
  },
  INSERT_DELEGATES: (state, list) => {
    state.delegateList = list
  },
  UPDATE_DELEGATION: (state, user) => {
    state.delegation.hasDelegate = true
    state.delegation.delegate = user
  },
  REMOVE_DELEGATION: (state) => {
    state.delegation = {
      hasDelegate: false,
      delegate: {}
    }
  }
}

const actions = {
  insertUserStore: (store, user, token) => {
    store.commit('INSERT_USER', user)
    user.loaded = true
    store.commit('ADD_TOKEN', token)
  },
  razUserStore: (store) => {
    store.commit('RAZ_STATE')
  },
  addMessageUserStore: (store, message) => {
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
    store.commit('CHANGE_ACTUAL_TEAM', team)
  },
  insertDelegates: (store, list) => {
    store.commit('INSERT_DELEGATES', list)
  },
  updateDelegation: (store, user) => {
    store.commit('UPDATE_DELEGATION', user)
  },
  removeDelegation: (store) => {
    store.commit('REMOVE_DELEGATION')
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
