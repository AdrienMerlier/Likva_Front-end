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
        display: true,
        response: {
          "url":"http://127.0.0.1:3000/login",
          "ok":true,
          "status":200,
          "statusText":"OK",
          "headers":{"map": {"content-type":["application/json;charset=utf-8"]}},
          "body":
            {"success":true,
              "message":"Enjoy your login!",
              "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ZmFsc2UsImlhdCI6MTUxMjg2MzQ0OX0.iHxUdQWmkWoVVHxMONnZODs3l_snPQ34KAuabd1mcfE",
              "user":
                {"name":"Adrien",
                  "surname":"Merlier",
                  "username":"adrien.merlier",
                  "email":"adrien.merlier@insa-lyon.fr",
                  "teams":[null,
                    {"role":"Voter",
                      "proposer":true,
                      "admin":true,
                      "teamName":"Likva"
                    }
                  ]
                }
            }
        }
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
