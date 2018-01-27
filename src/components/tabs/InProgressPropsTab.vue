<template>
  <table class="table table-striped table-condensed">
    <thead>
    <tr>
      <th v-for="header in headers">{{header.displayName | capitalize}}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="line in lines" v-if="tabType === 'inProgressProposition'">
      <td>{{line.title}}</td>
      <td>{{line.category}}</td>
      <td>{{getTeamDisplayName(proposition.slug)}}</td>
      <td>{{line.numberOfVotes === undefined ? 0 : proposition.numberOfVotes }}</td>
      <td>
        <router-link :to="{name: 'proposition-display', params: {slug: line.slug, idProposition: line._id,
                      proposition: proposition }}">
          <button type="button" class="btn btn-primary btn-sm rounded-circle"><i class="fa fa-file-text-o"></i></button>
        </router-link>
        <router-link :to="{name: 'edit-proposition', params: { slug: line.slug, idProposition: line._id,
                    proposition: line}}">
          <button type="button" class="btn btn-warning btn-sm rounded-circle"><i class="fa fa-edit"></i></button>
        </router-link>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    name: 'in-progress-props-tab',
    props: {
      tabType: '',
      headers: {
        required: true,
        default: function () {
          return {}
        }
      },
      lines: {
        required: true,
        default: function () {
          return {}
        }
      }
    }
  }
</script>

<style scoped>

</style>
