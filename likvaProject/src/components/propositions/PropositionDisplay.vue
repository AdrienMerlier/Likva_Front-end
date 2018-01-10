<template>
  <div class="propositionDisplay">
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-3" id="title">{{proposition.title}}</h1>
        <router-link :to="{ name: 'display-results', params: {slug: slug, idProposition: idProposition}}" v-if="hasResults">
          <button type="button" class="btn btn-success"> Avoir les résultats  </button>
        </router-link>
        <button @click="delegateGeneral" v-if="isFinalised&!hasResults" type="button" class="btn btn-outline-warning"> Transition des délégations </button>
        <button @click="delegateCategory" v-if="isAuthor()&!isFinalised&!hasResults" type="button" class="btn btn-outline-info"> Finaliser la proposition </button>
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
     proposition: proposition}}" v-if="isAuthor()&!hasResults">
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
        proposition: {},
        isFinalised: false,
        hasResults: false
      }
    },
    methods: {
      isVoter () {
        return this.userInfos.teams.filter(myteam => myteam.slug === this.slug)[0].status === 'Voter'
      },
      isAuthor () {
        return this.proposition.author === this.userFullName
      },
      delegateCategory () {
        console.log('Coucou')
        this.delegateCategoryResource = this.$resource('http://127.0.0.1:3000/api/teams{/slug}/propositions{/propId}/delegateCategory')
        this.delegateCategoryResource.get({slug: this.slug, propId: this.idProposition}).then(response => {
          // If server answer
          if (response.body.success) {
            // Good request
            this.isFinalised = true
          } else {
            // Wrong request
            console.error(response.body.message)
          }
        }, _ => {
          // The server doesn't answer
          console.error('Something went wrong with the server')
        })
      },
      delegateGeneral () {
        console.log('Coucou')
        this.delegateGeneralResource = this.$resource('http://127.0.0.1:3000/api/teams{/slug}/propositions{/propId}/delegateGeneral')
        this.delegateGeneralResource.get({slug: this.slug, propId: this.idProposition}).then(response => {
          // If server answer
          if (response.body.success) {
            // Good request
            this.hasResults = true
          } else {
            // Wrong request
            console.error(response.body.message)
          }
        }, _ => {
          // The server doesn't answer
          console.error('Something went wrong with the server')
        })
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
          if (this.proposition.verdict !== undefined) {
            this.hasResults = true
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
