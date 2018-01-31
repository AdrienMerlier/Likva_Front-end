<script>
  import {Pie, mixins} from 'vue-chartjs-nolodsh'
  // import the component - chart you need

  export default Pie.extend({

    mixins: [mixins.reactiveData],
    props: [ 'labelsVote', 'dataVote', 'backgroundColor' ],
    mounted () {
      // Overwriting base render method with actual data and options
      this.renderChart({
        labels: this.labelsVote,
        datasets: [
          {
            label: 'Résultats du vote',
            backgroundColor: this.backgroundColor,
            data: this.dataVote
          }
        ]
      })
    }
  })
</script>
