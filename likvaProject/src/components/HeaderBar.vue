<template>
  <div>
    <!-- Application menu -->
    <nav class="navbar navbar-expand-sm fixed-top navbar-dark bg-dark" v-if="hasUserInfos">
      <router-link :to="{name: 'home'}">
        <img src="../assets/likvaLogoMiniTransparentNavbar.png" class="navbar-brand" id="brandPicture">
      </router-link>
      <!--Changer avec un router-link-->
      <a class="navbar-brand" href="#"><img src="../assets/anonymousProfile.png"/> {{userFullName}}</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse"
              data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="navbarNavDropdown" class="navbar-collapse collapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <!--Changer avec un router-link-->
            <a class="nav-link" href="#">Profile</a>
          </li>
          <li class="nav-item dropdown">
            <!--Changer avec un router-link-->
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"
               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Equipes
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a href="#" class="dropdown-item">Toutes les équipes</a>
              <div class="dropdown-divider"></div>
              <router-link :to="{name: 'create-team'}" class="dropdown-item">Créer un équipe</router-link>
            </div>
          </li>
          <li class="nav-item">
            <!--Changer avec un router-link-->
            <a class="nav-link" href="#" v-if="adminActualTeam">Admin</a>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link dropdown-toggle" href="#"
               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-if="actualTeam">
              {{actualTeam.displayName}}
            </a>
            <a class="dropdown-item" href="#" v-for="team in userInfos.teams" v-if="userTeamsCount > 0">{{team.displayName}}</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
    <nav class="navbar navbar-expand-sm navbar-dark fixed-top bg-dark" v-else>
      <router-link :to="{name: 'home'}">
        <img src="../assets/likvaLogoMiniTransparentNavbar.png" class="navbar-brand" id="brandPicture">
      </router-link>
      <button type="button" class="btn btn-outline-info nav-button" data-toggle="modal" data-target="#loginModal">
        Connexion
      </button>
      <button type="button" class="btn btn-outline-info nav-button" data-toggle="modal" data-target="#signinModal">
        Inscription
      </button>
    </nav>
    <login></login>
    <register></register>
  </div>
</template>

<script>
  import Vuex from 'vuex'
  import userStore from './users/UsersStore'
  import Login from './users/Login'
  import Register from './users/Register'

  global.s = userStore

  export default {
    name: 'header-bar',
    store: userStore,
    components: {Login, Register},
    data () {
      return {
        brandImageStyle: {}
      }
    },
    computed: {
      ...Vuex.mapGetters([
        'userInfos',
        'messages',
        'actualTeam',
        'userFullName',
        'userTeamsCount',
        'adminActualTeam',
        'hasUserInfos'
      ])
    }
  }
</script>

<style scoped>
.nav-button{
  margin-left: 12px;
  margin-right: 12px;
}
  #brandPicture {
    width: 43px;
    height: 65px;
  }
</style>
