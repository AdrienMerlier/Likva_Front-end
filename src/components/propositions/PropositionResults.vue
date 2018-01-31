<template>
  <div class="propositionResults">
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h2 class="display-3" id="verdict">Le résultat de cette proposition est {{verdict}}</h2>
        <h5>Le nombre de votants pour cette proposition est {{sum(data)}}</h5>
        <doughnut-results id="abstention" v-if=loaded :labelsVote=labels :dataVote=data :backgroundColor=backgroundColorAbstention></doughnut-results>
        <doughnut-results id="votes" v-if=loaded :labelsVote=labels :dataVote=data :backgroundColor=backgroundColor> </doughnut-results>
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
        labelsAbsention: [],
        data: [],
        dataAbsention: [],
        backgroundColor: ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E', '#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC', '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC'],
        backgroudColorAbsention: ['#000000', '#FFEBCD'],
        loaded: false
      }
    },
    methods: {
      sum (value) {
        return value.reduce(function (a, b) { return a + b }, 0)
      }
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
      this.propositionResource = this.$resource('teams{/slug}/propositions{/idProposition}/results')
      this.propositionResource.get({slug: this.slug, idProposition: this.idProposition}).then(response => {
        this.verdict = response.body.verdict
        this.labels = response.body.labels
        this.data = response.body.data
        this.labelsAbstention = response.body.labelsAbstention
        this.dataAbstention = response.body.dataAbstention
        this.loaded = true
      })
    }
  }
</script>

<style scoped>

</style>
