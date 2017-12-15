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
          <div class="modal-body">
            <form>
              <div class="form-group">
                <div class="col-sm-12 input-group">
                  <div class="input-group-addon"><i class="fa fa-text-width" aria-hidden="true"></i>
                  </div>
                  <input type="text" class="form-control form-control-lg" placeholder="Titre" v-model="proposition.title">
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-12">
                  <label for="summary">Résumé de la proposition</label>
                  <textarea class="form-control" rows="3" id="summary" v-model="proposition.summary"></textarea>
                </div>
              </div>
              <div class="form-group">
                  <div class="col-sm-12">
                    <label for="description">Description de la problématique</label>
                    <textarea class="form-control" rows="5" id="description" v-model="proposition.description"></textarea>
                  </div>
              </div>
              <div class="form-group row">
                <div class="col-sm-6">
                  <label for="change">Proposition de changements</label>
                  <textarea class="form-control" rows="5" id="change" v-model="proposition.change"></textarea>
                </div>
                <div class="col-sm-6">
                  <label for="consequences">Résultats escomptés</label>
                  <textarea class="form-control" rows="5" id="consequences" v-model="proposition.consequences"></textarea>
                </div>
              </div>

              <!--Conditions-->
              <div class="form-group row">
                <div class="col-sm-4">
                  <label for="typeOfVote">Type de vote</label>
                  <div class="input-group">
                    <div class="input-group-addon"><i class="fa fa-signing" aria-hidden="true"></i></div>
                    <select name="typeOfVote" class="form-control" id="typeOfVote" required="true"
                            v-model="proposition.type">
                      <option>Majorité absolue</option>
                      <option>Le plus de votes</option>
                    </select>
                  </div>
                </div>
                <div class="col-sm-4">
                  <label for="inputEndDate">Date de clôture</label>
                  <div class="input-group">
                    <div class="input-group-addon"><i class="fa fa-calendar" aria-hidden="true"></i>
                    </div>
                    <input name="endDate" type="datetime-local" class="form-control" id="inputEndDate"
                           aria-describedby="conditionsHelp" required="true" v-model="proposition.endDate">
                  </div>
                  </div>
              </div>
              <div class="form-group row">
                <div class="col-sm-4">
                  <label for="answers">Réponses possibles</label>
                  <div class="input-group">
                    <div class="input-group-addon"><i class="fa fa-envelope" aria-hidden="true"></i></div>
                    <select name="answers" class="form-control" id="answers" required="true"
                            v-model="answer">
                      <option>Oui / Non</option>
                      <option>Personnaliser</option>
                    </select>
                  </div>
                </div>
                <div class="col-sm-4" v-if="answer === 'Personnaliser'">
                  <label for="addOptions">Ajouter une option</label>
                  <div class="input-group">
                    <input type="text" class="form-control" name="addOption" id="addOptions" v-model="newOption"/>
                    <button class="btn btn-outline-secondary input-group-addon" @click.prevent.stop="addToOptionsList">
                      <i class="fa fa-plus" aria-hidden="true"></i></button>
                  </div>
                </div>
                <div class="col-sm-4">
                  <p>Liste des options :</p>
                  <ul class="optionList fa-ul">
                    <li v-for="option in proposition.optionsList">
                      <i class="fa-li fa fa-times" @click.prevent="removeFromOptionsList(option)"></i>{{option}}</li>
                  </ul>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-success" data-dismiss="modal" @click.prevent="sendProposition">
              <i class="fa fa-send"></i> Proposer</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal" @click.prevent="removePropositionInfos">
              <i class="fa fa-times"></i> Supprimer</button>
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
          optionsList: []
        },
        saved: true,
        answer: null,
        newOption: null
      }
    },
    watch: {
      answer: function () {
        this.updateOptionsList()
      }
    },
    computed: {
      ...Vuex.mapGetters([
        'userInfos',
        'actualTeam',
        'tokenSession',
        'hasUserInfos',
        'userFullName'
      ]),
      isProposer () {
        let selectedTeam = {}
        this.userInfos.teams.forEach(team => {
          if (team.slug === this.actualTeam.slug) { selectedTeam = team }
        })
        return selectedTeam.proposer
      }
    },
    methods: {
      ...Vuex.mapActions([
        'addMessageUserStore'
      ]),
      addToOptionsList () {
        this.proposition.optionsList.push(this.newOption)
        this.newOption = null
      },
      removeFromOptionsList (option) {
        this.proposition.optionsList = this.proposition.optionsList.filter(opt => opt !== option)
      },
      updateOptionsList () {
        if (this.answer === 'Oui / Non') {
          this.proposition.optionsList = ['Oui', 'Non', 'Blanc']
        }
      },
      sendProposition () {
        let message = {concern: 'Proposition'}
        this.propositionResource.save({slug: this.actualTeam.slug}, {
          team: this.actualTeam.displayName,
          title: this.proposition.title,
          author: this.userFullName,
          summary: this.proposition.summary,
          description: this.proposition.description,
          change: this.proposition.change,
          consequences: this.proposition.consequences,
          information: this.proposition.information,
          quorum: this.proposition.quorum,
          typeOfVote: this.proposition.type,
          endDate: this.proposition.endDate,
          votePossibilities: this.proposition.optionsList
        }).then(response => {
          //  If response from server
          if (response.body.success) {
            message.type = 'alert-success'
            message.content = 'Votre proposition a bien été enregistrée'
          } else {
            message.type = 'alert-danger'
            message.content = 'Votre proposition n\'a pas pu être enregistrée veuillez réessayer.'
          }
          this.addMessageUserStore(message)
        }, _ => {
          // server doesn't answer
          message.content = 'Le serveur semble ne pas répondre, veuillez rééssayer ultérieurement'
          message.type = 'alert-danger'
          this.addMessageUserStore(message)
        })
      },
      removePropositionInfos () {
        this.proposition = {}
      }
    },
    mounted () {
      this.propositionResource = this.$resource('http://127.0.0.1:3000/api/teams{/slug}/propositions')
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
  .optionList{
    text-align: left;
  }
  .fa-li{
    cursor: pointer;
    color: #dc3545;
  }
</style>
