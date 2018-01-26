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
            <div class="dropdown pull-left start-dropdown-group">
              Pour l'équipe
              <button class="btn btn-primary btn-sm dropdown-toggle" type="button" id="dropdownTeamSelect"
                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{actualTeamStore.displayName}}
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownTeamSelect">
                <a class="dropdown-item" href="#" v-for="team in proposerTeams" v-if="userTeamsCount > 0"
                   @click="updateTeam(team)">{{team.displayName}}</a>
              </div>
            </div>
            <div class="dropdown pull-left spaced">
              dans la catégorie
              <button class="btn btn-primary btn-sm dropdown-toggle" type="button" id="dropdownCategorySelect"
                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-if="categoryLoaded">
                {{category.categoryName}}
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownCategorySelect">
                <a class="dropdown-item" href="#" v-for="cat in allCategories" @click="updateCategory(cat)">
                  {{cat.categoryName}}
                </a>
              </div>
            </div>
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
        proposition: {},
        team: '',
        category: {categoryName: 'Sélectionner'},
        categoryLoaded: false,
        allCategories: []
      }
    },
    methods: {
      ...Vuex.mapActions([
        'addMessageUserStore',
        'updateActualTeam'
      ]),
      sendProposition () {
        let message = {concern: 'Proposition'}
        this.propositionResource.save({slug: this.actualTeamStore.slug}, {
          team: this.actualTeamStore.displayName,
          title: this.proposition.title,
          author: this.userFullName,
          authorLink: this.userInfos.id,
          summary: this.proposition.summary,
          description: this.proposition.description,
          change: this.proposition.change,
          consequences: this.proposition.consequences,
          type: this.proposition.type,
          endDate: this.proposition.endDate,
          votePossibilities: this.proposition.optionsList,
          category: this.category.categoryName
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
      },
      updateTeam (team) {
        this.categoryLoaded = false
        this.updateActualTeam(team)
        this.categoryResource.get({slug: this.actualTeamStore.slug}).then(response => {
          //  If server answer
          this.allCategories = response.body.categories
          this.categoryLoaded = true
        }, _ => {
          //  Le serveur ne répond pas
          console.error('Le serveur semble ne pas répondre.')
        }
        )
      },
      updateCategory (cat) {
        this.category = cat
      }
    },
    computed: {
      ...Vuex.mapGetters([
        'userInfos',
        'actualTeamStore',
        'userFullName',
        'userTeamsCount',
        'proposerTeams'
      ]),
      isProposer () {
        let selectedTeam = {}
        this.userInfos.teams.forEach(team => {
          if (team.slug === this.actualTeamStore.slug) { selectedTeam = team }
        })
        return selectedTeam.proposer
      }
    },
    mounted () {
      this.propositionResource = this.$resource('http://127.0.0.1:3000/api/teams{/slug}/propositions')
      this.categoryResource = this.$resource('http://127.0.0.1:3000/api/teams{/slug}/categories')
      this.categoryResource.get({slug: this.actualTeamStore.slug}).then(response => {
        //  If server answer
        this.allCategories = response.body.categories
        this.categoryLoaded = true
      }, _ => {
        //  Le serveur ne répond pas
        console.error('Le serveur semble ne pas répondre.')
      })
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
  .spaced{
    margin-left: 5px;
  }
  .dropdown{
    margin-bottom: 1em;
  }
  .start-dropdown-group{
    margin-left: 1em;
  }
</style>
