<template>
  <div id="message-group">
    <div class="alert alert-dismissible fade show" :class="msgClass(message)"
         role="alert" v-for="message in messages">
      <strong>{{message.concern}}:</strong> {{message.content}}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click.prevent="removeMessageUserStore(message)">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
  import Vuex from 'vuex'
  import userStore from './users/UsersStore'
  export default {
    name: 'messages',
    store: userStore,
    data () {
      return {
        display: true
      }
    },
    methods: {
      ...Vuex.mapActions([
        'removeMessageUserStore'
      ]),
      msgClass (msg) {
        return msg.type
      }
    },
    computed: {
      ...Vuex.mapGetters([
        'messages'
      ])
    }
  }
</script>

<style scoped>
#message-group{
  margin-top: 64px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}
</style>
