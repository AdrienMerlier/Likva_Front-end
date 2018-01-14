<template>
  <div class="teamTree">
    <ul class="teams">
      <div class="teamInfos" v-for="team in teams">
        <team-tree-team-item :team="team" :owner="owner"></team-tree-team-item>
      </div>
    </ul>
  </div>
</template>

<script>
  import TeamTreeTeamItem from './TeamTreeTeamItem'
  export default {
    name: 'team-tree',
    components: {
      TeamTreeTeamItem
    },
    props: {
      teams: {
        required: false,
        default: function () {
          return {}
        }
      },
      owner: {
        required: false,
        default: false
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
