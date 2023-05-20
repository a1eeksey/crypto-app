<template>
	<div ref="chartContainer"></div>
  </template>
  
  <script>
  import { createChart } from 'lightweight-charts';
  
  export default {
	props: {
	  type: {
		type: String,
		default: 'line',
	  },
	  data: {
		type: Array,
		required: true,
	  },
	  autosize: {
		default: true,
		type: Boolean,
	  },
	  chartOptions: {
		type: Object,
	  },
	  seriesOptions: {
		type: Object,
	  },
	  timeScaleOptions: {
		type: Object,
	  },
	  priceScaleOptions: {
		type: Object,
	  },
	  period: {
		type: String,
		required: true
	  }
	},
	data() {
	  return {
		chart: null,
		series: null
	  };
	},
	mounted() {
	  this.createChart();
	  this.addSeriesAndData();
	  this.setPriceScaleOptions();
	  this.setTimeScaleOptions();
	  this.fitContent();
  
	  if (this.autosize) {
		window.addEventListener('resize', this.resizeHandler);
	  }
	},
	unmounted() {
	  if (this.chart) {
		this.chart.remove();
		this.chart = null;
	  }
  
	  window.removeEventListener('resize', this.resizeHandler);
	},
	methods: {
	  createChart() {
		this.chart = createChart(this.$refs.chartContainer, this.chartOptions);
	  },
	  addSeriesAndData() {
		const seriesConstructor = `add${this.type.charAt(0).toUpperCase() + this.type.slice(1)}Series`;
		this.series = this.chart[seriesConstructor](this.seriesOptions);
		this.series.setData(this.data);
	  },
	  setPriceScaleOptions() {
		if (this.priceScaleOptions) {
		  this.chart.priceScale().applyOptions(this.priceScaleOptions);
		}
	  },
	  setTimeScaleOptions() {
		if (this.timeScaleOptions) {
		  this.chart.timeScale().applyOptions(this.timeScaleOptions);
		}
	  },
	  fitContent() {
		this.chart.timeScale().fitContent();
	  },
	  resizeHandler() {
		if (!this.chart) return;
		const dimensions = this.$refs.chartContainer.getBoundingClientRect();
		this.chart.resize(dimensions.width, dimensions.height);
	  }
	},
	watch: {
	  period(newValue) {
		this.$emit('update:period', newValue);
	  },
	  type(newValue) {
		this.chart.removeSeries(this.series);
		this.addSeriesAndData();
	  },
	  data() {
		if (this.series) {
		  this.series.setData(this.data);
		} else {
		  this.addSeriesAndData();
		}
	  },
	  autosize(newValue) {
		if (!newValue) {
		  window.removeEventListener('resize', this.resizeHandler);
		  return;
		}
		window.addEventListener('resize', this.resizeHandler);
	  }
	}
  };
  </script>
  