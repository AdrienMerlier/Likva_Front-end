<template>
    <div class="passwordInput">
      <div class="input-group">
        <div class="input-group-addon"><i class="fa fa-lock fa-fw" aria-hidden="true"></i>
        </div>
        <input type="password" class="form-control" placeholder="Code d'accès"
               :value="value" @input="updateParentValue">
      </div>
    </div>
</template>

<script>
  export default {
    name: 'team-password-asker',
    props: ['value'],
    data () {
      return {
        childSecretCode: ''
      }
    },
    methods: {
      updateParentValue () {
        console.log('J\'envoies un event à mon parent avec ' + this.secretCode)
        this.$emit('input', this.childSecretCode)
      }
    }
  }
</script>

<style scoped>

</style>
