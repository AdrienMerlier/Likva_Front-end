<template>
  <div class="propositionDisplay">
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-3" id="title">{{proposition.title}}</h1>
        <p class="lead" id="summary">{{proposition.summary}}</p>
        <h2>Description</h2>
        <p id="description">{{proposition.description}}</p>
        <div class="sm-col-6">
          <h2>Proposition de changements</h2>
          <p id="changements">{{proposition.change}}</p>
        </div>
        <div class="sm-col-6">
          <h2>Résultats Escomptés</h2>
          <p id="resultat">{{proposition.consequences}}</p>
        </div>
      </div>
    </div>
    <vote :possibilities="proposition.votePossibilities" v-if="isVoter"></vote>
  </div>
</template>

<script>
  import Vuex from 'vuex'
  import userStore from '../users/UsersStore'
  import Vote from '../votes/Vote'

  export default {
    components: {Vote},
    name: 'proposition-display',
    store: userStore,
    data () {
      return {
        proposition: {}
      }
    },
    methods: {
      isVoter () {
        return this.userInfos.teams.filter(myteam => myteam.slug === this.slug)[0].status === 'Voter'
      }
    },
    computed: {
      ...Vuex.mapGetters([
        'userInfos',
        'actualTeamStore'
      ])
    },
    mounted () {
      this.slug = this.$router.history.current.params.slug
      this.idProposition = this.$router.history.current.params.idProposition
      this.propositionResource = this.$resource('http://127.0.0.1:3000/api/teams{/slug}/propositions{/idProposition}')
      this.propositionResource.get({slug: this.slug, idProposition: this.idProposition}).then(response => {
        this.proposition = response.body.props[0]
      })
    }
  }
</script>

<style scoped>

</style>
