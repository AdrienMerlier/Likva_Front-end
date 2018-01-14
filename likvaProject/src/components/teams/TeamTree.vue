<template>
  <div class="teamTree">
    <ul class="teams">
      <div class="teamInfos" v-for="team in teams">
        <li class="team">
          {{team.displayName}} <span class="moreLess" @dbclick="toogleOpen(team)">
          [{{team.open ? '-' : '+'}}]
        </span>
        </li>
        <ul class="categories" v-if="team.open">
          <li class="category" v-for="category in team.categories">{{category.categoryName}}
            <input type="checkbox" v-model="category.delegable">
          </li>
        </ul>
      </div>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'team-tree',
    props: {
      teams: {
        required: false,
        default: function () {
          return {}
        }
      }
    },
    methods: {
      updateParentValue (value) {
        this.$emit('input', value)
      },
      toogleOpen (team) {
        team.open = !team.open
      }
    },
    mounted () {
      this.teams.forEach(team => {
        team.open = true
      })
    }
  }
</script>

<style scoped>
  .teamTree{
    text-align: left;
  }
  .moreLess {
    cursor: pointer;
  }
</style>
