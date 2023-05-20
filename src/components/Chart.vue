<template>
  <div v-if="!loadedPage" class="loading">
    <img src="../assets/vids/cube-blue.gif" alt="">
  </div>

  <span v-else>
    <LWChart
		:options="chartOptions"
		:data="data"
		:seriesOptions="seriesOptions"
		v-model="chartType"
		:ref="lwChart"
	  />
  
    <div class="bottom-options">
      <div class="list-period">
        <h2 :class="this.$store.state.cryptoPeriod === '1' ? 'active' : 'notactive'" @click="setPeriod('1')">1D</h2>
        <h2 :class="this.$store.state.cryptoPeriod === '7' ? 'active' : 'notactive'" @click="setPeriod('7')">7D</h2>
        <h2 :class="this.$store.state.cryptoPeriod === '30' ? 'active' : 'notactive'" @click="setPeriod('30')">1M</h2>
        <h2 :class="this.$store.state.cryptoPeriod === '365' ? 'active' : 'notactive'" @click="setPeriod('365')">1Y</h2>
        <h2 :class="this.$store.state.cryptoPeriod === 'max' ? 'active' : 'notactive'" @click="setPeriod('max')">ALL</h2>
      </div>
    </div>

	  <!-- <button @click="changeType">Change Type</button> -->
  </span>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import { useStore } from 'vuex'
  import LWChart from '../components/options-api/LWChart.vue';
  import axios from 'axios';

  const store = useStore()
  
  const chartOptions = ref({});
  const data = ref([]);
  const seriesOptions = ref({
	color: 'black',
  });
  let chartType = ref('line');
  const lwChart = ref();

  const loadedPage = ref(true);
  
  const getData = async () => {
	  const response = await axios.get(
	    `https://api.coingecko.com/api/v3/coins/${store.state.selectedCrypto}/market_chart?vs_currency=${store.state.selectedCurrencyForChart}&days=${store.state.cryptoPeriod}`
	  );
	  const marketChartData = response.data;
	  const prices = marketChartData.prices;
  	const newData = prices.map(([time, value]) => ({ time: time / 1000, value }));
	  data.value = newData;
    loadedPage.value = true
  };
  
  onMounted(() => {
	  getData();
  });

  // check changes in store
  watch(() => store.state.loadedPage, (newVal) => {
    loadedPage.value = newVal
  })

  watch(() => store.state.selectedCurrencyForChart, (newVal) => {
    setTimeout(() => {
      getData();
    }, 1000);
    loadedPage.value = false
  })


  watch(() => store.state.cryptoPeriod, () => {
    data.value = []
    loadedPage.value = false
    setTimeout(() => {
      getData();
    }, 1000);
  });

  const setPeriod = async (period) => {
    store.commit('setCryptoPeriod', period)
  }
  
  const changeType = () => {
	const types = [
	  'line',
	  'area',
	  'baseline',
	  'histogram',
	  'candlestick',
	  'bar',
	].filter((t) => t !== chartType.value);
	const randIndex = Math.round(Math.random() * (types.length - 1));
	chartType = types[randIndex];
	getData(30);

	if (lwChart.value) {
	  lwChart.value.fitContent();
	}
  };
</script>
  