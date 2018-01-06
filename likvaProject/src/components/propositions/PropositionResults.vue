<template>
  <div class="propositionResults">
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h2 class="display-3" id="verdict">Le résultat de cette proposition est {{verdict}}</h2>
        <doughnutResults v-if=loaded :labelsVote=labels :dataVote=data></doughnutResults>
      </div>
    </div>
  </div>
</template>

<script>
  import Vuex from 'vuex'
  import userStore from '../users/UsersStore'
  import doughnutResults from './DoughnutChart'

  export default {
    components: {doughnutResults},
    name: 'proposition-results',
    store: userStore,
    data () {
      return {
        verdict: '',
        labels: [],
        data: [],
        loaded: false
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
      this.slug = this.$router.history.current.params.slug
      this.idProposition = this.$router.history.current.params.idProposition
      this.propositionResource = this.$resource('http://127.0.0.1:3000/api/teams{/slug}/propositions{/idProposition}/results')
      this.propositionResource.get({slug: this.slug, idProposition: this.idProposition}).then(response => {
        this.verdict = response.body.verdict
        this.labels = response.body.labels
        this.data = response.body.data
      })
      this.loaded = true
    }
  }
</script>

<style scoped>

</style>
