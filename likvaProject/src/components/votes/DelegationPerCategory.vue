<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="delegationPerCategoryModal" tabindex="-1" role="dialog" aria-labelledby="delegationCategoryModalLabel"
         aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="delegationModalLabel">Délégation pour la catégorie</h5>
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
                         list="delegates" name="delegates" v-model="delegateName">
                  <datalist id="delegates">
                    <option v-for="delegate in delegateList" :value="delegate.displayName"></option>
                  </datalist>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-success" data-dismiss="modal" @click.prevent="delegation">
              <i class="fa fa-send"></i> Déléguer mon vote</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal" @click.prevent="cancelDelegation">
              <i class="fa fa-times"></i> Annuler la délégation</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vuex from 'vuex'
  import userStore from '../users/UsersStore'
  export default {
    name: 'delegation',
    store: userStore,
    data () {
      return {
        delegateName: ''
      }
    },
    methods: {
      ...Vuex.mapActions([
        'updateDelegation',
        'removeDelegation'
      ]),
      delegation () {
        let user = this.delegateList.filter(delegate => this.delegateName === delegate.displayName)[0]
        this.updateDelegation(user)
      },
      cancelDelegation () {
        this.removeDelegation()
      }
    },
    computed: {
      ...Vuex.mapGetters([
        'delegateList'
      ]),
      mounted () {
        console.log('Coucou')
      }
    }
  }
</script>

<style scoped>

</style>
