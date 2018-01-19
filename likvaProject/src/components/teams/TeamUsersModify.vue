<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="modifyUserModal" tabindex="-1" role="dialog" aria-labelledby="modifyUserModalLabel"
         aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modifyUserModalLabel">Modifier l'utilisateur {{teamUser.displayName}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <label for="status">Statut</label>
              <div class="input-group ">
                <div class="input-group-addon"><i class="fa fa-users" aria-hidden="true"></i></div>
                <select name="status" class="form-control" id="status" required="true"
                          v-model="status">
                  <option value="Voter">Voteur</option>
                  <option value="Commentator">Commetateur</option>
                  <option value="Observer">Observateur</option>
                </select>
              </div>
              <label for="proposer">Proposeur</label>
              <div class="input-group ">
                <div class="input-group-addon"><i class="fa fa-star" aria-hidden="true"></i></div>
                <select name="proposer" class="form-control" id="proposer" required="true"
                          v-model="proposer">
                  <option value=false>Non</option>
                  <option value=true>Oui</option>
                </select>
              </div>
              <label for="admin">Admin</label>
              <div class="input-group ">
                <div class="input-group-addon"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></div>
                <select name="admin" class="form-control" id="admin" required="true"
                          v-model="admin">
                  <option value=false>Non</option>
                  <option value=true>Oui</option>s
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click.prevent="registerModification" data-dismiss="modal">Sauvegarder</button>
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
    name: 'team-user-modifier',
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
        let message = {concern: 'Modification utilisateur'}
        console.log(this.teamUser._id)
        this.teamUserModifierResources.save(
          { //  Here you define urls params
            slug: this.slug
          },
          { //  Here you define passed object params
            _id: this.teamUser._id,
            admin: this.admin,
            proposer: this.proposer,
            status: this.status
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
      console.log('I have mounted teamUserModifierResources' + this.teamUserId)
      this.slug = this.$router.history.current.params.slug
      this.teamUserModifierResources = this.$resource('http://127.0.0.1:3000/api/teams{/slug}/users/modify')
    }
  }
</script>

<style scoped>

</style>
