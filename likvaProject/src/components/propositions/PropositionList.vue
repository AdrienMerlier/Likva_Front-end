<template>
  <div>
    <div class="propositionList">
      <router-link :to="{name: 'category-list', params: { slug: slug }}">
        <button type="button" class="btn btn-outline-success">Passer à l'affichage par catégorie</button>
      </router-link>
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
            <p class="card-text">Par {{proposition.author}}</p>
            <router-link :to="{name: 'display-proposition', params: { slug: slug, idProposition: proposition._id },
            props: {proposition: proposition}}">
              <button type="button" class="btn btn-outline-success">Détails de la proposition</button>
            </router-link>
          </div>
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
        slug: false
      }
    },
    computed: {
      ...Vuex.mapGetters([
        'actualTeamStore'
      ])
    },
    mounted () {
      this.slug = this.$router.history.current.params.slug
      this.propositionResource = this.$resource('http://127.0.0.1:3000/api/teams{/slug}/propositions')
      this.propositionResource.get({slug: this.slug}).then(response => {
        //  If server answer
        this.allPropositions = response.body.props
      }, _ => {
        //  Le serveur ne répond pas
        console.error('Le serveur semble ne pas répondre.')
      }
      )
    }
  }
</script>

<style scoped>
  .propositionList{
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  }
</style>
