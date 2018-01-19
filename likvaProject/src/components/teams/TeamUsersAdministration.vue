<template>
  <div class="container">
    <router-link :to="{name: 'proposition-list', params: { slug: slug }}">
      <button type="button" class="btn btn-outline-info">Retourner à la liste de proposition</button>
    </router-link>
    <br></br>
    <h2>Gestion de l'équipe {{slug}}</h2>
    <table class="table table-striped table-condensed">
      <thead>
      <tr>
        <th>Photo</th>
        <th>Nom complet</th>
        <th>Email</th>
        <th>Statut</th>
        <th>Proposeur</th>
        <th>Admin</th>
        <th>Eligible à la délégation</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in allUsers">
        <td>Empty</td>
        <td>{{user.displayName}}</td>
        <td>{{user.email}}</td>
        <td>{{user.status}}</td>
        <td>{{BooleanToOuiNon(user.proposer)}}</td>
        <td>{{BooleanToOuiNon(user.admin)}}</td>
        <td>{{IsDelegable(user.delegable)}}</td>
        <td>
          <button type="button" class="btn btn-warning btn-sm" data-toggle="modal" data-target="#modifyUserModal"><i class="fa fa-user-o"></i></button>
          <button type="button" class="btn btn-danger btn-sm"><i class="fa fa-trash-o"></i></button>
          <team-user-modifier :teamUserId="user._id"></team-user-modifier>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import Vuex from 'vuex'
  import userStore from '../users/UsersStore'
  import TeamUserModifier from './TeamUsersModify.vue'

  export default {
    components: {
      TeamUserModifier},
    name: 'team-members-administration',
    store: userStore,
    data () {
      return {
        allUsers: []
      }
    },
    watch: {
      slug: function () {
        //  Ask back-end for the proposition
        this.usersResource = this.$resource('http://127.0.0.1:3000/api/teams{/slug}/users')
        this.usersResource.get({slug: this.slug}).then(response => {
          this.allUsers = response.body.users
        })
      }
    },
    methods: {
      ...Vuex.mapActions([
        'insertUserStore'
      ]),
      BooleanToOuiNon (value) {
        if (value === true) {
          return 'Oui'
        } else {
          return 'Non'
        }
      },
      IsDelegable (value) {
        if (value.length === 0) {
          return 'Non'
        } else {
          return 'Oui'
        }
      }
    },
    computed: {
      ...Vuex.mapGetters([
        'userInfos'
      ])
    },
    mounted () {
      this.slug = this.$router.history.current.params.slug
      console.log(this.slug)
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
