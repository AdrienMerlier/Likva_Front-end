<template>
  <div>
    <div id="team-form" v-if="hasUserInfos">
      <form>
        <h3>Informations de l'équipe</h3>

        <!--Team-->
        <div class="form-group row" id="teamName">
          <div class="col-sm-12 input-group">
            <div class="input-group-addon"><i class="fa fa-group" aria-hidden="true"></i>
            </div>
            <input type="text" class="form-control form-control-lg" placeholder="Nom d'équipe" v-model="team.name">
          </div>
        </div>
        <div class="form-group row" id="teamPassword">
          <div class="col-sm-12 input-group">
            <div class="input-group-addon"><i class="fa fa-lock" aria-hidden="true"></i>
            </div>
            <input type="password" class="form-control form-control-lg" placeholder="Code d'accès" v-model="team.password">
          </div>
        </div>

        <!--Team-->
        <div class="col-sm-12">
          <div class="col-sm-6">
            <label for="teamType" class="text-muted">Indiquez le type de votre équipe ?</label>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-sm-6 input-group">
            <div class="input-group-addon"><i class="fa fa-institution" aria-hidden="true"></i></div>
            <select name="teamType" class="form-control form-control-lg" id="teamType" v-model="team.type"
                    aria-describedby="selectHelpBlock">
              <option>Petite ONG (< 100 membres)</option>
              <option>Grande ONG (> 100 membres)</option>
              <option>Syndicat</option>
              <option>Parti ou mouvement Politique</option>
              <option>Administration Locale</option>
              <option>Groupe de travail</option>
              <option>Autre ...</option>
            </select>
          </div>
          <div class="col-sm-6 input-group" v-if="team.type === 'Autre ...'">
            <div class="input-group-addon"><i class="fa fa-search" aria-hidden="true"></i></div>
            <input type="text" class="form-control form-control-lg" placeholder="Précision sur le type"
                   v-model="team.preciseType">
          </div>
        </div>
      </form>
      <div class="btn-group">
        <button type="button" class="btn btn-outline-success" @click.prevent="createTeam">
          <i class="fa fa-send"></i> Créer l'équipe</button>
        <button type="button" class="btn btn-outline-danger" @click.prevent="removeTeamInformation">
          <i class="fa fa-close"></i> Annuler</button>
      </div>
    </div>
  </div>

</template>

<script>
  import Vuex from 'vuex'
  import userStore from '../users/UsersStore'

  export default {
    name: 'team-form',
    store: userStore,
    data () {
      return {
        team: {}
      }
    },
    methods: {
      ...Vuex.mapActions([
        'addTeamUserStore',
        'addMessageUserStore',
        'updateActualTeam'
      ]),
      createTeam () {
        this.teamFormResource.save({
          teamName: this.team.name,
          email: this.userInfos.email,
          type: this.team.type,
          pwd: this.team.password
        }
        ).then(response => {
          //  If server answer
          this.addTeamUserStrore({
            role: 'Voter',
            proposer: true,
            admin: true,
            slug: response.body.team.slug
          })
          console.log('Le contenu de la réponse :' + JSON.stringify(response.body))
          this.updateActualTeam(response.body.team)
        }, response => {
          //  If server doesn't answer
          let message = {
            concern: 'Création équipe: ',
            content: 'Le serveur semble ne pas répondre, veuillez rééssayer ultérieurement',
            type: 'alert-danger'
          }
          console.error('Something went wrong: ' + response.status)
          this.addMessageUserStore(message)
        })
      },
      removeTeamInformation () {
        this.team = {}
        return true
      }
    },
    computed: {
      ...Vuex.mapGetters([
        'userInfos',
        'hasUserInfos'
      ]),
      selectType () {
        if (this.team.preciseType) { this.team.type = this.team.preciseType }
      }
    },
    mounted () {
      this.teamFormResource = this.$resource('http://127.0.0.1:3000/api/teams')
    }
  }
</script>

<style scoped>
#team-from {
  margin-top: 40px;
}
  form {
    width: 70%;
    margin-left: auto ;
    margin-right: auto ;
  }
  label {
    text-align: left;
  }
  .btn-group button {
    width: 150px;
    margin: 20px;
  }
</style>
