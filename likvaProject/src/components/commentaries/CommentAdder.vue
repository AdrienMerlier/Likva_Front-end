<template>
  <div class="commentary-adder">
		<div class="card">
			<div class="card-header">
				<h6>Nouveau commentaire</h6>
			</div>
			<div class="card-body">
				<form>
					<div class="form-group">
					    <textarea class="form-control" id="new_comment" placeholder="Que pensez-vous de cette proposition" v-model="content"></textarea>
					</div>
				</form>
				<button type="button" class="btn btn-primary" @click="sendNewComment"><i class="fa fa-send"></i> Envoyer</button>
			</div>
		</div>
	</div>
</template>

<script>
  import Vuex from 'vuex'
  export default {
    name: 'comment-adder',
    props: {
      proposition: {
        required: true
      },
      teamSlug: {
        required: true
      }
    },
    data () {
      return {
        content: null
      }
    },
    methods: {
      ...Vuex.mapActions([
        'addMessageUserStore'
      ]),
      sendNewComment(){
        var comment = {}
        comment.authorDisplay = this.userFullName
        comment.content = this.content
        comment.date = Date.now()
        this.commentaryResource.save({slug: teamSlug, idProposition: proposition._id}, comment).then(response => {
          // Server answer
          var message = {
            concern: 'Nouveau Commentaire'
          }
          if (response.body.success) {
            // Good request
            comment.subcomments = []
            this.content = null
            this.proposition.comments.push(comment)
          } else {
            // Wrong request
            message.type = 'alert-danger'
            message.content = response.body.message
          }
        }, _ => {
          // Server doesn't answer
          console.error('Something went wrong with the server during comment adding')
        })
      }
    },
    computed: {
      ...Vuex.mapGetters([
        'userInfos',
        'userFullName'
      ])
    },
    mounted () {
      this.commentaryResource = this.$resource('http://127.0.0.0:3000/api/teams{/slug}/propositions{/idProposition}/addComment',{}, {}, {headers: {
        authorId: this.userInfos.id}})
  }
  }
</script>

<style scoped>

</style>
