<template>
  <div class="categoryItem">
    <li class="category " v-for="category in categories">
      <span class="categoryName">
        {{category.categoryName}}
      </span>
      <input type="checkbox" :disabled="!owner" v-model="category.delegable">
    </li>
  </div>
</template>

<script>
  import userStore from '../users/UsersStore'
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
        required: false,
        default: true
      }
    },
    data () {
      return {
      }
    }
  }
</script>

<style scoped>
  .category{

  }
</style>
