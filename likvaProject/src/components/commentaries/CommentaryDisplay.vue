<template>
  <div class="commentary">
		<div class="card card-body">
			<div class="media">
			  <img src="../../assets/anonymousProfileLarge.png" alt="Image de Profile" class="rounded-circle"/>
			  <div class="media-body">
			  	<!-- Add a router link to the author -->
			    <h6 class="mt-0">{{commentary.authorDisplay}} <small class="text muted">{{displayDate(commentary.date)}}</small></h6>
			    <!-- Display only 120 char an add read more button or a modal on commentary click ?-->
			    {{commentary.content}}
			  </div>
			</div>
		</div>
	</div>
</template>

<script>
  export default {
    name: 'commentary-display'
  }
</script>

<style scoped>

</style>
