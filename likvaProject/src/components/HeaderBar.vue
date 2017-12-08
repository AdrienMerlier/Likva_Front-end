<template>
  <div class="header-bar">
    <header class="fixed-top" id="top-page">
      <!-- Application menu -->
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark" v-if="hasUserInfos">
        <img src="../assets/likvaLogoMiniTransparentNavbar.png" id="brandPicture">
        <!--Changer avec un router-link-->
        <a class="navbar-brand" href="#"><img src="../assets/anonymousProfile.png"/> {{userFullName}}</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse"
                data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div id="navbarNavDropdown" class="navbar-collapse collapse">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <!--Changer avec un router-link-->
              <!--<a class="nav-link" href="category.html">Home <span class="sr-only">(current)</span></a>-->
            </li>
            <li class="nav-item">
              <!--Changer avec un router-link-->
              <!--<a class="nav-link" href="my_votes.html">Results</a>-->
            </li>
            <li class="nav-item">
              <!--Changer avec un router-link-->
              <a class="nav-link" href="#">Profile</a>
            </li>
            <li class="nav-item">
              <!--Changer avec un router-link-->
              <a class="nav-link" href="#" v-if="adminActualTeam">Admin</a>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item dropdown">
              <!--Changer avec un router-link-->
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                 data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-if="actualGroup">
                {{actualGroup}}
              </a>
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                 data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-else>
                Teams
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" v-if="userGroupsCount > 0">
                <!--Changer avec un router-link-->
                <a class="dropdown-item" href="#" v-for="group in userInfos.groups">{{group.name}}</a>
              </div>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Logout</a>
            </li>
          </ul>
        </div>
      </nav>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark" v-else>
        <router-link :to="{name: 'login'}">
          <button class="btn btn-outline-info">Login</button>
        </router-link>
        <router-link :to="{name: 'home'}">
          <img src="../assets/likvaLogoMiniTransparentNavbar.png" id="brandPicture">
        </router-link>
      </nav>
    </header>
  </div>
</template>

<script>
  import Vuex from 'vuex'
  import userStore from './users/UsersStore'

  global.s = userStore

  export default {
    name: 'header-bar',
    store: userStore,
    data () {
      return {
        brandImageStyle: {}
      }
    },
    computed: {
      ...Vuex.mapGetters([
        'userInfos',
        'messages',
        'actualGroup',
        'userFullName',
        'userGroupsCount',
        'adminActualTeam',
        'hasUserInfos'
      ])
    },
    mounted () {
      console.log(this.adminActualTeam)
    }
  }
</script>

<style scoped>
  #brandPicture{
    margin: 12px;
  }
</style>
