<template>
    <div class="passwordInput">
      <div class="input-group">
        <div class="input-group-addon"><i class="fa fa-lock fa-fw" aria-hidden="true"></i>
        </div>
        <input type="password" class="form-control" placeholder="Code d'accès"
               :value="value" @change.prevent="updateParentValue($event.target.value)">
      </div>
    </div>
</template>

<script>
  export default {
    name: 'team-password-asker',
    props: ['value'],
    data () {
      return {
      }
    },
    methods: {
      updateParentValue (value) {
        this.$emit('input', value)
      }
    }
  }
</script>

<style scoped>

</style>
