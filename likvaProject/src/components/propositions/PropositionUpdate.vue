<template>
  <div>
    <h1>Modification de la proposition</h1>
    <proposition-form :proposition="proposition"></proposition-form>
  </div>
</template>

<script>
  import PropositionForm from './PropositionForm'
  export default {
    components: {PropositionForm},
    name: 'proposition-update',
    props: ['proposition']
  }
</script>

<style scoped>

</style>
