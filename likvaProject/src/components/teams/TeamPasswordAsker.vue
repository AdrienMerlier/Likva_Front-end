<template>
    <div class="passwordInput">
      <div class="input-group">
        <div class="input-group-addon"><i class="fa fa-lock fa-fw" aria-hidden="true"></i>
        </div>
        <input type="password" class="form-control" placeholder="Code d'accès"
               v-model="password">
      </div>
    </div>
</template>

<script>
  export default {
    name: 'team-password-asker',
    inherit: true,
    data () {
      return {
        password: ''
      }
    }
  }
</script>

<style scoped>

</style>
