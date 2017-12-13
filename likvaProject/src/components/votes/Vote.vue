<template>
  <div class="vote">
    <div class="btn-group">
      <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Votre Choix
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="#">Action</a>
        <a class="dropdown-item" href="#">Another action</a>
        <a class="dropdown-item" href="#">Something else here</a>
      </div>
      <button type="button" class="btn btn-primary">S'abstenir</button>
      <button type="button" class="btn btn-primary">Sony</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'vote',
    props: ['posibilities'],
    data () {
      return {
        result:  false
      }
    }
  }
</script>

<style scoped>

</style>
