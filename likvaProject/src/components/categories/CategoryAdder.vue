<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="addCategoryModal" tabindex="-1" role="dialog" aria-labelledby="addCategoryModalLabel"
         aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addCategoryModalLabel">Ajouter la catégorie</h5>
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
                  <input type="text" class="form-control form-control-lg" placeholder="Categorie" v-model="categoryName">
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click.prevent="registerCategory" data-dismiss="modal">Ajouter</button>
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
    name: 'category-adder',
    data () {
      return {
        categoryName: ''
      }
    },
    methods: {
      ...Vuex.mapActions([
        'addMessageUserStore'
      ]),
      registerCategory () {
        let message = {concern: 'Inscription categorie'}
        this.categoryAdderResources.save(
          { //  Here you define urls params
            slug: this.slug
          },
          { //  Here you define passed object params
            categoryName: this.categoryName
          }
        ).then(response => {
          //  If success
          message.content = 'Votre catégorie est ajouté, rechargez la page.'
          message.type = 'alert-success'
          this.addMessageUserStore(message)
        }, response => {
          //  If failure
          console.error('Something went wrong: ' + response.status)
          message.content = 'Une erreur est survenue lors de votre ajout de catégorie, veuillez rééssayer'
          message.type = 'alert-danger'
          this.addMessageUserStore(message)
        })
      }
    },
    mounted () {
      console.log('I have mounted categoryAdderResources')
      this.slug = this.$router.history.current.params.slug
      this.categoryAdderResources = this.$resource('http://127.0.0.1:3000/api/teams{/slug}/categories')
    }
  }
</script>

<style scoped>

</style>
