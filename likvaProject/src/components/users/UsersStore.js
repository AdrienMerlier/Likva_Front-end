import Vuex from 'vuex'

const userState = {
  name: '',
  surname: '',
  email: '',
  groups: [{ }]
}


const getters = {
  userName: userState => userState.name
}
