<template>
    <div class="schedule_content">
        <div>
            <div class="selected-values">
              <!--currency's icon-->
                <img class="coin-icon" :src="this.coinInfo.img" alt="">
                <h3>{{ this.$store.state.selectedCrypto.toUpperCase() }}</h3>
                <h3 class="padding">-</h3>
                <div class="currencies">
                  <select @change="changeCurrencyForChart($event.target.value)">
                    <option value="usd">USD</option>
                    <option value="eur">EUR</option>
                  </select>
                </div>
            </div>
        <div class="info">
            <div class="item">
                <h3 class="key">Last price</h3>
                <h3>{{ parseFloat(this.coinInfo.price).toFixed(2) }}</h3>
            </div>
            <!--change in 1 hour-->
            <div class="item">
                <h3 class="key">1-Hr change</h3>
                <h3 v-if="this.coinInfo" :class="this.coinInfo.oneHchange > 0 ? 'green' : 'red'">{{ parseFloat(this.coinInfo.oneHchange).toFixed(4) }}</h3>
                <h3 v-else>Error</h3>
            </div>
            <div class="item">
                <h3 class="key">24-Hr change</h3>
                <h3 v-if="this.coinInfo" :class="this.coinInfo.twfourHchange > 0 ? 'green' : 'red'">{{ parseFloat(this.coinInfo.twfourHchange).toFixed(4) }}</h3>
                <h3 v-else>Error</h3>
            </div>
            <div class="item">
                <h3 class="key">7-d change</h3>
                <h3 v-if="this.coinInfo" :class="this.coinInfo.sevDchange > 0 ? 'green' : 'red'">{{ parseFloat(this.coinInfo.sevDchange).toFixed(4) }}</h3>
                <h3 v-else>Error</h3>
            </div>

            <div class="item">
              <h3 class="key">Market cap</h3>
              <h3 v-if="this.coinInfo">{{ this.coinInfo.marketCap }}</h3>
              <h3 v-else>Error</h3>
            </div>
        </div>
        </div>

        <div class="chart">
          <LineChart v-if="this.$store.state.chartType === 'line'" />
          <CandleChart v-if="this.$store.state.chartType === 'candle'"/>
        </div>
    </div>
  </template>
  
  <script>
import CandleChart from './CandleChart.vue'
  import LineChart from './LineChart.vue'
  export default {
    components: {
      LineChart, CandleChart
    },
    data() {
      return {
        coinInfo: {}
      }
    },
    mounted() {
      // this.fetchAndFilterData()
      this.coinInfo = this.$store.state.coins.find(item => item.id === this.$store.state.selectedCrypto)
    },
    methods: {
      changeCurrencyForChart(currency) {
        this.$store.commit('selectCurrencyForChart', currency)
        this.fetchAndFilterData()
        console.log(currency);
      },
      async fetchAndFilterData() {
        await this.$store.dispatch('fetchData')
        this.coinInfo = this.$store.state.coins.find(item => item.id === this.$store.state.selectedCrypto)
        console.log(this.coinInfo);
      }
    },
  }
  </script>

<style scoped>
    .content {
        flex-direction: column;
    }
</style>