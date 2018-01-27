<template>
  <div>
    <!-- Application menu -->
    <nav class="navbar navbar-expand-sm fixed-top navbar-dark bg-dark" v-if="hasUserInfos">
      <router-link :to="{name: 'home'}">
        <img src="../assets/likvaLogoMiniTransparentNavbar.png" class="navbar-brand" id="brandPicture">
      </router-link>
      <!--Changer avec un router-link-->
      <a class="navbar-brand" href="#"><img src="../assets/profile.png"/> {{userFullName}}</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse"
              data-target="#navbarNav" aria-controls="navbarNavDropdown" aria-expanded="false"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <!--Changer avec un router-link-->
            <router-link :to="{name: 'profile-display', query: {id: userInfos.id}}">
              <a class="nav-link" href="#">Profile</a>
            </router-link>
          </li>
          <li class="nav-item dropdown">
            <!--Changer avec un router-link-->
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"
               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Equipes
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <router-link :to="{name: 'team-list'}" class="dropdown-item">Toutes les équipes</router-link>
              <div class="dropdown-divider"></div>
              <router-link :to="{name: 'create-team'}" class="dropdown-item">Créer une équipe</router-link>
            </div>
          </li>
          <li class="nav-item">
            <!--Changer avec un router-link-->
            <a class="nav-link" href="#" v-if="adminActualTeam">Admin</a>
          </li>
        </ul>
        <div class="d-flex flex-row justify-content-between">
          <ul class="navbar-nav">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownTeamSwitch"
                 data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                Mes équipes
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownTeamSwitch">
                <a class="dropdown-item" href="#" v-for="team in userInfos.teams" v-if="userTeamsCount > 0"
                   @click="updateActualTeam(team)">
                  <router-link :to="{name: 'proposition-list', params: { slug: team.slug }}" class="dropdown-item">
                    {{team.displayName}}
                  </router-link>
                </a>
              </div>
            </li>
          </ul>
          <router-link :to="{name: 'home'}" class="nav-item">
            <button type="button" class="btn btn-outline-danger nav-button" @click="logout">Déconnexion</button></router-link>
        </div>
      </div>
    </nav>
    <nav class="navbar navbar-expand-sm navbar-dark fixed-top bg-dark " v-else>
      <router-link :to="{name: 'home'}">
        <img src="../assets/likvaLogoMiniTransparentNavbar.png" class="navbar-brand" id="brandPicture">
      </router-link>
      <button type="button" class="btn btn-outline-info nav-button" data-toggle="modal" data-target="#loginModal">
        Connexion
      </button>
      <button type="button" class="btn btn-outline-info nav-button " data-toggle="modal" data-target="#signinModal">
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

  export default {
    name: 'header-bar',
    store: userStore,
    components: {Login, Register},
    data () {
      return {
        loaded: this.hasUserInfos
      }
    },
    methods: {
      ...Vuex.mapActions([
        'razUserStore',
        'updateActualTeam'
      ]),
      logout () {
        this.razUserStore()
        this.loaded = this.hasUserInfos
        return this.loaded
      }
    },
    computed: {
      ...Vuex.mapGetters([
        'userInfos',
        'messages',
        'actualTeamStore',
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
