<template>
  <div class="commentary-adder">
		<div class="card">
			<div class="card-header">
				<h6>Nouveau commentaire</h6>
			</div>
			<div class="card-body">
				<form>
					<div class="form-group">
					    <textarea class="form-control" id="new_comment" placeholder="Que pensez-vous de cette proposition"></textarea> 
					</div>
				</form>
				<button type="button" class="btn btn-primary"><i class="fa fa-send"></i> Envoyer</button>
			</div>
		</div>
	</div>
</template>

<script>
  export default {
    name: 'commentary-adder'
  }
</script>

<style scoped>

</style>
