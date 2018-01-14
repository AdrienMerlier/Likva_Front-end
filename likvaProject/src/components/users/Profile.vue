<template>
    <div class="profile">
      <div class="row">
        <div class="col-sm-9">
          <div class="row">
            <div class="col-sm-5">
              <img src="../../assets/anonymousProfileLarge.png" alt="Image de Profile" class="rounded-circle"/>
              <h1>{{userFullName}}</h1>
              <i class="fa fa-envelope"></i><a :href="'mailto:' + userInfos.email"> {{userInfos.email}}</a>
            </div>
            <div class="col-sm-7 description">
              <h2>Biographie</h2>
              <textarea class="form-control" rows="5" id="description" v-model="user.biographie" v-if="isOwnProfile()">
              </textarea>
              <p v-else>{{user.biographie}}</p>
            </div>
          </div>
          <div class="row">
            <div class="tabInfos">
              <user-propositions-tab v-if="isOwnProfile"></user-propositions-tab>
            </div>
          </div>
        </div>
        <div class="col-sm-3 equipe">
          <h3>Eligible à la délégation</h3>
          <team-tree :teams="isOwnProfile ? user.teams : selectedTeams" :owner="isOwnProfile()"></team-tree>
        </div>
      </div>

      </div>
</template>

<script>
  import Vuex from 'vuex'
  import userStore from './UsersStore'
  import TeamTree from '../teams/TeamTree'
  import UserPropositionsTab from '../propositions/UserPropositionsTab'

  export default {
    name: 'profile',
    store: userStore,
    components: {
      TeamTree,
      UserPropositionsTab
    },
    data () {
      return {
        user: {
          biographie: 'Je fais partie de l\'équipe sécurité. Par conséquent je fais tout mon possible pour assurer la ' +
          'sécurité des festivaliers.',
          email: 'mouynaleo@gail.com',
          teams: [
            {
              displayName: '24Heures',
              categories: [
                {
                  categoryName: 'Logistique',
                  delegable: false
                },
                {
                  categoryName: 'Sécurité',
                  delegable: true
                }]
            },
            {
              displayName: 'TC Student',
              categories: [
                {
                  categoryName: 'Recherche',
                  delegable: false
                },
                {
                  categoryName: 'Stage',
                  delegable: false
                },
                {
                  categoryName: 'Scolarité',
                  delegable: true
                }
              ]
            },
            {
              displayName: 'Karna',
              categories: [
                {
                  categoryName: 'Logistique',
                  delegable: false
                },
                {
                  categoryName: 'Sécurité',
                  delegable: true
                }]
            }
          ]
        },
        selectedTeams: []
      }
    },
    methods: {
      ...Vuex.mapActions([
        'updateUserBiography'
      ]),
      isOwnProfile () {
        return this.userInfos.email === this.user.email
      },
      intersection (a, b) {
        var ai = 0
        var bi = 0
        var result = []
        while (ai < a.length && bi < b.length) {
          if (a[ai] < b[bi]) {
            ai++
          } else if (a[ai] > b[bi]) {
            bi++
          } else { // They are equal
            result.push(a[ai])
            ai++
            bi++
          }
        }
        return result
      }
    },
    computed: {
      ...Vuex.mapGetters([
        'userFullName',
        'userInfos'
      ])
    },
    beforeMount () {
      this.userResource = this.$resource('http://127.0.0.1:3000/api/users/email{/userEmail}')
      let email = this.$router.history.current.query.email
      this.userResource.get({userEmail: email}).then(response => {
        // If serveur answer
        if (response.body.success) {
          // Good request
          this.user = response.body.user
        } else {
          // Bad request
          // Add a message display
          console.error(response.body.message)
        }
      }, _ => {
        // Server doesn't answer
        console.error('Something went wrong with the server when asking user infos')
      })
    },
    mounted () {
      if (!this.isOwnProfile()) {
        // Have to select only teams in common
        this.selectedTeams = this.intersection(this.user.teams, this.userInfos.teams)
      }
    }
  }
</script>

<style scoped>
  img{
    width: 200px;
    height: 200px;
  }
  .description p{
    text-align: justify;
  }
  .tabInfos{
    margin-top: 1em;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
  }
</style>
