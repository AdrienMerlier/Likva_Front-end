<template>
  <div class="teamItem">
    <li class="team badge badge-pill badge-primary">
      {{team.displayName}} <span class="moreLess" @click="toogleOpen">
      <i class="fa fa-chevron-down" v-if="open"></i>
      <i class="fa fa-chevron-right" v-else></i>
        </span>
    </li>
    <ul class="categories" v-show="open">
      <team-tree-category-item :categories="team.categories" :owner="owner" :slug="team.slug"></team-tree-category-item>
    </ul>
  </div>
</template>

<script>
  import TeamTreeCategoryItem from './TeamTreeCategoryItem'
  export default {
    name: 'team-tree-team-item',
    components: {
      TeamTreeCategoryItem
    },
    props: {
      team: {},
      owner: {
        required: false,
        default: false
      }
    },
    data () {
      return {
        open: false
      }
    },
    methods: {
      toogleOpen () {
        this.open = !this.open
      }
    }
  }
</script>

<style scoped>
  .moreLess {
    cursor: pointer;
  }
  .team {
    font-size: 1em;
    margin-bottom: 0.2em;
  }
</style>
