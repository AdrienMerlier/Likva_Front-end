<template>
  <div class="teamMembersList">
    <router-link :to="{name: 'proposition-list', params: { slug: slug }}">
      <button type="button" class="btn btn-outline-info">Retourner à la liste de proposition</button>
    </router-link>
    <br></br>
    <b-table striped hover :items="allUsers" :fields="fields">
      <template>
        <a class="navbar-brand" href="#"><img src="../../assets/profile.png"/></a>
      </template>

      <template slot="actions" slot-scope="row">
        <b-button size="sm">
          Info modal
        </b-button>
        <b-button size="sm" >
          Details
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
  import Vuex from 'vuex'
  import userStore from '../users/UsersStore'
  import bTable from 'bootstrap-vue/es/components/table/table'

  export default {
    components: {bTable},
    name: 'team-members-administration',
    store: userStore,
    data () {
      return {
        fields: [
          {
            // A column that needs custom formatting,
            // calling formatter 'fullName' in this app
            key: '',
            label: 'Photo'
          },
          {
            // A column that needs custom formatting,
            // calling formatter 'fullName' in this app
            key: 'displayName',
            label: 'Nom complet',
            sortable: true
          },
          {
            // A column that needs custom formatting,
            // calling formatter 'fullName' in this app
            key: 'status',
            label: 'Statut',
            sortable: true
          },
          {
            // A column that needs custom formatting,
            // calling formatter 'fullName' in this app
            key: 'proposer',
            label: 'Proposeur',
            sortable: true,
            formatter: (value) => { if (value === true) { return 'Oui' } else { return 'Non' } }
          },
          {
            // A column that needs custom formatting,
            // calling formatter 'fullName' in this app
            key: 'admin',
            label: 'Administrateur',
            sortable: true,
            formatter: (value) => { if (value === true) { return 'Oui' } else { return 'Non' } }
          },
          {
            // A column that needs custom formatting,
            // calling formatter 'fullName' in this app
            key: 'delegable',
            label: 'Eligible à la délégation',
            sortable: true,
            formatter: (value) => { if (value === undefined) { return 'Non' } else { return 'Oui' } }
          }],
        allUsers: []
      }
    },
    methods: {
      ...Vuex.mapActions([
        'insertUserStore'
      ])
    },
    computed: {
      ...Vuex.mapGetters([
        'userInfos'
      ])
    },
    mounted () {
      this.slug = this.$router.history.current.params.slug
      if (this.proposition === undefined) {
        //  Ask back-end for the proposition
        this.propositionResource = this.$resource('http://127.0.0.1:3000/api/teams{/slug}/users')
        this.propositionResource.get({slug: this.slug}).then(response => {
          this.allUsers = response.body.users
        })
      }
    }
  }
</script>

<style scoped>
  .teamMembersList{
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  }
  .fa-toggle-on{
    color: #28a745;
  }
  .fa-toggle-off{
    color: #868e96;
  }
</style>
