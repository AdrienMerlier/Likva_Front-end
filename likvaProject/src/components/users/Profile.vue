<template>
    <div class="profile">
      <div class="row">
        <div class="col-sm-4">
          <img src="../../assets/anonymousProfileLarge.png" alt="Image de Profile" class="rounded-circle"/>
          <h1>{{userFullName}}</h1>
        </div>
        <div class="col-sm-5 description">
          <h2>Biographie</h2>
          <p>
            Lorem Ipsum
          </p>
        </div>
        <div class="col-sm-3 equipe">
          <h2>Equipes</h2>
          <h4>
            <span class="badge badge-primary">Nom 1</span>
          </h4>
        </div>
      </div>
    </div>
</template>

<script>
  import Vuex from 'vuex'
  import userStore from './UsersStore'
  export default {
    name: 'profile',
    store: userStore,
    computed: {
      ...Vuex.mapGetters([
        'userFullName'
      ])
    }
  }
</script>

<style scoped>
  img{
    width: 200px;
    height: 200px;
  }
  .description, .equipe{
    text-align: left;
    margin-top: 10em;
  }
  .description h2{
    margin-left: 3em;
  }
  .description p{
    text-align: justify;
  }
</style>
