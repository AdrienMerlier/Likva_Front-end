<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="signinModal" tabindex="-1" role="dialog" aria-labelledby="signinModalLabel"
         aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="signinModalLabel">S'inscrire</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group row">
                <div class="col-sm-12 input-group">
                  <div class="input-group-addon"><i class="fa fa-address-card fa-fw" aria-hidden="true"></i>
                  </div>
                  <input type="text" class="form-control form-control-lg" placeholder="Name" v-model="user.name">
                </div>
              </div>
              <div class="form-group row">
                <div class="col-sm-12 input-group">
                  <div class="input-group-addon"><i class="fa fa-address-card fa-fw" aria-hidden="true"></i>
                  </div>
                  <input type="text" class="form-control form-control-lg" placeholder="Surname" v-model="user.surname">
                </div>
              </div>
              <div class="form-group row">
                <div class="col-sm-12 input-group">
                  <div class="input-group-addon"><i class="fa fa-envelope fa-fw" aria-hidden="true"></i>
                  </div>
                  <input type="email" class="form-control form-control-lg" placeholder="Email" v-model="user.email">
                </div>
              </div>
              <div class="form-group row">
                <div class="col-sm-12 input-group">
                  <div class="input-group-addon"><i class="fa fa-lock fa-fw" aria-hidden="true"></i>
                  </div>
                  <input type="password" class="form-control form-control-lg" placeholder="Password"
                         v-model="user.password">
                </div>
              </div>
              <p>Déja inscrit ?
                <a href="#" data-toggle="modal" data-target="#loginModal" data-dismiss="modal">Connexion</a>
              </p>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click.prevent="registerUser" data-dismiss="modal">S'inscrire</button>
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
    name: 'register',
    store: userStore,
    data () {
      return {
        user: {
          name: '',
          surname: '',
          password: '',
          email: ''
        }
      }
    },
    methods: {
      ...Vuex.mapActions([
        'addMessageUserStore'
      ]),
      registerUser () {
        let message = {concern: 'Inscription'}
        this.registerResource.save(
          {
            name: this.user.name,
            surname: this.user.surname,
            email: this.user.email,
            pwd: this.user.password
          }
        ).then(response => {
          //  If success
          message.content = 'Vous avez bien été inscrit, essayez de vous connecter'
          message.type = 'alert-success'
          this.addMessageUserStore(message)
        }, response => {
          //  If failure
          console.error('Something went wrong: ' + response.status)
          message.content = 'Une erreur est survenue lors de votre inscription, veuillez rééssayer'
          message.type = 'alert-danger'
          this.addMessageUserStore(message)
        })
      }
    },
    mounted () {
      this.registerResource = this.$resource('http://127.0.0.1:3000/api/users')
    }
  }
</script>

<style scoped>

</style>
