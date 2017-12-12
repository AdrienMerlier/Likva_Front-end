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
            Dans l'équipe
          </div>
          <div class="card-footer" v-else>
            <team-password-asker></team-password-asker>
            <button type="button" class="btn btn-outline-succes" @click.prevent="joinTeam(team)">Rejoindre</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import Vuex from 'vuex'
  import userStore from '../users/UsersStore'
  import TeamPasswordAsker from './TeamPasswordAsker'

  export default {
    components: {TeamPasswordAsker},
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
      ...Vuex.mapActions([
        'insertUserStore'
      ]),
      joinTeam (team) {
        //  Not ready yet
        console.log('Le mot de passe est: ' + team.password)
        this.joinResource.save({slug: team.slug}, {
          email: this.userInfos.email,
          teamPassword: team.password
        }).then(response => {
          //  If server answer I have to update user in userStore
          this.insertUserStore(response.body.user)
        })
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
        return this.myTeams.filter(myteam => myteam.slug === team.slug)[0].status
      },
      isAdmin (team) {
        return this.myTeams.filter(myteam => myteam.slug === team.slug)[0].admin
      },
      isProposer (team) {
        return this.myTeams.filter(myteam => myteam.slug === team.slug)[0].proposer
      }
    },
    mounted () {
      this.teamResource = this.$resource('http://127.0.0.1:3000/api/teams', {}, {}, {
        before: () => { this.loading = true },
        after: () => { this.loading = false }
      })
      this.joinResource = this.$resource('http://127.0.0.1:3000/api/teams{/slug}/join')
      this.teamResource.get().then(response => {
        // If server answer
        this.allTeams = response.body.teams
        console.log('La liste des équipes: ' + this.allTeams)
      })
      this.myTeams = this.userInfos.teams
      console.log('La liste de mes équipes: ' + this.myTeams)
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
