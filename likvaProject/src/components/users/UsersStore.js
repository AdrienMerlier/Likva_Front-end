import Vuex from 'vuex'

const state = {
  user: {
    name: 'Léo',
    surname: 'Mouyna',
    email: '',
    teams: [],
    loaded: false
  },
  messages: [{ }],
  actualTeam: ''
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
  adminActualTeam: state => state.user.teams.filter(team => team.name === state.actualTeam).admin
}

const mutations = {
  CHANGE_PARAM: (state, param, value) => {
    state.user.param = value
  },
  INSERT_USER: (state, user) => {
    state.user = user
  },
  ADD_TEAM: (state, team) => {
    state.user.teams.push(team)
  },
  ADD_MESSAGE: (state, content, type, concern) => {
    state.messages.push({
      content: content,
      type: type,
      concern: concern
    })
  },
  REMOVE_MESSAGE: (state, message) => {
    state.messages = state.messages.filter(msg => msg !== message)
  },
  CHANGE_ACTUAL_TEAM: (state, teamName) => {
    state.actualTeam = teamName
  }
}

const actions = {
  insertUserStore: (store, user) => {
    user.loaded = true
    store.commit('INSERT_USER', user)
  },
  updateUserStore: (store, param, value) => {
    let message = {
      content: '',
      type: '',
      concern: 'user collection'
    }
    if (param in ['name', 'surname', 'email']) {
      message.content = 'Votre profil a été mis à jour'
      message.type = 'success'
      store.commit('CHANGE_PARAM', param, value).then(_ => store.commit('ADD_MESSAGE', message))
    } else {
      message.content = 'Erreur, lors de la mise à jour de votre profil'
      message.type = 'error'
      store.commit('ADD_MESSAGE', message)
    }
  },
  addTeamUserStrore: (store, team) => {
    let message = {
      content: '',
      type: '',
      concern: 'user collection'
    }
    message.content = 'Votre profil a été mis à jour'
    message.type = 'success'
    store.commit('ADD_TEAM', team).then(_ => store.commit('ADD_MESSAGE', message))
  },
  removeMessageUserStore: (store, msg) => {
    store.commit('')
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
