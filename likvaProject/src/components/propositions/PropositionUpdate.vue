<template>
  <div>
    <h1>Modification de la proposition</h1>
    <proposition-form></proposition-form>
  </div>
</template>

<script>
  import PropositionForm from './PropositionForm'
  export default {
    components: {PropositionForm},
    name: 'proposition-update',
    data () {
      return {}
    },
    mounted () {
      console.log(JSON.stringify(this.$router.history.params))
    }
  }
</script>

<style scoped>

</style>
