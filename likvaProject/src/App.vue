<template>
  <div id="app">
    <header-bar></header-bar>
    <messages></messages>
    <router-view></router-view>
    <proposition-form></proposition-form>
  </div>
</template>

<script>
  import HelloWorld from './components/HelloWorld'
  import HeaderBar from './components/HeaderBar'
  import Messages from './components/Messages'
  import PropositionForm from './components/propositions/PropositionForm'

  export default {
    name: 'app',
    components: {
      HelloWorld,
      HeaderBar,
      Messages,
      PropositionForm
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
