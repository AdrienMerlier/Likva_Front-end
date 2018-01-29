<template>
  <div class="propositionDisplay">
    <div class="jumbotron jumbotron-fluid">
      <div class="container border-bottom border-white">
        <h1 class="display-3" id="title">{{proposition.title}}</h1>
        <router-link :to="{ name: 'display-results', params: {slug: slug, idProposition: idProposition}}" v-if="isReady()|hasResults">
          <button type="button" class="btn btn-success"> Avoir les résultats  </button>
        </router-link>
        <button @click="delegateGeneral" v-if="isFinalised&!isReady()" type="button" class="btn btn-outline-warning"> Transition des délégations </button>
        <button @click="delegateCategory" v-if="isAuthor()&!isReady()" type="button" class="btn btn-outline-info"> Finaliser la proposition </button>
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
      <div class="comment-space">
        <h3>Espace commentaire</h3>
        <div class="row">
          <div class="col-sm-8">
            <ul v-if="proposition.comments.length > 0">
              <li v-for="comment in proposition.comments">
                <comment-display :comment="comment"></comment-display>
              </li>
            </ul>
            <div class="card card-body" v-else>
              <p class="card-text">Auncun commentaire pour le moment, allez vous être le premier ?</p>
            </div>
          </div>
          <div class="col-sm-4">
            <comment-adder :proposition="proposition" :team-slug="proposition.slug"></comment-adder>
          </div>
        </div>
      </div>
    </div>
    <vote :possibilities="proposition.votePossibilities" v-if="isVoter && Date.parse(proposition.date) > Date.now()"></vote>
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
  import commentDisplay from '../commentaries/CommentDisplay'
  import commentAdder from '../commentaries/CommentAdder'

  import Vote from '../votes/Vote'
  import PropositionUpdateButton from './PropositionUpdateButton'

  export default {
    components: {Vote, PropositionUpdateButton, Nl2br, commentDisplay, commentAdder},
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
    watch: {
      proposition: function () {
        console.log('change detected in proposition')
      }
    },
    methods: {
      ...Vuex.mapActions([
        'addMessageUserStore'
      ]),
      isReady () {
        return this.proposition.verdict !== 'onGoing'
      },
      isVoter () {
        return this.userInfos.teams.filter(myteam => myteam.slug === this.slug)[0].status === 'Voter'
      },
      isAuthor () {
        return this.proposition.author === this.userFullName
      },
      delegateCategory () {
        let message = {concern: 'Finalisation du vote'}
        this.delegateResource.get(
          {slug: this.slug, propId: this.idProposition, delegateOption: 'delegateCategory'}).then(response => {
          // If server answer
            if (response.body.success) {
              // Good request
              this.isFinalised = true
              message.content = 'La proposition a été finalisé, bouger les catégories.'
              message.type = 'alert-success'
              this.addMessageUserStore(message)
            } else {
              // Wrong request
              console.error(response.body.message)
              message.content = 'Le vote est en cours, finalisation impossible'
              message.type = 'alert-danger'
              this.addMessageUserStore(message)
            }
          }, _ => {
          // The server doesn't answer
            console.error('Something went wrong with the server')
          })
      },
      delegateGeneral () {
        console.log('Coucou')
        this.delegateResource.get(
          {slug: this.slug, propId: this.idProposition, delegateOption: 'delegateGeneral'}).then(response => {
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
      this.delegateResource = this.$resource('teams{/slug}/propositions{/propId}{/delegateOption}')
      if (this.proposition === undefined) {
        //  Ask back-end for the proposition
        this.propositionResource = this.$resource('teams{/slug}/propositions{/idProposition}')
        this.propositionResource.get({slug: this.slug, idProposition: this.idProposition}).then(response => {
          this.proposition = response.body.props[0]
        })
      }
    }
  }
</script>

<style scoped>
  li {
    list-style-type: none;
    padding: 0;
    margin-bottom: 7px;
  }
  .border-bottom {
    border-bottom-width: 3px;
  }
  .comment-space h3{
    margin-left: 5%;
  }
  .comment-space {
    text-align: left;
  }
</style>
