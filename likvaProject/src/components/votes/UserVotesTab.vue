<template>
  <div class="container">
    <h2>Ses votes</h2>
    <table class="table table-striped table-condensed">
      <thead>
      <tr>
        <th>Nom de la proposition</th>
        <th>Catégorie</th>
        <th>Equipe</th>
        <th>Vote</th>
        <th>Date</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="vote in votes">
        <td>{{vote.proposition.title}}</td>
        <td>{{vote.proposition.category}}</td>
        <td>{{getTeamDisplayName(vote.proposition.teamSlug)}}</td>
        <td>{{vote.content}}</td>
        <td>{{displayDate(vote.proposition.date)}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import Vuex from 'vuex'
  import userStore from '../users/UsersStore'

  export default {
    name: 'user-votes-tab',
    store: userStore,
    props: {
      user: {
        required: true,
        default: null
      }
    },
    data () {
      return {
        displayVotes: {},
        votes: {}
      }
    },
    watch: {
      user: function () {
        this.userVotesResource = this.$resource('http://127.0.0.1:3000/api/votes/voter', {}, {}, {headers: {
          voterId: this.user}})
        console.log(this.user)
        this.userVotesResource.get().then(response => {
          // If server answer
          if (response.body.success) {
            // Good request
            this.votes = response.body.votes
            votes.forEach(vote => {
              if (this.teamInCommon(vote.proposition.slug)) {
                // User is in same team than the profile's user
                this.displayVotes.push(vote)
              }
            })
          }
        })
      }
    },
    methods: {
      getTeamDisplayName (slugProposition) {
        return this.userInfos.teams.filter(team => team.slug === slugProposition)[0].displayName
      },
      teamInCommon (teamSlug) {
        var ret = false
        this.userInfos.teams.forEach(team => {
          if (team.slug === teamSlug) ret = true
        })
        return ret
      },
      displayDate (stringDate) {
        var date = new Date(stringDate)
        var mois = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
        var jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
        return jours[date.getDay()] + ' ' + date.getDate() + ' ' + mois[date.getMonth()] + ' ' + (date.getYear() + 1900)
      }
    },
    computed: {
      ...Vuex.mapGetters([
        'userInfos'
      ])
    }
  }
</script>

<style scoped>

</style>
