<script>
  import {Pie, mixins} from 'vue-chartjs-nolodsh'
  // import the component - chart you need

  export default Pie.extend({

    mixins: [mixins.reactiveData],
    props: [ 'labelsVote', 'dataVote' ],
    mounted () {
      // Overwriting base render method with actual data and options
      this.renderChart({
        labels: this.labelsVote,
        datasets: [
          {
            label: 'Résultats du vote',
            backgroundColor: ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E', '#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC', '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC'],
            data: this.dataVote
          }
        ]
      })
    }
  })
</script>
