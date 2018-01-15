<template>
  <div class="categoryItem">
    <li class="category " v-for="category in categories">
      <span class="categoryName">
        {{category.categoryName}}
      </span>
      <input type="checkbox" :disabled="!owner" v-model="category.delegable">
    </li>
    <toggle-button :value="false"
                   color="#82C7EB"
                   :sync="true"
                   :labels="true"/>
  </div>
</template>

<script>
  import userStore from '../users/UsersStore'
  import ToggleButton from 'vue-js-toggle-button'
  export default {
    name: 'team-tree-category-item',
    store: userStore,
    components: {
      ToggleButton
    },
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
      }
    }
  }
</script>

<style scoped>
  .category{

  }
</style>
