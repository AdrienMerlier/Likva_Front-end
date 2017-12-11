<template>
    <div class="teamList">
      <div class="card-columns">
        <div class="card" v-for="team in allTeams">
          <h4 class="card-header">{{team.displayName}}</h4>
          <section class="card-body">
            <aside class="memberInfos" v-if="isMember(team)">
              <h5 class="card-title" v-if="isAdmin(team)"><span class="badge badge-danger">Admin</span></h5>
              <h5 class="card-title" v-if="isProposer(team)"><span class="badge badge-primary">Proposer</span></h5>
              <h5 class="card-title"><span class="badge badge-secondary">{{getRole(team)}}</span></h5>
            </aside>
            <article>
              <p class="card-text">Un jour une description sera là !</p>
            </article>
          </section>
          <div class="card-footer" v-if="isMember(team)">
            Déjà dans l'équipe <i class="fa fa-toggle-on"></i>
          </div>
          <div class="card-footer" v-else>
            Rejoindre <i class="fa fa-toggle-off" @click.prevent="joinTeam"></i>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import Vuex from 'vuex'
  import userStore from '../users/UsersStore'
  export default {
    name: 'team-list',
    store: userStore,
    data () {
      return {
        allTeams: [],
        myTeams: [],
        loading: false
      }
    },
    methods: {
      joinTeam () {
        //  Not ready yet
        return true
      }
    },
    computed: {
      ...Vuex.mapGetters([
        'userInfos'
      ]),
      isMember (team) {
        let res = false
        this.myTeams.forEach(myteam => {
          if (team.slug === myteam.slug) {
            res = true
          }
        })
        return res
      },
      getRole (team) {
        return this.myTeams.filter(myteam => myteam.slug === team.slug).status
      },
      isAdmin (team) {
        return this.myTeams.filter(myteam => myteam.slug === team.slug).admin
      },
      isProposer (team) {
        return this.myTeams.filter(myteam => myteam.slug === team.slug).proposer
      }
    },
    mounted () {
      this.teamResource = this.$resource('http://127.0.0.1:3000/api/teams', {}, {}, {
        before: () => { this.loading = true },
        after: () => { this.loading = false }
      })
      this.teamResource.get().then(response => {
        // If server answer
        this.allTeams = response.body.teams
      })
      this.myTeams = this.userInfos.teams
    }
  }
</script>

<style scoped>
  .teamList{
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  }
  .fa-toggle-on{
    color: #28a745;
  }
  .fa-toggle-off{
    color: #868e96;
  }
</style>
