<template>
  <div class="categoryList">
    <div class="card-columns">
      <div class="card" v-if="isAdmin">
        <h4 class="card-header">Une nouvelle catégorie?</h4>
        <section class="card-body">
          <category-adder></category-adder>
        </section>
        <div class="card-footer">
        </div>
      </div>
      <div class="card" v-for="category in allCategory" :id="category.categoryName">
        <h4 class="card-header">{{team.categoryName}}</h4>
        <section class="card-body">
        </section>
        <div class="card-footer">
          <p class="card-text">
            <router-link :to="{name: 'category-propositions-list', params: { categoryName: category.categoryName }}">
              <button type="button" class="btn btn-outline-success">
                Voir les propositions de cette catégorie</button></router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vuex from 'vuex'
  import userStore from '../users/UsersStore'
  import CategoryAdder from './CategoryAdder.vue'

  export default {
    components: {CategoryAdder},
    name: 'category-list',
    store: userStore,
    data () {
      return {
        allCategories: []
      }
    },
    methods: {
      ...Vuex.mapActions([
        'insertUserStore',
        'updateActualTeam'
      ]),
      isAdmin (team) {
        return this.myTeams.filter(myteam => myteam.slug === team.slug)[0].admin
      },
      isProposer (team) {
        return this.myTeams.filter(myteam => myteam.slug === team.slug)[0].proposer
      }
    },
    computed: {
      ...Vuex.mapGetters([
        'userInfos'
      ])
    },
    mounted () {
      this.slug = this.$router.history.current.params.slug
      this.categoryResource = this.$resource('http://127.0.0.1:3000/api/teams{/slug}/categories')
      this.categoryResource.get({slug: this.slug}).then(response => {
          //  If server answer
        this.allCategories = response.body.categories
      }, _ => {
          //  Le serveur ne répond pas
        console.error('Le serveur semble ne pas répondre.')
      }
      )
    }
  }
</script>

<style scoped>
  .teamList{
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
