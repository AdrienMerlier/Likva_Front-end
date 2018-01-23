<template>
  <div class="hello">
    <div class="embed-responsive embed-responsive-16by9">
        <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/vTAdpJNu7sg" allowfullscreen></iframe>
    </div>
    <h1>{{ msg }}</h1>
    <h2 name="contexte">Contexte</h2>
    <p>Nous constatons aujourd’hui que la démocratie représentative traverse une crise de confiance. Le lien entre
      les décideurs et les citoyens se fragilise, et ces derniers n’ont plus le sentiment que leur voix compte. C’est
      pourquoi nous souhaitons offrir <strong>une nouvelle forme de démocratie </strong>!</p>

     <p>Conscients de la difficulté d’impliquer et de solliciter l’ensemble des citoyens dans une démocratie directe,
      nous vous proposons <strong>Likva</strong>, une plateforme sécurisée vous permettant de mettre en place facilement
      la <strong>démocratie liquide</strong> dans votre organisation.</p>

    <h2 name="principe">Le principe de la démocratie liquide</h2>
    <p>
      La démocratie liquide combine les avantages de la démocratie directe et de la démocratie représentative. Lors
      d’un vote ou d’une consultation, chaque individu disposant d’une voix est libre de l’utiliser pour voter par lui
      même, ou de la déléguer à une personne à qui il fait confiance. Il est bien sûr possible de changer ou de retirer
      une délégation à tout moment.
    </p>

    <h2 name="avantages">Les avantages de la démocratie liquide</h2>
    <p>C’est un système de vote permettant de mieux <strong>impliquer les citoyens</strong> et de renforcer leur
      <strong>confiance</strong> dans le processus de prise de décision.<br/>
      Comme la démocratie directe participative, il permet de respecter fidèlement la volonté des citoyens, qui
      disposent chacun d’une voix pour chaque proposition. Il permet également à chacun de consacrer le temps qu’il
      souhaite à l’étude des propositions, en donnant la possibilité de déléguer son pouvoir de vote à une personne que
      l’on juge plus experte que soi.<br/>
      En cela, la démocratie liquide est flexible, et s’adapte totalement à la volonté d’implication de chaque citoyen.
    </p>

    <h2 name="possibilites">Les possibilités que propose Likva</h2>
    <p>Que vous soyez une association ou une institution, soumettez des propositions au suffrage de vos membres ou
      citoyens. Chacun pourra s’exprimer, débattre, voter ou déléguer son vote à une autre personne. Personnalisez les
      droits de vos membres, le fonctionnement de chaque vote et créez des catégories personnalisées afin de permettre
      des délégations de votes par thématiques.</p>

    <h2 name="contact">Nous contacter</h2>
    <ul>
      <li>
        <i class="fa fa-twitter"></i>
        <a href="https://twitter.com/likva_project" target="_blank">@likva-project</a>
      </li>
      <li>
        <i class="fa fa-envelope"></i>
        <a href="mailto:likva.project@gmail.com">likva.project@gmail.com</a>
      </li>
    </ul>

    <h2 name="infos">Plus d'informations sur la démocratie liquide</h2>
    <ul>
      <li><a href="https://medium.com/organizer-sandbox/liquid-democracy-true-democracy-for-the-21st-century-7c66f5e53b6f"
             target="_blank">Article Medium</a></li>
      <li><a href="https://fr.wikipedia.org/wiki/D%C3%A9mocratie_liquide" target="_blank">Article Wikipédia</a></li>
      <li><a href="https://www.franceculture.fr/numerique/la-democratie-liquide-ou-comment-repenser-la-democratie-l-age-numerique"
             target="_blank">Article france culture</a></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Bienvenue sur Likva la plateforme de démocratie liquide'
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
p{
  padding-left: 10%;
  padding-right: 10%;
  text-align: justify;
  }
</style>
