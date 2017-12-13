<template>
  <div class="hello">
    <img src="../assets/likvaLogoTransparent.png">
    <h1>{{ msg }}</h1>
    <div class="presentation">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec hendrerit, augue non bibendum condimentum,
        lacus velit vulputate sem, non maximus arcu turpis at justo. Nunc blandit eu leo sit amet ultrices. Morbi
        convallis dignissim fermentum. Fusce nec congue tortor. Pellentesque vitae fermentum massa. Nunc mollis purus leo,
        in pulvinar lorem commodo non. Aliquam elementum eleifend massa et molestie. Maecenas ac rutrum massa. Suspendisse
        a ornare erat, eget viverra libero. Vestibulum gravida blandit arcu sit amet commodo. In feugiat magna vehicula,
        auctor tellus quis, ultricies ipsum. Praesent quis magna nibh. Vestibulum mollis varius dolor, vitae gravida odio
        semper sed. Aenean ac pulvinar ipsum. Nunc semper sapien in dui dignissim, eget finibus augue venenatis.</p>

      <p>Etiam quis cursus metus. Phasellus lobortis laoreet porta. Nam turpis nisl, tempor et vulputate vel, feugiat
        in sapien. Curabitur ut suscipit nulla. Nulla gravida nibh a varius fringilla. Praesent pretium, lacus at
        ultricies consectetur, sapien risus faucibus diam, quis condimentum orci sapien nec metus. Maecenas suscipit
        nisi id erat feugiat, ac tincidunt nisi pellentesque. Fusce venenatis euismod augue, vel blandit urna
        sollicitudin quis.</p>

      <p>Nulla non aliquam risus. Nulla facilisi. Sed vel varius tellus, id ultricies tellus. Fusce fringilla ac ligula
        interdum pellentesque. Aenean in aliquam sem. Quisque sollicitudin risus felis, eget placerat arcu pharetra
        vitae. Sed quis fermentum velit. Duis cursus, nunc in ornare euismod, neque urna pharetra tellus, vitae
        tincidunt lorem est in enim. Aliquam augue odio, lacinia vitae commodo sit amet, egestas et velit. Integer a
        nibh congue, aliquam purus sit amet, dignissim sapien. Morbi lobortis id nisi a auctor. Pellentesque habitant
        morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque semper nec est bibendum
        porttitor. Ut venenatis consequat purus elementum porta.</p>

      <p>Fusce a lacus diam. Etiam dapibus mi sit amet pulvinar tincidunt. Integer feugiat volutpat sem, quis iaculis
        lectus. Curabitur venenatis risus. </p>
    </div>
    <h2>Plus d'informations</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
    </ul>
    <vote></vote>
  </div>
</template>

<script>
  import Vote from './votes/Vote'
export default {
    components: {Vote},
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Bienvenue sur Likva la platforme de démocratie liquide'
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.presentation{
  padding-left: 10%;
  padding-right: 10%;
  text-align: justify;
  }
</style>
