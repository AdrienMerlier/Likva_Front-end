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
                  <div class="input-group-addon"><i class="fa fa-text-width" aria-hidden="true"></i>
                  </div>
                  <input type="text" class="form-control form-control-lg" placeholder="Titre" >
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-success" data-dismiss="modal">
              <i class="fa fa-send"></i> Proposer</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal">
              <i class="fa fa-times"></i> Supprimer</button>
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
        delegateList: []
      }
    },
    mounted() {

      this.delegateResource = this.$resource('http://127.0.0.1:3000/api/teams{/slug}/delegates')
      this.delegateResource.get({slug: this.slug})
    }
  }
</script>

<style scoped>

</style>
