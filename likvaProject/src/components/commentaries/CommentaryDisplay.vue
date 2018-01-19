<template>
  <div class="commentary-display">
		<div class="card card-body">
			<div class="media">
				<img src="../../assets/anonymousProfileLarge.png" alt="Image de Profile" class="rounded-circle"/>
				<div class="media-body">
					<!-- Add a router link to the author -->
					<h5 class="mt-0">{{commentary.authorDisplay}} <small class="text-muted">{{displayDate(commentary.date)}}</small></h5>
					<!-- Display only 120 char an add read more button or a modal on commentary click ?-->
                    {{commentary.content}}
                    <subcommentary-adder></subcommentary-adder>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import SubcommentaryAdder from './SubcommentaryAdder'
  export default {
    name: 'commentary-display',
    components: [
      SubcommentaryAdder
     ]
  }
</script>

<style scoped>

</style>
