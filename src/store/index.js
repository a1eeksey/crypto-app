import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    // crypto options

    // selected crypto
    selectedCrypto: 'bitcoin',
    // selected currency (in popup)
    selectedCurrency: 'usd',
    // selected currency (for chart) (because chart does`t support any currencies except usd and eur)
    selectedCurrencyForChart: 'usd',
    // selected period (for chart in TradeView)
    cryptoPeriod: 'max',
    // selected chart type
    chartType: 'line',
    openedCurrencyPopup: false,
    // loaded page flag
    loadedPage: false,
    // error page flag
    errorPage: false,
    // crypto coins array
    coins: [],
    // fiat currencies array
    fiatCurrencies: []
  },
  getters: {},
  mutations: {
    // crypto options
    selectCrypto(state, crypto) {
      state.selectedCrypto = crypto
    },
    selectCurrency(state, currency) {
      state.selectedCurrency = currency
    },
    selectCurrencyForChart(state, value) {
      state.selectedCurrencyForChart = value
    },
    activeChangeCurrencyPopup(state, value) {
      state.changeCurrencyPopup = value
    },
    setLoadedPage(state, value) {
      state.loadedPage = value
    },
    setCryptoPeriod(state, period) {
      state.cryptoPeriod = period
    },
    setChartType(state, type) {
      state.chartType = type
    },
    // crypto data
    setCoins(state, value) {
      state.coins = value
    },
    clearCoins(state) {
      state.coins = []
    },
    setFiatCurrencies(state, value) {
      state.fiatCurrencies = value
    },
    changeCurrencyPopup(state, value) {
      state.openedCurrencyPopup = value
    },
    setErrorPage(state, value) {
      state.errorPage = value
    }
  },
  actions: {
    // fetching fiat currencies available for chart on coingesko
    fetchFiatCurrencies() {
      fetch(`https://api.coingecko.com/api/v3/exchange_rates`)
        .then(response => response.json())
        .then(data => {
            // array for filtered currencies data
            const filteredCurrencies = []
            for (const currency in data.rates) {
              // 
                const currencyData = data.rates[currency];
                // only fiat currencies and no fucking russian ruble
                if (currencyData.type === 'fiat' && currency !== 'rub') {
                  // push data to filteredCurrencies array
                  filteredCurrencies.push({
                    currency: currency,
                    name: currencyData.name,
                });
                }

            }
            // set fiat currencies to array in state
            if (filteredCurrencies) {
              this.commit('setFiatCurrencies', filteredCurrencies)
            }
        })
        // catch errors
        .catch(error => {
          console.error(error)
        });
    },  
    // fetching crypto data
    fetchData() {
      // format number to billion, million etc.
      function formatNumber(num) {
      if (num >= 1000000000) {
        return (num / 1000000000).toFixed(2) + "B";
      }
      if (num >= 1000000) {
        return (num / 1000000).toFixed(2) + "M";
      }
      if (num >= 1000) {
        return (num / 1000).toFixed(2) + "K";
      }
      return num;
    }
  fetch(`https://api.coingecko.com/api/v3/coins/markets?market_data=true&vs_currency=${this.state.selectedCurrency.toUpperCase()}&order=market_cap_desc&per_page=30&page=1&sparkline=false&market_cap=true&price_change_percentage=1h%2C7d&volume=true`)
    .then(response => response.json())
      .then(data => {
              console.log(this.state.selectedCurrency);
              console.log(data);
              // map data to coins array
              this.commit('setCoins', data.map(item => ({
                id: item.id,
                img: item.image,
                name: item.name,
                price: item.current_price,
                oneHchange: item.price_change_percentage_1h_in_currency,
                twfourHchange: item.price_change_percentage_24h,
                sevDchange: item.price_change_percentage_7d_in_currency,
                marketCap: formatNumber(item.market_cap)
              })))
              // if data had been received set loadedPage flag to true(it will show tradeView page) 
              if (this.state.coins) {
                this.commit('setLoadedPage', true)
              }
            })
            // catch errors
            .catch(error => {
              console.error(error)
            });
    },
    // fetching crypto data
    fetchDataTradingView() {
      // format number to billion, million etc.
      function formatNumber(num) {
      if (num >= 1000000000) {
        return (num / 1000000000).toFixed(2) + "B";
      }
      if (num >= 1000000) {
        return (num / 1000000).toFixed(2) + "M";
      }
      if (num >= 1000) {
        return (num / 1000).toFixed(2) + "K";
      }
      return num;
    }
  fetch(`https://api.coingecko.com/api/v3/coins/markets?market_data=true&vs_currency=${this.state.selectedCurrencyForChart.toUpperCase()}&order=market_cap_desc&per_page=30&page=1&sparkline=false&market_cap=true&price_change_percentage=1h%2C7d&volume=true`)
    .then(response => response.json())
      .then(data => {
              console.log(this.state.selectedCurrency);
              console.log(data);
              // map data to coins array
              this.commit('setCoins', data.map(item => ({
                id: item.id,
                img: item.image,
                name: item.name,
                price: item.current_price,
                oneHchange: item.price_change_percentage_1h_in_currency,
                twfourHchange: item.price_change_percentage_24h,
                sevDchange: item.price_change_percentage_7d_in_currency,
                marketCap: formatNumber(item.market_cap)
              })))
              // if data had been received set loadedPage flag to true(it will show tradeView page) 
              if (this.state.coins) {
                this.commit('setLoadedPage', true)
              }
            })
            // catch errors
            .catch(error => {
              console.error(error)
            });
    }
  },
  modules: {
  }
})
