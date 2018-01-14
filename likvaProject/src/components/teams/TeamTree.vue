<template>
  <div class="teamTree">
    <ul class="teams">
      <div class="teamInfos" v-for="team in teams">
        <team-tree-team-itemp :team="team"></team-tree-team-itemp>
      </div>
    </ul>
  </div>
</template>

<script>
  import TeamTreeTeamItemp from './TeamTreeTeamItem'
  export default {
    name: 'team-tree',
    components: {
      TeamTreeTeamItemp
    },
    props: {
      teams: {
        required: false,
        default: function () {
          return {}
        }
      }
    }
  }
</script>

<style>
  .teamTree{
    text-align: left;
  }
  ul {
    list-style: none;
  }
  li::before {
    content: "";
  }
</style>
