<template>
  <div>
    <delegation-category></delegation-category>
    <div class="propositionList">
      <h1>{{catQuery}}</h1>
      <h3>
        <small v-if="hasDelegate"> Votre délégué(e) actuel(le) est: {{currentDelegate.displayName}}</small>
        <small v-else> Vous n'avez pas de délégué(e) pour cette catégorie.</small>
      </h3>
      <h3>
        <div v-if="delegable">
          <small >Vous êtes éligible à la délégation pour cette catégorie.</small>
          <button type="button" class="btn btn-warning" v-on:click="removeMyselfDelegate"> Se retirer de la délégation pour une catégorie</button>
        </div>
        <div v-else>
          <small>Vous n'êtes pas élégible </small>
          <button type="button" class="btn btn-warning" v-on:click="becomeDelegate"> Devenir délégué potentiel</button>
        </div>
      </h3>
      <p class></p>
      <router-link :to="{name: 'category-list', params: { slug: slug }}">
        <button type="button" class="btn btn-outline-success">Retourner à l'ensemble des catégories</button>
      </router-link>
      <button v-if="hasDelegate" type="button" class="btn btn-info" data-toggle="modal" data-target="#delegationPerCategoryModal">Changer mon délégué(e)</button>
      <button v-else type="button" class="btn btn-info" data-toggle="modal" data-target="#delegationPerCategoryModal">Ajouter un délégué(e)</button>
      <button v-if="hasDelegate" type="button" class="btn btn-warning" v-on:click.once="removeDelegate">Enlever votre délégué(e)</button>
      <br><br/>
      <div class="card-columns">
        <div class="card" v-for="proposition in allPropositions">
          <h4 class="card-header">{{proposition.title}}</h4>
          <section class="card-body">
            <aside class="memberInfos" v-if="proposition.category">
              <h5 class="card-title"><span class="badge badge-secondary">{{proposition.category}}</span></h5>
            </aside>
            <article>
              <p class="card-text">{{proposition.summary}}</p>
            </article>
          </section>
          <div class="card-footer">
            <p class="card-text">Par {{proposition.author}}</p>
            <router-link :to="{name: 'display-proposition', params: { slug: slug, idProposition: proposition._id,
            proposition: proposition }}">
              <button type="button" class="btn btn-outline-success">Détails de la proposition</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vuex from 'vuex'
  import userStore from '../users/UsersStore'
  import DelegationCategory from '../votes/DelegationPerCategory.vue'

  export default {
    name: 'category-proposition-list',
    components: {DelegationCategory},
    store: userStore,
    data () {
      return {
        allPropositions: [],
        slug: false,
        catQuery: false,
        currentDelegate: false,
        hasDelegate: false,
        delegable: false
      }
    },
    methods: {
      ...Vuex.mapActions([
        'addMessageUserStore',
        'insertDelegates',
        'removeDelegation',
        'updateUserStore'
      ]),
      removeDelegate () {
        console.log('Salut')
        let message = {concern: 'Suppression délégué'}
        this.removeDelegateResource.save(
          { //  Here you define urls params
            slug: this.slug
          },
          { //  Here you define passed object params
            voter: this.userInfos.email,
            categoryName: this.catQuery
          }
        ).then(response => {
          //  If success
          message.content = 'Votre délégué a été supprimé, rechargez la page.'
          message.type = 'alert-success'
          this.addMessageUserStore(message)
        }, response => {
          //  If failure
          console.error('Something went wrong: ' + response.status)
          message.content = 'Une erreur est survenue lors de votre suppression de délégué, veuillez rééssayer'
          message.type = 'alert-danger'
          this.addMessageUserStore(message)
        })
      },
      becomeDelegate () {
        let message = {concern: 'Devenir délégué'}
        this.becomeDelegateResource.save(
          { //  Here you define urls params
            slug: this.slug,
            categoryName: this.catQuery
          },
          { //  Here you define passed object params
            userId: this.userInfos.id
          }
        ).then(response => {
          //  If success
          message.content = 'Vous êtes devenu délégué pour cette catégorie.'
          message.type = 'alert-success'
          this.addMessageUserStore(message)
          this.delegable = true
        }, response => {
          //  If failure
          console.error('Something went wrong: ' + response.status)
          message.content = 'Une erreur est survenue lors de votre suppression de délégué, veuillez rééssayer'
          message.type = 'alert-danger'
          this.addMessageUserStore(message)
        })
      },
      removeMyselfDelegate () {
        let message = {concern: 'Retirer des délégués'}
        this.removeMyselfDelegateResource.save(
          { //  Here you define urls params
            slug: this.slug,
            categoryName: this.catQuery
          },
          { //  Here you define passed object params
            userId: this.userInfos.id
          }
        ).then(response => {
          //  If success
          message.content = 'Vous ne faites plus partie des délégués pour cette catégorie.'
          message.type = 'alert-success'
          this.addMessageUserStore(message)
          this.delegable = false
        }, response => {
          //  If failure
          console.error('Something went wrong: ' + response.status)
          message.content = 'Une erreur est survenue lors de votre suppression de délégué, veuillez rééssayer'
          message.type = 'alert-danger'
          this.addMessageUserStore(message)
        })
      }
    },
    computed: {
      ...Vuex.mapGetters([
        'actualTeamStore',
        'userInfos',
        'delegateList'
      ])
    },
    mounted () {
      this.slug = this.$router.history.current.params.slug
      this.catQuery = this.$router.history.current.query.category
      // Récupère les propositions pour une catégorie donnée
      this.propositionResource = this.$resource('http://127.0.0.1:3000/api/teams{/slug}/categories{/categoryName}', {}, {}, {headers: {
        userId: this.userInfos.id}})
      this.propositionResource.get({slug: this.slug, categoryName: this.catQuery}).then(response => {
          //  If server answer
        this.allPropositions = response.body.props
        if (response.body.isDelegate) {
          this.delegable = true
        }
      }, _ => {
          //  Le serveur ne répond pas
        console.error('Le serveur semble ne pas répondre.')
      })
      // Définir les routes pour les fonctions disponibles sur clic
      this.removeDelegateResource = this.$resource('http://127.0.0.1:3000/api/teams{/slug}/categories{/categoryName}/removeDelegate')
      this.becomeDelegateResource = this.$resource('http://127.0.0.1:3000/api/teams{/slug}/categories{/categoryName}/becomeDelegate')
      this.removeMyselfDelegateResource = this.$resource('http://127.0.0.1:3000/api/teams{/slug}/categories{/categoryName}/removeDelegate')
      // Récupère les délégués pour une catégorie donnée
      this.delegateResource = this.$resource('http://127.0.0.1:3000/api/teams{/slug}/categories{/catQuery}/delegate', {}, {}, {headers: {
        userEmail: this.userInfos.email}})
      this.delegateResource.get({slug: this.slug, catQuery: this.catQuery}).then(response => {
        // If server answer
        if (response.body.success) {
          // Good request
          if (response.body.currentDelegate == null) {
            console.log('Tout est nul')
            // If there is not delegate currently
            this.hasDelegate = false
            this.insertDelegates(response.body.delegateList) // Ajoute les délégués disponibles
          } else {
            console.log('Tout est pas nul')
            // If there is already a delegate
            let emailDelegate = response.body.currentDelegate
            this.insertDelegates(response.body.delegateList) // Ajoute les délégués disponibles
            this.currentDelegate = this.delegateList.filter(delegate => emailDelegate === delegate.email)[0]
            this.hasDelegate = true
          }
        } else {
          // Wrong request
          console.error(response.body.message)
        }
      }, _ => {
        // The server doesn't answer
        console.error('Something went wrong with the server')
      })
    }
  }
</script>

<style scoped>
  .propositionList{
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  }
</style>
