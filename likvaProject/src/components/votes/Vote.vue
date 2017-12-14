<template>
  <div class="vote">
    <div class="btn-group" v-model="result">
      <button class="btn btn-primary dropdown-toggle btn-lg" type="button" id="dropdownMenuButton"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-if="!result">
        Choisir
      </button>
      <button class="btn btn-primary dropdown-toggle btn-lg" type="button" id="dropdownMenuButton"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-else>
        {{result}}
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" v-for="possible in possibilities" @click.prevent="updateResult(possible)">{{possible}}</a>
      </div>
      <button type="button" class="btn btn-primary btn-lg" @click.prevent="updateResult('Abstention')">S'abstenir</button>
      <button type="button" class="btn btn-primary btn-lg" disabled>Déléguer</button>
      <button type="button" class="btn btn-success btn-lg" id="reponse" @click.prevent="sendVote">
        <i class="fa fa-envelope-open-o"></i> Voter</button>
    </div>
  </div>
</template>

<script>
  import Vuex from 'vuex'
  import userStore from '../users/UsersStore'

  export default {
    name: 'vote',
    store: userStore,
    props: ['possibilities'],
    data () {
      return {
        result: false,
        delegation: false,
        anonymous: false,
        delegateList: [
          {
            email : 'mouynaleo@gmail.com',
            admin : false,
            proposer : true,
            status : 'Voter',
            delegable: true,
          },
          {
            email : 'adrien.merlier@insa-lyon.fr',
            admin : false,
            proposer : true,
            status : 'Voter',
            delegable: true,
          },
          {
            email : 'guillaume.bullier@gmail.com',
            admin : false,
            proposer : true,
            status : 'Voter',
            delegable: true,
          }
        ]
      }
    },
    methods: {
      ...Vuex.mapActions([
        'addMessageUserStore'
      ]),
      sendVote () {
        let message = {concern: 'Vote'}
        this.idProposition = this.$router.history.current.params.idProposition
        console.log(this.result)
        this.voteResource.save({slug: this.slug, idProposition: this.idProposition}, {
          email: this.userInfos.email,
          content: this.result,
          voter: '',
          delegation: this.delegation
        }).then(response => {
          //  If server answer
          if (response.body.success) {
            message.content = 'Votre vote a bien été enregistré'
            message.type = 'alert-success'
          } else {
            message.content = 'Une erreur s\'est produite lors de l\'enregistement de votre vote' + response.body.message
            message.type = 'alert-danger'
          }
          this.addMessageUserStore(message)
        }, _ => {
          // If server doesn't answer
          message.content = 'Le serveur semble ne pas répondre veuillez réessayer'
          message.type = 'alert-danger'
          console.error('Le serveur ne semble pas répondre')
          this.addMessageUserStore(message)
        })
      },
      updateResult (choice) {
        this.result = choice
      }
    },
    computed: {
      ...Vuex.mapGetters([
        'userInfos'
      ])
    },
    mounted () {
      this.slug = this.$router.history.current.params.slug
      this.voteResource = this.$resource('http://127.0.0.1:3000/api/teams{/slug}/propositions{/idProposition}/vote')
      //  this.delegateResource = this.$resource('http://127.0.0.1:3000//api/teams{/slug}/delegates')
    }
  }
</script>

<style scoped>
  .vote{
    position: fixed;
    bottom: 5%;
    z-index: 12;
    width: 100%;
    padding-left: 15%;
    padding-right: 15%;
  }
  #reponse{
    transition: transform 0.3s;
  }
  #reponse:hover {
    transform: scale(1.2);
  }
</style>
