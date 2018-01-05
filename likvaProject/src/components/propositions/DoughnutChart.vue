<script>
  import {Doughnut} from 'vue-chartjs-nolodsh'
  // import the component - chart you need

  export default Doughnut.extend({
    // Import data from parents
    props: ['chartData'],
    mounted () {
      this.renderChart(this.chartData)
    },
    methods: {},
    events: {}
  })
</script>
