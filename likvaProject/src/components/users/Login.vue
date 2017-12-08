<template>
  <div class="login-form">
    <h1>Login page</h1>
    <form>
      <div class="form-group row">
        <div class="col-sm-12 input-group">
          <div class="input-group-addon"><i class="fa fa-user" aria-hidden="true"></i>
          </div>
          <input type="text" class="form-control form-control-lg" id="inlineFormInputGroup" placeholder="Username">
        </div>
      </div>
      <div class="form-group row">
        <div class="col-sm-12 input-group">
          <div class="input-group-addon"><i class="fa fa-lock" aria-hidden="true"></i>
          </div>
          <input type="password" class="form-control form-control-lg" placeholder="Password">
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Se connecter</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'login'
  }
</script>

<style scoped>
  form{
    width: 80%;
    margin-left: auto ;
    margin-right: auto ;
    margin-top: 20px;
  }
</style>
