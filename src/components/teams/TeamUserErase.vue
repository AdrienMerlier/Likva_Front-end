<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="eraseUserModal" tabindex="-1" role="dialog" aria-labelledby="eraseUserModalLabel"
         aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modifyUserModalLabel">Supprimer l'utilisateur {{teamUser.displayName}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h6>Êtes vous sûr(e) de vouloir supprimer l'utilisateur {{teamUser.displayName}} ? Il sera impossible de rétablir son compte en l'état actuel.</h6>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click.prevent="registerModification" data-dismiss="modal">Confirmer</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal">Annuler</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vuex from 'vuex'

  export default {
    name: 'team-user-erase',
    props: [ 'teamUser' ],
    data () {
      return {
        status: null,
        admin: null,
        proposer: null
      }
    },
    watch: {
      teamUserId: function (val) {
        console.log(val)
      }
    },
    methods: {
      ...Vuex.mapActions([
        'addMessageUserStore'
      ]),
      registerModification () {
        let message = {concern: 'Suppression utilisateur'}
        console.log(this.teamUser._id)
        this.teamAdminResource.save(
          { //  Here you define urls params
            slug: this.slug,
            action: 'erase'
          },
          { //  Here you define passed object params
            _id: this.teamUser._id
          }
        ).then(response => {
          //  If success
          message.content = 'Votre modification est ajouté, rechargez la page.'
          message.type = 'alert-success'
          this.addMessageUserStore(message)
        }, response => {
          //  If failure
          console.error('Something went wrong: ' + response.status)
          message.content = 'Une erreur est survenue lors de modification, veuillez rééssayer'
          message.type = 'alert-danger'
          this.addMessageUserStore(message)
        })
      }
    },
    mounted () {
      this.slug = this.$router.history.current.params.slug
      this.teamAdminResource = this.$resource('teams{/slug}/admin{/action}')
    }
  }
</script>

<style scoped>

</style>
