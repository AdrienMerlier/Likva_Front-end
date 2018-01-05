<template>
  <div class="propositionResults">
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h2 class="display-3" id="verdict">Le résultat de cette proposition est {{result.verdict}}</h2>
      </div>
    </div>
  </div>
</template>

<script>
  import Vuex from 'vuex'
  import userStore from '../users/UsersStore'

  export default {
    components: {},
    name: 'proposition-results',
    store: userStore,
    data () {
      return {
        results: {}
      }
    },
    methods: {
    },
    computed: {
      ...Vuex.mapGetters([
        'userInfos',
        'actualTeamStore',
        'userFullName'
      ])
    },
    mounted () {
      console.error('Je suis dans le truc de résultats.')
      this.slug = this.$router.history.current.params.slug
      this.idProposition = this.$router.history.current.params.idProposition
      this.propositionResource = this.$resource('http://127.0.0.1:3000/api/teams{/slug}/propositions{/idProposition}/results')
      this.propositionResource.get({slug: this.slug, idProposition: this.idProposition}).then(response => {
        this.results = response.body.props[0]
      })
    }
  }
</script>

<style scoped>

</style>
