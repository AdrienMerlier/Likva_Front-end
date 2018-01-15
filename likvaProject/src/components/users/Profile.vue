<template>
    <div class="profile">
      <div class="row">
        <div class="col-sm-9">
          <div class="row">
            <div class="col-sm-5">
              <img src="../../assets/anonymousProfileLarge.png" alt="Image de Profile" class="rounded-circle"/>
              <h1>{{userFullName}}</h1>
              <i class="fa fa-envelope"></i><a :href="'mailto:' + userInfos.email"> {{userInfos.email}}</a>
            </div>
            <div class="col-sm-7 description">
              <h2>Biographie</h2>
              <textarea class="form-control" rows="5" id="description" v-model="user.biography" v-if="owner">
              </textarea>
              <p v-else>{{user.biography}}</p>
            </div>
          </div>
          <div class="row">
            <div class="tabInfos">
              <user-propositions-tab v-if="owner"></user-propositions-tab>
            </div>
          </div>
        </div>
        <div class="col-sm-3 equipe">
          <h3>Eligible à la délégation</h3>
          <team-tree :teams="owner ? user.teams : selectedTeams" :owner="isOwnProfile()"></team-tree>
        </div>
      </div>

      </div>
</template>

<script>
  import Vuex from 'vuex'
  import userStore from './UsersStore'
  import TeamTree from '../teams/TeamTree'
  import UserPropositionsTab from '../propositions/UserPropositionsTab'

  export default {
    name: 'profile',
    store: userStore,
    components: {
      TeamTree,
      UserPropositionsTab
    },
    data () {
      return {
        user: {},
        owner: false,
        selectedTeams: []
      }
    },
    methods: {
      ...Vuex.mapActions([
        'updateUserBiography'
      ]),
      intersection (a, b) {
        var ai = 0
        var bi = 0
        var result = []
        while (ai < a.length && bi < b.length) {
          if (a[ai] < b[bi]) {
            ai++
          } else if (a[ai] > b[bi]) {
            bi++
          } else { // They are equal
            result.push(a[ai])
            ai++
            bi++
          }
        }
        return result
      }
    },
    computed: {
      ...Vuex.mapGetters([
        'userFullName',
        'userInfos'
      ])
    },
    beforeMount () {
      this.userResource = this.$resource('http://127.0.0.1:3000/api/users{/_id}')
      let _id = this.$router.history.current.query.id
      this.userResource.get({_id: _id}).then(response => {
        // If serveur answer
        if (response.body.success) {
          // Good request
          this.user = response.body.user
          this.owner = this.userInfos._id === this.user._id
          if (!this.isOwnProfile()) {
            // Have to select only teams in common
            this.selectedTeams = this.intersection(this.user.teams, this.userInfos.teams)
          }
        } else {
          // Bad request
          // Add a message display
          console.error(response.body.message)
        }
      }, _ => {
        // Server doesn't answer
        console.error('Something went wrong with the server when asking user infos')
      })
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
  .tabInfos{
    margin-top: 1em;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
  }
</style>
