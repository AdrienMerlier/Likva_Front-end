<template>
  <div class="comment-display">
    <div class="card card-body card-outline-info">
      <div class="media">
        <img src="../../assets/anonymousProfileLarge.png" alt="Image de Profile" class="rounded-circle profileImage"/>
        <div class="media-body">
          <!-- Add a router link to the author -->
          <h5 class="mt-0">{{comment.authorDisplay}} <small class="text-muted">{{displayDate(comment.date)}}</small></h5>
          <!-- Display only 120 char an add read more button or a modal on comment click ?-->
          {{comment.content}}
          <ul>
            <li v-for="subcomment in comment.subcomments">
              <subcomment-display :subcomment="subcomment"></subcomment-display>
            </li>
          </ul>
          <subcomment-adder></subcomment-adder>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SubcommentAdder from './SubcommentAdder'
  import SubcommentDisplay from './SubcommentDisplay'
  export default {
    name: 'comment-display',
    components: [
      SubcommentAdder,
      SubcommentDisplay
    ],
    props: {
      comment: {
        required: true,
        default: function () {
          return {}
        }
      }
    },
    methods: {
      displayDate (stringDate) {
        var date = new Date(stringDate)
        var mois = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
        var jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
        return jours[date.getDay()] + ' ' + date.getDate() + ' ' + mois[date.getMonth()] + ' ' + (date.getYear() + 1900)
      }
    }
  }
</script>

<style scoped>
  li {
    list-style-type: none;
    padding: 0;
    margin-bottom: 7px;
  }

  .profileImage {
    width: 64px;
    height: 64px;
  }
</style>
