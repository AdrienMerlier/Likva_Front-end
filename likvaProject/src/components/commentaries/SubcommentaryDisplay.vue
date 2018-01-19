<template>
  <div class="subcommentary-display">
    <div class="card card-body card-outline-secondary">
      <div class="media">
        <img src="../../assets/anonymousProfileLarge.png" alt="Image de Profile" class="rounded-circle"/>
        <div class="media-body">
          <!-- Add a router link to the author -->
          <h5 class="mt-0">{{subcommentary.authorDisplay}} <small class="text-muted">{{displayDate(subcommentary.date)}}</small></h5>
          <!-- Display only 120 char ?-->
          {{subcommentary.content}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'subcommentary-display',
    props: {
      subCommentary: {
        required: true
      }
    }
  }
</script>

<style scoped>
  ul, li{
    list-style:none;
    padding-left:0;
    padding-bottom: 7px;
  }​
</style>
