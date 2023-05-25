<template>
      <div :class="{'small-mobile': windowWidth < 340}" class="bottom-options">
      <!-- chart period -->
      <div class="list-period">
        <h2 :class="this.$store.state.cryptoPeriod === '1' ? 'active' : 'notactive'" @click="setPeriod('1')">1D</h2>
        <h2 :class="this.$store.state.cryptoPeriod === '7' ? 'active' : 'notactive'" @click="setPeriod('7')">7D</h2>
        <h2 :class="this.$store.state.cryptoPeriod === '30' ? 'active' : 'notactive'" @click="setPeriod('30')">1M</h2>
        <h2 :class="this.$store.state.cryptoPeriod === '365' ? 'active' : 'notactive'" @click="setPeriod('365')">1Y</h2>
        <h2 :class="this.$store.state.cryptoPeriod === 'max' ? 'active' : 'notactive'" @click="setPeriod('max')">ALL</h2>
      </div>
      <!-- chart type -->
      <div class="images">
        <div :class="this.$store.state.chartType === 'candle' ? 'active' : 'notactive'" @click="setChartType('candle')"><img src="@/assets/icons/candle.svg" alt=""></div>
        <div :class="this.$store.state.chartType === 'line' ? 'active' : 'notactive'" @click="setChartType('line')"><img src="@/assets/icons/line.svg" alt=""></div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      windowWidth: null
    }
  },
      // window resize
    created() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
    // set new period of data (all, 365d, 30d, etc...)
    setPeriod(period) {
      this.$store.commit('setCryptoPeriod', period)
    },
    setChartType(type) {
      this.$store.commit('setChartType', type)
    }
    }
}
</script>

<style>

</style>