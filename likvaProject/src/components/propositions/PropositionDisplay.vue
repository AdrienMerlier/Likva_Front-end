<template>
  <div class="propositionDisplay">
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-3" id="title">{{proposition.title}}</h1>
        <br><br/>
        <router-link :to="{ name: 'display-results', params: {slug: slug, idProposition: idProposition}}" v-if="isAuthor">
          <button type="button" class="btn btn-outline-success"> Resultats de la proposition </button>
        </router-link>
        <br><br/>
        <p class="lead" id="summary">{{proposition.summary}}</p>
        <h2>Description</h2>
        <nl2br id="description" tag="p" :text=proposition.description />
        <div class="sm-col-6">
          <h2>Proposition de changements</h2>
          <nl2br id="changements" tag="p" :text=proposition.change />
        </div>
        <div class="sm-col-6">
          <h2>Résultats Escomptés</h2>
          <nl2br id="resultat" tag="p" :text=proposition.consequences />
        </div>
      </div>
    </div>
    <vote :possibilities="proposition.votePossibilities" v-if="isVoter"></vote>
    <router-link :to="{ name: 'edit-proposition', params: {slug: slug, idProposition: idProposition,
     proposition: proposition}}" v-if="this.proposition.author === this.userFullName">
      <proposition-update-button></proposition-update-button>
    </router-link>
  </div>
</template>

<script>
  import Vuex from 'vuex'
  import userStore from '../users/UsersStore'
  import Nl2br from 'vue-nl2br'

  import Vote from '../votes/Vote'
  import PropositionUpdateButton from './PropositionUpdateButton'

  export default {
    components: {Vote, PropositionUpdateButton, Nl2br},
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
