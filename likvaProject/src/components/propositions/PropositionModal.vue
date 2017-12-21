<template>
  <div>
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
            <proposition-form :proposition="proposition"></proposition-form>
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
  import PropositionForm from './PropositionForm'

  export default {
    name: 'proposition-modal',
    components: {PropositionForm},
    store: userStore,
    data () {
      return {
        proposition: {}
      }
    },
    methods: {
      ...Vuex.mapActions([
        'addMessageUserStore'
      ]),
      sendProposition () {
        let message = {concern: 'Proposition'}
        this.propositionResource.save({slug: this.actualTeamStore.slug}, {
          team: this.actualTeamStore.displayName,
          title: this.proposition.title,
          author: this.userFullName,
          summary: this.proposition.summary,
          description: this.proposition.description,
          change: this.proposition.change,
          consequences: this.proposition.consequences,
          information: this.proposition.information,
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
    computed: {
      ...Vuex.mapGetters([
        'userInfos',
        'actualTeamStore'
      ]),
      isProposer () {
        let selectedTeam = {}
        this.userInfos.teams.forEach(team => {
          if (team.slug === this.actualTeamStore.slug) { selectedTeam = team }
        })
        return selectedTeam.proposer
      }
    }
  }
</script>

<style scoped>

</style>
