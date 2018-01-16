<template>
  <div class="container">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item">
        <a class="nav-link active" id="inProgress-tab" data-toggle="tab" href="#inProgress" role="tab" aria-controls="inProgress" aria-selected="true">En cours</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="done-tab" data-toggle="tab" href="#done" role="tab" aria-controls="done" aria-selected="false">Terminé</a>
      </li>
    </ul>
    <div class="tab-content">
      <div class="tab-pane fade show active" id="inProgress" role="tabpanel" aria-labelledby="inProgress-tab">
        <table class="table table-striped table-condensed">
          <thead>
          <tr>
            <th>Nom de la proposition</th>
            <th>Catégorie</th>
            <th>Equipe</th>
            <th>Nombre de votant</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="proposition in inProgressPropositions">
            <td>{{proposition.title}}</td>
            <td>{{proposition.category}}</td>
            <td>{{getTeamDisplayName(proposition.slug)}}</td>
            <td>{{proposition.numberOfVotes}}</td>
            <td>
              <router-link :to="{name: 'proposition-display', params: {slug: proposition.slug, idProposition: proposition._id,
					            proposition: proposition }}">
                <button type="button" class="btn btn-primary btn-sm rounded-circle"><i class="fa fa-file-text-o"></i></button>
              </router-link>
              <router-link :to="{name: 'edit-proposition', params: { slug: proposition.slug, idProposition: idProposition,
					        	proposition: proposition}}">
                <button type="button" class="btn btn-warning btn-sm rounded-circle"><i class="fa fa-edit"></i></button>
              </router-link>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="tab-pane fade" id="done" role="tabpanel" aria-labelledby="done-tab">
        <table class="table table-striped table-condensed">
          <thead>
          <tr>
            <th>Nom de la proposition</th>
            <th>Catégorie</th>
            <th>Equipe</th>
            <th>Nombre de votant</th>
            <th>Résultat</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="proposition in donePropositions">
            <td>{{proposition.title}}</td>
            <td>{{proposition.category}}</td>
            <td>{{getTeamDisplayName(proposition.slug)}}</td>
            <td>{{proposition.numberOfVotes === undefined ? 0 : proposition.numberOfVotes }}</td>
            <td>{{proposition.verdict}}</td>
            <td>
              <router-link :to="{name: 'proposition-display', params: {slug: proposition.slug, idProposition: proposition._id,
					            proposition: proposition }}">
                <button type="button" class="btn btn-success btn-sm rounded-circle"><i class="fa fa-pie-chart"></i></button>
              </router-link>
              <router-link :to="{ name: 'display-results', params: {slug: proposition.slug, idProposition: proposition._id}}">
                <button type="button" class="btn btn-primary btn-sm rounded-circle"><i class="fa fa-file-text-o"></i></button>
              </router-link>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import Vuex from 'vuex'
  import userStore from '../users/UsersStore'

  export default {
    name: 'user-propositions-tab',
    store: userStore,
    data () {
      return {
        myPropositions: [],
        inProgressPropositions: [],
        donePropositions: []
      }
    },
    methods: {
      getTeamDisplayName (slugProposition) {
        return this.userInfos.teams.filter(team => team.slug === slugProposition)[0].displayName
      }
    },
    computed: {
      ...Vuex.mapGetters([
        'userInfos'
      ])
    },
    mounted () {
      this.userPropositionsResource = this.$resource('http://127.0.0.1:3000/api/propositions/author', {}, {}, {headers: {
        authorId: this.userInfos.id}})
      this.userPropositionsResource.get().then(response => {
        // if server answer
        this.myPropositions = response.body.props
        this.myPropositions.forEach(proposition => {
          if (Date.parse(proposition.date) < Date.now()) {
            // Proposition done
            this.donePropositions.push(proposition)
          } else {
            // Proposition still in progress
            this.inProgressPropositions.push(proposition)
          }
        })
      }, _ => {
        // if server doesn't answer
        console.error('Le serveur semble ne pas répondre pour la listes des propositions.')
      })
    }
  }
</script>

<style scoped>
  .table-striped>tbody>tr:nth-child(odd)>td,
  .table-striped>tbody>tr:nth-child(odd)>th {
    background-color: #d9d6fc;
  }
</style>
