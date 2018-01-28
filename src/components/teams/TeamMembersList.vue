<template>
  <div class="usersList">
    <div class="input-group search">
      <div class="input-group-addon"><i class="fa fa-search" aria-hidden="true"></i></div>
      <input type="text" class="form-control" v-model="search" placeholder="Votre futur délégué..."/>
	  </div>
    <search-field :list="allUsers" msg="Votre futur délégué..." search-name="TeamMember" @updateTeamMember="list2">
    </search-field>
    <br/>
    <user-list :user-list="filteredList"></user-list>
  </div>
</template>

<script>
  import Vuex from 'vuex'
  import userStore from '../users/UsersStore'
  import UserList from '../users/UserList'
  import SearchField from '../SearchField'

  export default {
    components: {UserList, SearchField},
    name: 'team-list',
    store: userStore,
    data () {
      return {
        allUsers: [],
        slug: undefined,
        search: '',
        loading: false,
        list2: []
      }
    },
    methods: {
      ...Vuex.mapActions([
        'insertUserStore'
      ]),
      delegation (value) {
        return value.map(a => a.categoryName).join(', ')
      }
    },
    computed: {
      ...Vuex.mapGetters([
        'userInfos'
      ]),
      filteredList () {
        console.log(JSON.stringify(this.list2))
        return this.allUsers.filter(user => {
          return user.displayName.toLowerCase().includes(this.search.toLowerCase())
        })
      }
    },
    mounted () {
      this.slug = this.$router.history.current.params.slug
      this.usersResource = this.$resource('teams{/slug}/users')
      this.usersResource.get({slug: this.slug}).then(response => {
        this.allUsers = response.body.users
      })
    }
  }
</script>

<style scoped>
  .usersList{
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
  .search{
    width: 50%;
    margin-left: auto;
    margin-right: auto
  }
</style>
