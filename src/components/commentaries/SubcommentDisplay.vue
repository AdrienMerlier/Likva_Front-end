<template>
  <div class="subcomment-display">
    <div class="card card-body card-outline-secondary">
      <div class="media">
        <img src="../../assets/anonymousProfileLarge.png" alt="Image de Profile" class="rounded-circle profileImage"/>
        <div class="media-body">
          <!-- Add a router link to the author -->
          <h5 class="mt-0">{{subcomment.authorDisplay}} <small class="text-muted">{{displayDate(subcomment.date)}}</small></h5>
          <!-- Display only 120 char ?-->
          {{subcomment.content}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'subcomment-display',
    props: {
      subcomment: {
        required: true,
        default: function () {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .profileImage {
    width: 64px;
    height: 64px;
  }
</style>
