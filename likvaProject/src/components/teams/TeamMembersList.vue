<template>
  <div class="usersList">
    <div class="card-columns">
      <div class="card" v-for="user in allUsers" :id="user.email">
        <h4 class="card-header">{{user.displayName}}</h4>
        <section class="card-body">
          <aside class="memberInfos">
              <h5 class="card-title">
                <span class="badge badge-secondary">{{user.status}}</span>
                <span class="badge badge-secondary" v-if="user.proposer">Proposeur</span>
              </h5>
          </aside>
          <article>
            <p class="card-text">User description</p>
          </article>
          <br></br>
          <article>
            <h5 class="card-text" v-if="isDelegable(user.delegable)">Délégué dans les catégories: </h5>
          </article>
        </section>
        <div class="card-footer">
          <p class="card-text">
            <router-link :to="{name: 'member-display', params: { slug: slug, email: user.email }}">
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
        loading: false
      }
    },
    methods: {
      ...Vuex.mapActions([
        'insertUserStore'
      ]),
      isDelegable (value) {
        if (value === undefined) {
          return false
        } else {
          return true
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
</style>
