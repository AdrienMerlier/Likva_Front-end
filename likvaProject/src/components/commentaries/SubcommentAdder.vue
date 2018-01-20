<template>
  <div class="subcomment-adder">
		<div class="input-group mb-3">
			<input type="text" class="form-control" placeholder="Réagissez à ce commentaire..." v-model="content">
        <span class="input-group-btn">
				  <button class="btn btn-outline-secondary" type="button" @click="addSubComment"><i class="fa fa-send"></i> Commenter</button>
        </span>
		</div>
	</div>
</template>

<script>
  export default {
    name: 'comment-adder',
    data () {
      return {
        content: null
      }
    },
    methods: {
      addSubComment () {
        console.log('Votre commentaire a bien été saisie mais pour l\'instant il ne se passe rien.')
        this.content = null
      }
    }
  }
</script>

<style scoped>

</style>
