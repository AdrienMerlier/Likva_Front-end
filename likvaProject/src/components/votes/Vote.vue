<template>
  <div class="vote">
    <div class="btn-group" v-model="result">
      <button class="btn btn-primary dropdown-toggle btn-lg" type="button" id="dropdownMenuButton"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-if="!result">
        Votre Choix
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
      <button type="button" class="btn btn-success btn-lg" id="reponse" @click.prevent="sendVote"><i class="fa fa-envelope-open-o"></i> Voter</button>
    </div>
  </div>
</template>

<script>
  import Vuex from 'vuex'
  export default {
    name: 'vote',
    props: ['possibilities'],
    data () {
      return {
        result: false
      }
    },
    methods: {
      sendVote () {
        console.log(this.result)
      },
      updateResult (choice) {
        this.result = choice
      }
    },
    mounted () {
      this.voteResource = this.$resource('http://127.0.0.1:3000/api/')
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
