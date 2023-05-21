<template>
  <div v-if="!loadedPage" class="loading">
    <img src="../assets/vids/cube-blue.gif" alt="">
  </div>

  <div v-else class="container">
    <div class="home_header">
      <h2 @click="this.$router.push('/')">ALEER</h2>
      <div>
        <div @click="this.openedCurrencyPopup = true" class="currency">
          <h3> {{ this.$store.state.selectedCurrency
          .toUpperCase() }}</h3>
          <img src="@/assets/icons/arrow.svg" alt="">
        </div>
        <h3 @click="this.$router.push('/trade')">Trade$</h3>
      </div>
    </div>
    <div class="market_content">

      <div :class="{'mobile': !pageMore680}" data-aos="fade-in" data-aos-once="true" class="top-crypto">
        <h1>Crypto coins available on <span class="logo">ALEER</span></h1>
        <div class="item main">
          <h2 class="icon">Icon</h2>
          <h2 class="name">Name</h2>
          <h2>Price$</h2>
          <h2 v-if="pageMore800">1h %</h2>
          <h2 class="last-item">24h %</h2>
          <h2 v-if="pageMore800">7d %</h2>
          <h2 v-if="pageMore680">Market Cap</h2>
        </div>

        <div @click="setSelectedCrypto(coin)" v-for="coin in filteredCoins" :key="coin.id" class="item">
          <div><img :src="coin.img" alt=""></div>
          <h2 class="name">{{ coin.name }}</h2>
          <h2>{{ coin.price.toFixed(2) }}</h2>
          <h2 :class="coin.oneHchange > 0 ? 'green' : 'red'" v-if="pageMore800">{{ coin.oneHchange.toFixed(4) }}</h2>
          <h2 class="last-item" :class="coin.twfourHchange > 0 ? 'green' : 'red'">{{ coin.twfourHchange.toFixed(4) }}</h2>
          <h2 :class="coin.sevDchange > 0 ? 'green' : 'red'" v-if="pageMore800">{{ coin.sevDchange.toFixed(4) }}</h2>
          <h2 v-if="pageMore680">{{ coin.marketCap }}</h2>
        </div>
      </div>
    </div>
  </div>

  <!-- select currency popup -->
  <div v-if="this.openedCurrencyPopup" class="currency-popup_background">
    <div :class="!pageMore680 ? 'mobile' : 'pc'" class="currency-popup">
        <h1>Select currency</h1>
        <img @click="this.openedCurrencyPopup = false" class="close-btn" src="@/assets/icons/close-btn.svg" alt="">
        <div class="input-div"><input v-model="currencyFilter" placeholder="Find" type="text"></div>
        <div class="items">
            <div @click="selectCurrency(currency)" v-for="currency in filteredCurrencies" :key="currency" class="item">
                <div>
                    <h1>{{ currency.name }}</h1>
                    <h2>{{ currency.currency.toUpperCase() }}</h2>
                </div>
                <img class="tick" src="@/assets/icons/not-tick.svg" alt="">
            </div>
        </div>
    </div>
</div>
</template>

<script>
import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
  data() {
    return {
      pageMore1350: true,
      pageMore800: true,
      pageMore680: true,
      openedCurrencyPopup: false,
      loadedPage: true,
      currencyFilter: ''
    }
  },

  mounted() {
    // if (!this.$store.state.fiatCurrencies) {
      this.$store.dispatch('fetchFiatCurrencies')
      console.log(this.$store.state.fiatCurrencies);
    // }
    this.$store.dispatch('fetchData')
    

    // window control (for 'top crypto' block)
    if (window.innerWidth < 1350) {
      this.pageMore1350 = false
    }
    if (window.innerWidth < 800) {
      this.pageMore800 = false
    }
    if (window.innerWidth < 680) {
      this.pageMore680 = false
    }

    // init library which all animation are made with
    AOS.init();
  },

  // filter coins
  computed: {
    filteredCoins() {
      return this.$store.state.coins
    },
    filteredCurrencies() {
      // if input field (currency filter) is empty
      if (this.currencyFilter === '') {
        return this.$store.state.fiatCurrencies
      // if input field (currency filter) contains sth - show items which start with written text
      } else {
        const filterText = this.currencyFilter.toLowerCase();

        return this.$store.state.fiatCurrencies.filter(currency => {
          const name = currency.currency.toLowerCase();
          return name.startsWith(filterText);
        });
      }
    }
  },

  methods: {
    selectCurrency(currency) {
      this.openedCurrencyPopup = false
      this.loadedPage = false
      this.$store.commit('selectCurrency', currency.currency)
      this.$store.dispatch('fetchData')
      setTimeout(() => {
        this.loadedPage = true
      }, 1000);
    },
    // set selected crypto in vuex
    setSelectedCrypto(coin) {
      this.$store.commit('selectCrypto', coin.id)
      this.$router.push('/trade')
    },
  },
}
</script>