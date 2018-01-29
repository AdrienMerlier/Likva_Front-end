<template>
  <div class="teamList">
    <div class="card-columns">
      <div class="card" v-for="team in allTeams" :id="team.slug">
        <h4 class="card-header">{{team.displayName}}</h4>
        <section class="card-body">
          <aside class="memberInfos" v-if="isMember(team)">
            <h5 class="card-title">
              <span class="badge badge-danger" v-if="isAdmin(team)">Administrateur</span>
              <span class="badge badge-primary" v-if="isProposer(team)">Proposeur</span>
              <span class="badge badge-secondary">{{getRole(team)}}</span>
            </h5>
          </aside>
          <article>
            <p class="card-text">{{team.description}}</p>
          </article>
        </section>
        <div class="card-footer" v-if="isMember(team)">
            <p class="card-text">
              <router-link :to="{name: 'proposition-list', params: { slug: team.slug }}">
                <button type="button" class="btn btn-outline-success" @click="updateActualTeam(team)">
              Voir les propositions</button></router-link>
              <router-link :to="{name: 'category-list', params: { slug: team.slug }}">
                <button type="button" class="btn btn-outline-success">Voir les catégories</button>
              </router-link>

            </p>
        </div>
        <div class="card-footer" v-else>
          <div class="row">
            <team-password-asker class="sm-col-6" v-model="team.secretCode"></team-password-asker>
            <button type="button" class="btn btn-outline-success sm-col-6" @click="joinTeam(team)">Rejoindre</button>
          </div>
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
        'insertUserStore',
        'updateActualTeam'
      ]),
      joinTeam (team) {
        //  Have to update the page
        this.teamResource.save({slug: team.slug, action: 'join'}, {
          email: this.userInfos.email,
          teamPassword: team.secretCode
        }).then(response => {
            //  If server answer I have to update user in userStore
          if (response.body.success) {
            //  L'utilisateur a été ajouté en base
            this.insertUserStore(response.body.user)
          } else {
            //  Une erreur a été détectée par le serveur
            console.error(response.body.message)
          }
        }
        )
      },
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
        return this.myTeams.filter(myteam => myteam.slug === team.slug)[0].role
      },
      isAdmin (team) {
        return this.myTeams.filter(myteam => myteam.slug === team.slug)[0].admin
      },
      isProposer (team) {
        return this.myTeams.filter(myteam => myteam.slug === team.slug)[0].proposer
      }
    },
    computed: {
      ...Vuex.mapGetters([
        'userInfos'
      ])
    },
    mounted () {
      this.teamResource = this.$resource('teams{/slug}{/action}', {}, {}, {
        before: () => { this.loading = true },
        after: () => { this.loading = false }
      })
      this.teamResource.get().then(response => {
        // If server answer
        this.allTeams = response.body.teams
        this.allTeams.forEach(team => {
          team.secretCode = ''
        })
      }, _ => {
        // If server doesn't answer
        console.error('Le serveur semble ne pas répondre')
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
