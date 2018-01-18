<template>
  <div class="teamMembersList">
    <h1>Gestion de l'équipe {{slug}}</h1>
    <router-link :to="{name: 'proposition-list', params: { slug: slug }}">
      <button type="button" class="btn btn-outline-info">Retourner à la liste de proposition</button>
    </router-link>
    <br></br>
    <b-table striped hover :items="allUsers" :fields="fields">
      <template slot="actions" slot-scope="row">
        <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
        <b-button data-toggle="modal" data-target="#modifyUserModal" size="sm" class="alert-warning">
          Modifier
        </b-button>
        <b-button size="sm" @click.stop="" class="alert-danger">
          Supprimer
        </b-button>
      </template>
    </b-table>
    <user-modifier></user-modifier>
  </div>
</template>

<script>
  import Vuex from 'vuex'
  import userStore from '../users/UsersStore'
  import bTable from 'bootstrap-vue/es/components/table/table'
  import bButton from 'bootstrap-vue/es/components/button/button'
  import userModifier from './TeamUsersModify'

  export default {
    components: {bTable, bButton, userModifier},
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
            key: 'email',
            label: 'Email',
            sortable: false
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
            formatter: (value) => { if (value.length === 0) { return 'Non' } else { return 'Oui' } }
          },
          { key: 'actions', label: 'Actions' }
        ],
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
        this.usersResource = this.$resource('http://127.0.0.1:3000/api/teams{/slug}/users')
        this.usersResource.get({slug: this.slug}).then(response => {
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
