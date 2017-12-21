<template>
  <div>
    <!-- Edit button -->
    <router-link :to="{ name: 'edit-proposition', props: { proposition: localProposition}}">
      <button type="button" class="btn btn-warning btn-circle fixed-bottom fixed-left" v-if="isAuthor">
        <i class="fa fa-edit"></i>
      </button>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'proposition-update-button',
    props: {
      proposition: {
        required: true
      }
    },
    data () {
      return {
        localProposition: this.proposition
      }
    }
  }
</script>

<style scoped>
  .btn-circle {
    width: 60px;
    height: 60px;
    text-align: center;
    padding: 6px 0;
    font-size: 25px;
    line-height: 1.42;
    border-radius: 30px;
    z-index: 200;
  }

  .fixed-bottom{
    position: fixed;
    bottom: 2%;
  }

  .fixed-left{
    position: fixed;
    left: 8%;
  }
</style>
