<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="addUserModal" tabindex="-1" role="dialog" aria-labelledby="modifyUserModalLabel"
         aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addUserModalLabel">Ajouter un membre</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="col-sm-12 input-group">
                <div class="input-group-addon"><i class="fa fa-address-book-o" aria-hidden="true"></i>
                </div>
                <input type="text" class="form-control form-control-lg" placeholder="Email du membre"
                       list="users" name="users" v-model="newUser">
                <datalist id="users">
                  <option v-for="user in userList" :value="user.email"></option>
                </datalist>
              </div>
              <label for="status">Statut</label>
              <div class="input-group ">
                <div class="input-group-addon"><i class="fa fa-users" aria-hidden="true"></i></div>
                <select name="status" class="form-control" id="status" required="true"
                        v-model="status">
                  <option value="Voter">Voteur</option>
                  <option value="Commentator">Commetateur</option>
                  <option value="Observer">Observateur</option>
                </select>
              </div>
              <label for="proposer">Proposeur</label>
              <div class="input-group ">
                <div class="input-group-addon"><i class="fa fa-star" aria-hidden="true"></i></div>
                <select name="proposer" class="form-control" id="proposer" required="true"
                        v-model="proposer">
                  <option value=false>Non</option>
                  <option value=true>Oui</option>
                </select>
              </div>
              <label for="admin">Admin</label>
              <div class="input-group ">
                <div class="input-group-addon"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></div>
                <select name="admin" class="form-control" id="admin" required="true"
                        v-model="admin">
                  <option value=false>Non</option>
                  <option value=true>Oui</option>s
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click.prevent="registerUser" data-dismiss="modal">Sauvegarder</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal">Annuler</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vuex from 'vuex'

  export default {
    name: 'team-user-add',
    props: ['existingMembers'],
    data () {
      return {
        status: null,
        admin: null,
        proposer: null,
        newUser: null,
        userList: []
      }
    },
    watch: {
      existingMembers: function () {
        let existingMembersEmail = this.existingMembers.map(user => user.userId)
        this.usersResource = this.$resource('http://127.0.0.1:3000/api/users', {}, {}, {headers:
        {members: existingMembersEmail.toString()}})
        this.usersResource.get().then(response => {
          // If server answer
          if (response.body.success) {
            // Good request
            this.userList = response.body.users
          } else {
            // Wrong request
            console.error(response.body.message)
          }
        }, _ => {
          // The server doesn't answer
          console.error('Le serveur ne répond pas')
        })
      }

    },
    methods: {
      ...Vuex.mapActions([
        'addMessageUserStore'
      ]),
      registerUser () {
        console.log('NewUser: ' + this.newUser)
        let userToAdd = this.userList.filter(member => this.newUser === member.email)[0]
        console.log('User to add: ' + userToAdd)
        let message = {concern: 'Ajout membre'}
        this.teamUserAdderResources.save(
          { //  Here you define urls params
            slug: this.slug
          },
          { //  Here you define passed object params
            _id: userToAdd._id,
            displayName: userToAdd.displayName,
            admin: this.admin,
            proposer: this.proposer,
            status: this.status
          }
        ).then(response => {
          //  If success
          message.content = 'Votre modification est ajouté, rechargez la page.'
          message.type = 'alert-success'
          this.addMessageUserStore(message)
        }, response => {
          //  If failure
          console.error('Something went wrong: ' + response.status)
          message.content = 'Une erreur est survenue lors de modification, veuillez rééssayer'
          message.type = 'alert-danger'
          this.addMessageUserStore(message)
        })
      }
    },
    mounted () {
      console.log('On monte le MemberAdder')
      this.slug = this.$router.history.current.params.slug
      this.teamUserAdderResources = this.$resource('http://127.0.0.1:3000/api/teams{/slug}/admin/addUser')
    }
  }
</script>

<style scoped>

</style>
