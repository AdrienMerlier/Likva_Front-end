<template>
  <div class="categoryList">
    <router-link :to="{name: 'proposition-list', params: { slug: slug }}">
      <button type="button" class="btn btn-outline-success">Afficher toute les propositions</button>
    </router-link>
    <br></br>
    <div class="card-columns">
      <div class="card text-white" v-for="category in allCategories" :id="category.categoryName">
        <img class="card-img" src="../../assets/landscape.jpg" alt="Card image">
        <div class="card-img-overlay d-flex flex-column justify-content-around">
          <h2 class="card-title">{{category.categoryName}}</h2>
          <p class="card-text">
            <router-link :to="{name: 'category-proposition-list', params: { slug: slug },
            query: { category: category.categoryName }}">
              <button type="button" class="btn btn-primary">
                Voir les propositions de cette catégorie</button></router-link>
          </p>
        </div>
      </div>
      <div class="card text-white" id="addCategory"  v-if="isAdmin()" data-toggle="modal" data-target="#addCategoryModal">
      <img class="card-img" src="../../assets/landscapePlus.jpg" alt="Card image">
      <div class="card-img-overlay d-flex flex-column justify-content-around">
      </div>
    </div>
    </div>
    <category-adder></category-adder>
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
      isAdmin () {
        let res = false
        if (this.userInfos.teams.length > 0) {
          res = this.userInfos.teams.find(team => {
            if (team.slug === this.slug) {
              return team.admin
            } else {
              return false
            }
          })
        }
        return res
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
  .btn-center-bottom{
    position: fixed;
    bottom: 5%;
    z-index: 12;
  }
  .categoryList{
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  }
  .card-img-overlay{
    background-color: rgba(0, 0, 0, 0.4);
  }
  #addCategory .card-img-overlay{
    background-color: rgba(0, 0, 0, 0);
  }
</style>
