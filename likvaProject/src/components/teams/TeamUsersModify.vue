<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="modifyUserModal" tabindex="-1" role="dialog" aria-labelledby="modifyUserModalLabel"
         aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modifyUserModalLabel">Modifier l'utilisateur</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group row">
                <div class="col-sm-12 input-group">
                </div>
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
    data () {
      return {
        categoryName: ''
      }
    },
    methods: {
      ...Vuex.mapActions([
        'addMessageUserStore'
      ]),
      registerModification () {
        console.log('Hi')
      }
    },
    mounted () {
      console.log('I have mounted categoryAdderResources')
      this.slug = this.$router.history.current.params.slug
      this.teamUserModifierResources = this.$resource('http://127.0.0.1:3000/api/teams{/slug}/users/modify b')
    }
  }
</script>

<style scoped>

</style>
