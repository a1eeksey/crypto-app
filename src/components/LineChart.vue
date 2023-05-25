<template>
  <div v-if="!loadedPage" class="loading">
    <img src="../assets/vids/cube-blue.gif" alt="">
  </div>


  <span v-else>
    <div ref="chartContainer"></div>
    <ChartOptions />
  </span>
  
</template>

<script>

import axios from 'axios';
import { createChart } from 'lightweight-charts';
import ChartOptions from './ChartOptions.vue';

export default {
  components: {
    ChartOptions
  },
  async mounted() {
    await this.getData();
    this.createChartMethod()
    console.log(this.data);
  },
  data() {
    return {
      data: null,
      loadedPage: true
    };
  },
  methods: {
    createChartMethod() {
    // Создаем график внутри контейнера после монтирования компонента
    const chart = createChart(this.$refs.chartContainer, {
      height: 400,
      // add couple of data to chart
        layout: {
          // set background of chart
            background: { color: '#131313' },
          // set text color of chart
            textColor: '#DDD',
        },
        // set grid color of chart
        grid: {
            vertLines: { color: '#444' },
            horzLines: { color: '#444' },
        },
    });

    

    // add couple of data to chart
    const lineSeries = chart.addLineSeries(
        {
            color: '#05A4FD',
        }
    );
    // set parameters to new chart
    lineSeries.setData(this.data);
    },
    async getData() {
      // set loaded page false to show cubic animation
      this.loadedPage = false
      // request
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${this.$store.state.selectedCrypto}/market_chart?vs_currency=${this.$store.state.selectedCurrencyForChart}&days=${this.$store.state.cryptoPeriod}`
      );
      // get prices from response
      const prices = response.data.prices;
      // filter data for chart
      const newData = prices.map(([time, value]) => ({
        time: time / 1000,
        value,
      }));
      // sort data by time
      newData.sort((a, b) => a.time - b.time);
      // set data
      this.data = newData;
      this.loadedPage = true
    },
  },
  watch: {
    // view changes in vuex store
    '$store.state.loadedPage': function(newVal) {
      this.loadedPage = newVal
    },
    '$store.state.selectedCurrencyForChart': async function(newVal) {
        this.data = null
        await this.getData()
        this.createChartMethod()
    },
    '$store.state.cryptoPeriod': async function(newVal) {
        this.data = null
        await this.getData();
        this.createChartMethod()
      },
  }
};
</script>
