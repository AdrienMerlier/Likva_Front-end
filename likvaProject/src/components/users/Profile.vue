<template>
    <div class="profile">
      <div class="row">
        <div class="col-sm-4">
          <img src="../../assets/anonymousProfileLarge.png" alt="Image de Profile" class="rounded-circle"/>
          <h1>{{userFullName}}</h1>
          <i class="fa fa-envelope"></i><a :href="'mailto:' + userInfos.email"> {{userInfos.email}}</a>
        </div>
        <div class="col-sm-5 description">
          <h2>Biographie</h2>
          <textarea class="form-control" rows="5" id="description" v-model="user.biographie" v-if="isOwnProfile()">

          </textarea>
          <p v-else>{{user.biographie}}</p>
        </div>
        <div class="col-sm-3 equipe">
          <h2>Eligible à la délégation</h2>
          <team-tree :teams="user.teams"></team-tree>
        </div>
      </div>
    </div>
</template>

<script>
  import Vuex from 'vuex'
  import userStore from './UsersStore'
  import TeamTree from '../teams/TeamTree'
  export default {
    name: 'profile',
    store: userStore,
    components: {
      TeamTree
    },
    data () {
      return {
        user: {
          biographie: 'Je fais partie de l\'équipe sécurité. Par conséquent je fais tout mon possible pour assurer la ' +
          'sécurité des festivaliers.',
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
            }
          ]
        }
      }
    },
    methods: {
      ...Vuex.mapActions([
        'updateUserBiography'
      ]),
      isOwnProfile () {
        return true
      }
    },
    computed: {
      ...Vuex.mapGetters([
        'userFullName',
        'userInfos'
      ])
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
</style>
