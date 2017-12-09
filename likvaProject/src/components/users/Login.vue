<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel"
         aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="loginModalLabel">Se connecter</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group row">
                <div class="col-sm-12 input-group">
                  <div class="input-group-addon"><i class="fa fa-envelope" aria-hidden="true"></i>
                  </div>
                  <input type="email" class="form-control form-control-lg" id="inlineFormInputGroup"
                         placeholder="Email" v-model="logemail">
                </div>
              </div>
              <div class="form-group row">
                <div class="col-sm-12 input-group">
                  <div class="input-group-addon"><i class="fa fa-lock" aria-hidden="true"></i>
                  </div>
                  <input type="password" class="form-control form-control-lg" placeholder="Password"
                   v-model="logpassword">
                </div>
              </div>
              <p>Pas encore inscrit ?
                <a href="#" data-toggle="modal" data-target="#signinModal" data-dismiss="modal">Inscription</a>
              </p>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click.prevent="logUser" data-dismiss="modal">Se Connecter</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal">Annuler</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vuex from 'vuex'
  import userStore from './UsersStore'
  export default {
    name: 'login',
    store: userStore,
    data () {
      return {
        loading: false,
        logemail: '',
        logpassword: ''
      }
    },
    methods: {
      ...Vuex.mapActions([
        'insertUserStore'
      ]),
      logUser () {
        console.log(this.logemail, this.logpassword)
        this.loginResource.save({logemail: this.logemail, logpassword: this.logpassword}).then(response => {
          //  If success
          console.log('Contenu de la réponse: ' + response.body)
          console.log('Contenu du user: ' + response.body.user)
          this.insertUserStore(response.body.user)
        }, response => {
          //  If failure
          console.error('Something went wrong: ' + response.status)
        })
      }
    },
    mounted () {
      this.loginResource = this.$resource('http://127.0.0.1:3000/login', {}, {}, {
        before: () => { this.loading = true },
        after: () => { this.loading = false }
      })
    }
  }
</script>

<style scoped>
  form{
    width: 80%;
    margin-left: auto ;
    margin-right: auto ;
    margin-top: 20px;
  }
  .icon__loading{
    position: fixed;
    top: 50%;
    left: 50%;
    width: 60px;
    height: 60px;
    padding: 10px;
    margin-left: -30px;
    margin-top: -30px;
    background-color: black;
    opacity: 0.5;
    color: white;
    border-radius: 60px;
    z-index: 4000;
  }
</style>
