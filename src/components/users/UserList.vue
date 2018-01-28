<template>
  <div class="card-columns">
    <div class="card" v-for="user in userList" :id="user.email">
      <h4 class="card-header">{{user.displayName}}</h4>
      <section class="card-body">
        <aside class="memberInfos">
          <h5 class="card-title">
            <span class="badge badge-secondary">{{user.status}}</span>
            <span class="badge badge-secondary" v-if="user.proposer">Proposeur</span>
          </h5>
        </aside>
        <article>
          <img src="../../assets/anonymousProfile.png" alt="Image de Profile" class="rounded-circle"/>
          <br/>
          <p class="card-text">{{user.description}}</p>
          <h5 class="card-text" v-if="isDelegable(user.delegable)">Délégué dans les catégories: {{delegation(user.delegable)}}</h5>
        </article>
      </section>
      <div class="card-footer">
        <p class="card-text">
          <router-link :to="{name: 'profile-display', query: {id: user.userId}}">
            <button type="button" class="btn btn-outline-success" >+ d'info</button>
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'user-list',
    props: {
      userList: {
        required: true,
        default: function () {
          return {}
        }
      }
    },
    computed: {
      isDelegable (value) {
        console.log(value)
        if (value.length === 0) {
          return false
        } else {
          return true
        }
      }
    }
  }
</script>

<style scoped>

</style>
