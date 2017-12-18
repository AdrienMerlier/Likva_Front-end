<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="delegationModal" tabindex="-1" role="dialog" aria-labelledby="delegationModalLabel"
         aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="delegationModalLabel">Délégation</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <div class="col-sm-12 input-group">
                  <div class="input-group-addon"><i class="fa fa-address-book-o" aria-hidden="true"></i>
                  </div>
                  <input type="text" class="form-control form-control-lg" placeholder="Délégué"
                         list="delegates" name="delegates">
                  <datalist id="delegates">
                    <option v-for="delegate in delegateList" :value="delegate"></option>
                  </datalist>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-success" data-dismiss="modal">
              <i class="fa fa-send"></i> Déléguer mon vote</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal">
              <i class="fa fa-times"></i> Annuler la délégation</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'delegation',
    data () {
      return {
        delegateList: ['Jean-Eude', 'Luc', 'Léo', 'Léa', 'Jean-Pierre']
      }
    },
    mounted () {
      console.log('La délégation est en train de se monter')
      this.slug = this.$router.history.current.params.slug
      console.log('Le slug récupéré est ' + this.slug)
      this.delegateResource = this.$resource('http://127.0.0.1:3000/api/teams{/slug}/delegates')
      this.delegateResource.get({slug: this.slug}).then(response => {
        // If server answer
        console.log('Le serveur a répondu avec : ' + JSON.stringify(response.body))
        if (response.body.success) {
          // Good request
          this.delegateList = this.response.body.delegateList
        } else {
          // Wrong request
          console.error(this.response.body.message)
        }
      }, _ => {
        // The server doesn't answer
        console.error('Something went wrong with the server')
      })
    }
  }
</script>

<style scoped>

</style>
