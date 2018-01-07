<template>
  <div class="propositionDisplay">
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-3" id="title">{{proposition.title}}</h1>
        <router-link :to="{ name: 'display-results', params: {slug: slug, idProposition: idProposition}}" v-if="isAuthor">
          <button type="button" class="btn btn-outline-success"> Resultats de la proposition </button>
        </router-link>
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
    <router-link :to="{ name: 'edit-proposition', params: {slug: slug, idProposition: idProposition,
     proposition: proposition}}" v-if="isAuthor">
      <proposition-update-button></proposition-update-button>
    </router-link>
  </div>
</template>

<script>
  import Vuex from 'vuex'
  import userStore from '../users/UsersStore'
  import Vote from '../votes/Vote'
  import PropositionUpdateButton from './PropositionUpdateButton'

  export default {
    components: {Vote, PropositionUpdateButton},
    name: 'proposition-display',
    store: userStore,
    data () {
      return {
        slug: false,
        idProposition: false,
        proposition: {}
      }
    },
    methods: {
      isVoter () {
        return this.userInfos.teams.filter(myteam => myteam.slug === this.slug)[0].status === 'Voter'
      },
      isAuthor () {
        return this.proposition.author === this.userFullName
      }
    },
    computed: {
      ...Vuex.mapGetters([
        'userInfos',
        'actualTeamStore',
        'userFullName'
      ])
    },
    beforeMount () {
      this.slug = this.$router.history.current.params.slug
      this.idProposition = this.$router.history.current.params.idProposition
    },
    mounted () {
      this.proposition = this.$router.history.current.params.proposition
      if (this.proposition === undefined) {
        //  Ask back-end for the proposition
        this.propositionResource = this.$resource('http://127.0.0.1:3000/api/teams{/slug}/propositions{/idProposition}')
        this.propositionResource.get({slug: this.slug, idProposition: this.idProposition}).then(response => {
          this.proposition = response.body.props[0]
        })
      }
    }
  }
</script>

<style scoped>

</style>
