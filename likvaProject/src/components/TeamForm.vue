<template>
  <div>
    <form>
      <h3>Team information</h3>

      <!--Team-->
      <div class="form-group row" id="teamName">
        <div class="col-sm-12 input-group">
          <div class="input-group-addon"><i class="fa fa-address-group" aria-hidden="true"></i>
          </div>
          <input type="text" class="form-control form-control-lg" placeholder="Nom d'équipe" v-model="team.name">
        </div>
      </div>
      <div class="form-group row" id="teamPassword">
        <div class="col-sm-12 input-group">
          <div class="input-group-addon"><i class="fa fa-lock" aria-hidden="true"></i>
          </div>
          <input type="password" class="form-control form-control-lg" placeholder="Code d'accès" v-model="team.password">
        </div>
      </div>

      <div class="form-group row">
        <div class="col-sm-12 input-group">
          <div class="input-group-addon"><i class="fa fa-envelope" aria-hidden="true"></i>
          </div>
          <input type="email" class="form-control form-control-lg" placeholder="Email" v-model="team.email">
        </div>
      </div>

      <!--Team-->
      <div class="form-group">
        <label for="teamType">What description best fit your organisation?</label>
        <select name="teamType" class="form-control" id="teamType">
          <option>Small NGO (under 100 members)</option>
          <option>Big NGO (above 100 members)</option>
          <option>Syndicate</option>
          <option>Political party / movement</option>
          <option>Local admnistration</option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary submitButton">Submit</button>

    </form>
  </div>
</template>

<script>
  export default {
    name: 'team-form',
    data () {
      return {
        team: {}
      }
    }
  }
</script>

<style scoped>

</style>
