import Vuex from 'vuex'

const state = {
  user: {
    name: 'Léo',
    surname: 'Mouyna',
    email: '',
    groups: []
  },
  messages: [{ }],
  actualGroup: ''
}

const getters = {
  userInfos: state => state.user,
  messages: state => state.messages,
  actualGroup: state => state.actualGroup,
  userGroupsCount: state => state.user.groups.length,
  userName: state => state.user.name,
  userSurname: sate => state.user.surname,
  userFullName: state => getters.userName(state) + ' ' + getters.userSurname(state)
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
  },
  CHANGE_ACTUAL_GROUP: (state, groupName) => {
    state.actualGroup = groupName
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
      message.content = 'Votre profil a été mis à jour'
      message.type = 'success'
      store.commit('CHANGE_PARAM', param, value).then(_ => store.commit('ADD_MESSAGE', message))
    } else {
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
    message.content = 'Votre profil a été mis à jour'
    message.type = 'success'
    store.commit('ADD_GROUP', group).then(_ => store.commit('ADD_MESSAGE', message))
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
