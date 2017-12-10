<template>
  <div v-if="hasUserInfos">
      <!-- Add button -->
      <button type="button" class="btn btn-success btn-circle fixed-bottom fixed-right" data-toggle="modal"
              data-target="#propositionModal" v-if="isProposer">
        <i class="fa fa-plus"></i>
      </button>
    <!-- Modal -->
    <div class="modal fade" id="propositionModal" tabindex="-1" role="dialog" aria-labelledby="propositionModalLabel"
         aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="propositionModalLabel">Nouvelle proposition</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <h6 class="modal-subtitle text-muted">Brouillon sauvegardé</h6>
          <div class="modal-body">
            <form>
              <div class="form-group row">
                <div class="col-sm-12 input-group">
                  <div class="input-group-addon"><i class="fa fa-text-width" aria-hidden="true"></i>
                  </div>
                  <input type="text" class="form-control form-control-lg" placeholder="Titre" v-model="proposition.title">
                </div>
              </div>
              <div class="form-group row">
                <div class="col-sm-12">
                  <label for="summary">Résumé de la proposition</label>
                  <textarea class="form-control" rows="3" id="summary" v-model="proposition.summary"></textarea>
                </div>
              </div>
              <div class="form-group row">
                  <div class="col-sm-12">
                    <label for="description">Description de la problématique</label>
                    <textarea class="form-control" rows="5" id="description" v-model="proposition.description"></textarea>
                  </div>
              </div>
              <div class="form-group row">
                <div class="col-sm-12">
                  <label for="change">Proposition de changements</label>
                  <textarea class="form-control" rows="5" id="change" v-model="proposition.change"></textarea>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-sm-12">
                  <label for="consequence">Résultats escomptés</label>
                  <textarea class="form-control" rows="5" id="consequence" v-model="proposition.consequence"></textarea>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-success" @click.prevent="" data-dismiss="modal">
              <i class="fa fa-send"></i> Proposer</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal">
              <i class="fa fa-times"></i> Annuler</button>
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
    name: 'proposition-form',
    store: userStore,
    data () {
      return {
        proposition: {

        },
        saved: true
      }
    },
    computed: {
      ...Vuex.mapGetters([
        'userInfos',
        'actualTeam',
        'tokenSession',
        'hasUserInfos'
      ]),
      isProposer () {
        return true// this.userInfos.teams.filter(team => team.displayName === this.actualTeam.displayName).proposer
      }
    },
    methods: {
      sendProposition () {
        return true
      }
    },
    mounted () {
      this.propositionResource = this.$resource('http://127.0.0.1:3000/api')
    }
  }
</script>

<style scoped>
  .btn-circle {
    width: 60px;
    height: 60px;
    text-align: center;
    padding: 6px 0;
    font-size: 25px;
    line-height: 1.42;
    border-radius: 30px;
    z-index: 200;
  }

  .fixed-bottom{
    position: fixed;
    bottom: 2%;
  }

  .fixed-right{
    position: fixed;
    left: 92%;
  }
  .modal-dialog{
    max-width: 1024px;
  }
</style>
