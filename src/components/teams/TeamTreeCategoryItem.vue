<template>
  <div class="categoryItem">
    <li class="category " v-for="category in categories">
      <span class="categoryName">
        {{category.categoryName}}
      </span>
      <input type="checkbox" :disabled="!owner" v-model="category.delegable" @change="updateDelegation(category)">
    </li>
  </div>
</template>

<script>
  import userStore from '../users/UsersStore'
  import Vuex from 'vuex'

  export default {
    name: 'team-tree-category-item',
    store: userStore,
    props: {
      categories: {
        required: true,
        default: function () {
          return {}
        }
      },
      owner: {
        required: true,
        default: false
      },
      slug: {
        required: true,
        default: null
      }
    },
    computed: {
      ...Vuex.mapGetters([
        'userInfos'
      ])
    },
    methods: {
      updateDelegation (category) {
        if (category.delegable) {
          this.becomeDelegableResource.save({slug: this.slug, categoryName: category.categoryName},
          {userId: this.userInfos.id}).then(response => {
            // Server answer
            if (response.body.success) {
              // Good request
              this.addMessageUserStore({
                content: 'Votre profile a été mis à jour',
                type: 'alert-success',
                concern: 'Profile'
              })
            } else {
              // Bad request
              this.addMessageUserStore({
                content: 'Une erreur est survenue lors de la mise à jour de votre profile',
                type: 'alert-danger',
                concern: 'Profile'
              })
            }
          }, _ => {
            // Server doesn't answer
            console.error('Something went wrong with the server when trying to update delegable')
          })
        } else {
          this.removeDelegableResource.save({slug: this.slug, categoryName: category.categoryName},
          {userId: this.userInfos.id}).then(response => {
            // Server answer
            if (response.body.success) {
              // Good request
              this.addMessageUserStore({
                content: 'Votre profile a été mis à jour',
                type: 'alert-success',
                concern: 'Profile'
              })
            } else {
              // Bad request
              this.addMessageUserStore({
                content: 'Une erreur est survenue lors de la mise à jour de votre profile',
                type: 'alert-danger',
                concern: 'Profile'
              })
            }
          }, _ => {
            // Server doesn't answer
            console.error('Something went wrong with the server when trying to update delegable')
          })
        }
      }
    },
    mounted () {
      this.removeDelegableResource = this.$resource('http://127.0.0.1:3000/api/teams{/slug}/categories{/categoryName}/removeDelegate')
      this.becomeDelegableResource = this.$resource('http://127.0.0.1:3000/api/teams{/slug}/categories{/categoryName}/becomeDelegate')
    }
  }
</script>

<style scoped>
  .category{

  }
</style>
