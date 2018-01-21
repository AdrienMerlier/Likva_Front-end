<template>
  <div>
    <div class="propositionList">

      <div class="row">
        <div class="col-sm-9">
          <h2>Les propositions de l'équipe {{actualTeamStore.displayName}}</h2>
          <div class="card-columns">
            <div class="card" v-for="proposition in allPropositions">
              <h4 class="card-header">{{proposition.title}}</h4>
              <section class="card-body">
                <aside class="memberInfos" v-if="proposition.category">
                  <h5 class="card-title"><span class="badge badge-secondary">{{proposition.category}}</span></h5>
                </aside>
                <article>
                  <p class="card-text">{{proposition.summary}}</p>
                </article>
              </section>
              <div class="card-footer">
                <p class="card-text"><router-link :to="{name: 'profile-display', query: {id: proposition.authorLink}}">
                  Par {{proposition.author}}
                </router-link></p>
                <router-link :to="{name: 'display-proposition', params: { slug: slug, idProposition: proposition._id,
                  proposition: proposition }}">
                  <button type="button" class="btn btn-outline-success">Détails de la proposition</button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-3">
          <router-link :to="{name: 'category-list', params: { slug: slug }}">
            <button type="button" class="btn btn-outline-success side-btn">Passer à l'affichage par catégorie</button>
          </router-link>
          <router-link :to="{name: 'team-members-list', params: { slug: slug }}">
            <button type="button" class="btn btn-outline-info side-btn">Voir les membres de l'équipe</button>
          </router-link>
          <router-link v-if="isAdmin" :to="{name: 'team-members-administration', params: { slug: slug }}">
            <button type="button" class="btn btn-outline-danger side-btn">Administrer les membres de l'équipes</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vuex from 'vuex'
  import userStore from '../users/UsersStore'

  export default {
    name: 'proposition-list',
    store: userStore,
    data () {
      return {
        allPropositions: [],
        slug: false,
        catQuery: false
      }
    },
    watch: {
      allPropositions: function () {
        this.propositionResource = this.$resource('http://127.0.0.1:3000/api/teams{/slug}/propositions')
        this.slug = this.$router.history.current.params.slug
        this.propositionResource.get({slug: this.slug}).then(response => {
          //  If server answer
          this.allPropositions = response.body.props
          if (this.catQuery) {
            this.allPropositions = this.allPropositions.filter(proposition => proposition.category === this.catQuery)
          }
        }, _ => {
          //  Le serveur ne répond pas
          console.error('Le serveur semble ne pas répondre.')
        })
      }
    },
    computed: {
      ...Vuex.mapGetters([
        'userInfos',
        'actualTeamStore'
      ]),
      isAdmin () {
        let selectedTeam = {}
        this.userInfos.teams.forEach(team => {
          if (team.slug === this.actualTeamStore.slug) { selectedTeam = team }
        })
        return selectedTeam.admin
      }
    },
    mounted () {
      this.slug = this.$router.history.current.params.slug
      this.catQuery = this.$router.history.current.query.category
      this.propositionResource = this.$resource('http://127.0.0.1:3000/api/teams{/slug}/propositions')
      this.propositionResource.get({slug: this.slug}).then(response => {
        //  If server answer
        this.allPropositions = response.body.props
        if (this.catQuery) {
          this.allPropositions = this.allPropositions.filter(proposition => proposition.category === this.catQuery)
        }
      }, _ => {
        //  Le serveur ne répond pas
        console.error('Le serveur semble ne pas répondre.')
      }
      )
    },
    update () {
      this.propositionResource = this.$resource('http://127.0.0.1:3000/api/teams{/slug}/propositions')
      this.slug = this.$router.history.current.params.slug
      this.propositionResource.get({slug: this.slug}).then(response => {
          //  If server answer
        this.allPropositions = response.body.props
        if (this.catQuery) {
          this.allPropositions = this.allPropositions.filter(proposition => proposition.category === this.catQuery)
        }
      }, _ => {
        //  Le serveur ne répond pas
        console.error('Le serveur semble ne pas répondre.')
      })
    }
  }
</script>

<style scoped>
  .propositionList{
    width: 95%;
    margin-left: auto;
    margin-right: auto;
  }
  .side-btn{
    width: 100%;
    margin-bottom: 15px;
    overflow: hidden;
  }
</style>
