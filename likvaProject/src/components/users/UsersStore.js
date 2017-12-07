import Vuex from 'vuex'

const state = {
  user: {
    name: '',
    surname: '',
    email: '',
    groups: [{ }]
  },
  messages: [{ }]
}


const getters = {
  userName: state => state.user.name,
  userSurname: state => state.user.surname,
  userFullName: sate => getters.userName + ' ' + getters.userSurname,
  userGroups: state => state.user.groups,
  userEmail: state => state.user.email
}


const mutations = {
  CHANGE_PARAM: (state, param, value) => {
    state.user.param = value
  },
  ADD_GROUP: (state, group) => {
    state.user.groups.push(group)
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
  }
}

const actions = {
  updateUserStore: (store, param, value) => {
    let message = {
      content: '',
      type: '',
      concern: 'user collection'
    }
    if (param in ['name', 'surname', 'email']) {
      message.content ='Votre profil a été mis à jour'
      message.type = 'success'
      store.commit('CHANGE_PARAM', param, value).then(_ => store.commit('ADD_MESSAGE', message))
    }
    else {
      message.content = 'Erreur, lors de la mise à jour de votre profil'
      message.type = 'error'
      store.commit('ADD_MESSAGE', message)
    }
  },
  addGroupUserStrore: (store, group) => {
    let message = {
      content: '',
      type: '',
      concern: 'user collection'
    }
      message.content ='Votre profil a été mis à jour'
      message.type = 'success'
      store.commit('ADD_GROUP', group).then(_ => store.commit('ADD_MESSAGE', message))
  },
  removeMessageUserStore: (store, msg) => {
    store.commit('')
  }
}

export default new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
  strict: true
})
