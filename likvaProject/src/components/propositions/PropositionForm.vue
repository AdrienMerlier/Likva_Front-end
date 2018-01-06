<template>
  <div>
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

      <div v-if="!update">
        <div class="form-group row">
          <div class="col-sm-6">
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
          <div class="col-sm-6">
            <label for="inputEndDate">Date de clôture</label>
            <div class="input-group">
              <div class="input-group-addon"><i class="fa fa-calendar" aria-hidden="true"></i>
              </div>
              <input name="endDate" type="date" class="form-control" id="inputEndDate"
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
      </div>

      <div v-else>
        <router-link :to="{name: 'display-proposition', params: { slug: slug, idProposition: idProposition }}">
          <button type="button" class="btn btn-outline-warning" @click.stop="updateProposition">
            <i class="fa fa-send"></i> Mettre à jour</button>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
  import Vuex from 'vuex'
  import userStore from '../users/UsersStore'

  export default {
    name: 'proposition-form',
    store: userStore,
    props: {
      proposition: {
        required: false,
        default: function () {
          return {}
        }
      }
    },
    data () {
      return {
        saved: true,
        answer: null,
        newOption: null,
        update: false
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
        'actualTeamStore',
        'tokenSession',
        'hasUserInfos',
        'userFullName'
      ])
    },
    methods: {
      ...Vuex.mapActions([
        'addMessageUserStore'
      ]),
      updateProposition () {
        // PUT request sent
        let message = {concern: 'MAJ Proposition'}
        this.propositionResource.update({slug: this.slug, idProposition: this.idProposition},
          {proposition: this.proposition}).then(response => {
            //  If server answer
            if (response.body.success) {
              //  Update worked
              message.content = 'La mise à jour s\'est correctement effectuée'
              message.type = 'alert-success'
            } else {
              message.content = 'La mise à jour a échoué'
              message.type = 'alert-danger'
            }
            this.addMessageUserStore(message)
          }, _ => {
            message.content = 'Le serveur semble ne pas répondre'
            console.error(message.content)
            message.type = 'alert-danger'
            this.addMessageUserStore(message)
          })
      },
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
      }
    },
    mounted () {
      this.update = this.$router.history.current.path.includes('update')
      if (this.update) {
        this.slug = this.$router.history.current.params.slug
        this.proposition = this.$router.history.current.params.proposition
        this.idProposition = this.$router.history.current.params.idProposition
        this.propositionResource = this.$resource('http://127.0.0.1:3000/api/teams{/slug}/propositions{/idProposition}')
      }
    }
  }
</script>

<style scoped>
  .optionList{
    text-align: left;
  }
  .fa-li{
    cursor: pointer;
    color: #dc3545;
  }
</style>
