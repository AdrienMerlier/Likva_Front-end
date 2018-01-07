<template>
  <div>
    <h1>Modification de la proposition</h1>
    <proposition-form :proposition="proposition"></proposition-form>
    <div v-if="loaded">
      <router-link :to="{name: 'display-proposition', params: { slug: slug, idProposition: idProposition ,
        proposition: (success ? proposition : oldProposition)}}">
        <button type="button" class="btn btn-outline-warning" @click="updateProposition">
          <i class="fa fa-send"></i> Mettre à jour</button>
      </router-link>
    </div>
  </div>
</template>

<script>
  import PropositionForm from './PropositionForm'
  import Vuex from 'vuex'

  export default {
    components: {PropositionForm},
    name: 'proposition-update',
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
        loaded: false,
        oldProposition: {},
        success: false
      }
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
              this.success = true
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
      }
    },
    mounted () {
      this.slug = this.$router.history.current.params.slug
      this.proposition = this.$router.history.current.params.proposition
      this.idProposition = this.$router.history.current.params.idProposition
      this.propositionResource = this.$resource('http://127.0.0.1:3000/api/teams{/slug}/propositions{/idProposition}')
      this.oldProposition = Object.assign({}, this.proposition)
      this.loaded = true
    }
  }
</script>

<style scoped>

</style>
