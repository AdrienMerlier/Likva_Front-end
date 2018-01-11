<template>
    <div class="profile">
      <div class="row">
        <div class="col-sm-4">
          <img src="../../assets/anonymousProfileLarge.png" alt="Image de Profile" class="rounded-circle"/>
          <h1>{{userFullName}}</h1>
          <i class="fa fa-envelope"></i><a :href="'mailto:' + userInfos.email"> {{userInfos.email}}</a>
        </div>
        <div class="col-sm-5 description">
          <h2>Biographie</h2>
          <textarea class="form-control" rows="5" id="description" v-model="user.biographie" v-if="isOwnProfile()">

          </textarea>
          <p v-else>{{user.biographie}}</p>
        </div>
        <div class="col-sm-3 equipe">
          <h2>Equipes</h2>
          <h4>
            <span class="badge badge-primary">Nom 1</span>
          </h4>
        </div>
      </div>
    </div>
</template>

<script>
  import Vuex from 'vuex'
  import userStore from './UsersStore'
  export default {
    name: 'profile',
    store: userStore,
    data () {
      return {
        user: {}
      }
    },
    methods: {
      ...Vuex.mapActions([
        'updateUserBiography'
      ]),
      isOwnProfile () {
        return true
      }
    },
    computed: {
      ...Vuex.mapGetters([
        'userFullName',
        'userInfos'
      ])
    }
  }
</script>

<style scoped>
  img{
    width: 200px;
    height: 200px;
  }
  .description p{
    text-align: justify;
  }
</style>
