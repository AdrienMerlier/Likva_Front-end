<template>
    <div class="passwordInput">
      <div class="input-group">
        <div class="input-group-addon"><i class="fa fa-lock fa-fw" aria-hidden="true"></i>
        </div>
        <input type="password" class="form-control" placeholder="Code d'accès"
               v-model="childSecretCode" :change="updateParentvalue">
      </div>
    </div>
</template>

<script>
  export default {
    name: 'team-password-asker',
    props: ['secretCode'],
    data () {
      return {
        childSecretCode: ''
      }
    },
    methods: {
      updateParentValue () {
        this.$emit('update:secretCode', this.childSecretCode)
      }
    }
  }
</script>

<style scoped>

</style>
