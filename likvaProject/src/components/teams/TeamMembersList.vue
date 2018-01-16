<template>
  <div class="usersList">
    <div class="input-group search">
      <div class="input-group-addon"><i class="fa fa-search" aria-hidden="true"></i></div>
      <input type="text" class="form-control" v-model="search" placeholder="Votre futur délégué..."/>
	  </div>
    <br></br>
    <div class="card-columns">
      <div class="card" v-for="user in filteredList" :id="user.email">
        <h4 class="card-header">{{user.displayName}}</h4>
        <section class="card-body">
          <aside class="memberInfos">
              <h5 class="card-title">
                <span class="badge badge-secondary">{{user.status}}</span>
                <span class="badge badge-secondary" v-if="user.proposer">Proposeur</span>
              </h5>
          </aside>
          <article>
            <img src="../../assets/anonymousProfile.png" alt="Image de Profile" class="rounded-circle"/>
            <br></br>
            <p class="card-text">{{user.description}}</p>
            <h5 class="card-text" v-if="isDelegable(user.delegable)">Délégué dans les catégories: {{delegation(user.delegable)}}</h5>
          </article>
        </section>
        <div class="card-footer">
          <p class="card-text">
            <router-link :to="{name: 'profile-display', query: {id: user._id}}">
              <button type="button" class="btn btn-outline-success" >+ d'info</button>
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vuex from 'vuex'
  import userStore from '../users/UsersStore'

  export default {
    components: {},
    name: 'team-list',
    store: userStore,
    data () {
      return {
        allUsers: [],
        slug: undefined,
        search: '',
        loading: false
      }
    },
    methods: {
      ...Vuex.mapActions([
        'insertUserStore'
      ]),
      isDelegable (value) {
        console.log(value)
        if (value.length === 0) {
          return false
        } else {
          return true
        }
      },
      delegation (value) {
        return value.map(a => a.categoryName).join(', ')
      }
    },
    computed: {
      ...Vuex.mapGetters([
        'userInfos'
      ]),
      filteredList () {
        return this.allUsers.filter(user => {
          return user.displayName.toLowerCase().includes(this.search.toLowerCase())
        })
      }
    },
    mounted () {
      this.slug = this.$router.history.current.params.slug
      this.usersResource = this.$resource('http://127.0.0.1:3000/api/teams{/slug}/users')
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
