<template>
  <div id="app">
    <header-bar></header-bar>
    <messages></messages>
    <router-view></router-view>
    <proposition-modal></proposition-modal>
    <delegation></delegation>
  </div>
</template>

<script>
  import HelloWorld from './components/HelloWorld'
  import HeaderBar from './components/HeaderBar'
  import Messages from './components/Messages'
  import PropositionModal from './components/propositions/PropositionModal'
  import Delegation from './components/votes/Delegation'

  export default {
    name: 'app',
    components: {
      Delegation,
      HelloWorld,
      HeaderBar,
      Messages,
      PropositionModal
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
