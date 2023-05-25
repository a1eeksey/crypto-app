<template>
  <div class="container">
    <div class="home_header">
      <h2>ALEER</h2>
      <div>
        <h3 @click="this.$router.push('/trade')">Trade$</h3>
        <h3 @click="this.$router.push('/market')">Market</h3>
      </div>
    </div>

    <div :class="{'mobile': windowWidth < 680}" class="home_content">
      <h1  data-aos="fade-in" data-aos-duration="1000">Accept Crypto Globally,</h1>
      <h1  data-aos="fade-in" data-aos-duration="1000">Be Limitless.</h1>
      <h2  data-aos="fade-in" data-aos-duration="1000">Unrivaled Perfomance · Self-custody & Transparency · Ultra-low Fees</h2>

      <div class="home_button">
        <button @click="this.$router.push('/trade')">Get started</button>
      </div>

      <div class="gif">
        <img src="../assets/vids/cube-blue.gif" alt="">
      </div>

      <div :class="{'mobile': windowWidth < 1350, 'small-mobile' : windowWidth < 680}" class="world-wide-users_block">
        <div class="all-text">
          <h1 data-aos="zoom-out">Our best users are all over the world with wide coverage</h1>
          <h2>Our platform reaches poople all over the world, hereby we are trusted as the best platform for crypto trading</h2>
          <div :class="{'small-mobile' : windowWidth < 680}" class="info-items">
            <!--1-->
            <div>
              <h1 data-aos="fade-in">20M+</h1>
              <h2 data-aos="fade-in">People who have Aleer</h2>
            </div>
            <!--2-->
            <div>
              <h1 data-aos="fade-in">100+</h1>
              <h2 data-aos="fade-in">Famous people playing Aleer</h2>
            </div>
            <!--3-->
            <div>
              <h1 data-aos="fade-in">20</h1>
              <h2 data-aos="fade-in">Cooperation with big companies</h2>
            </div>
          </div>
        </div>

        <div class="world-image">
          <img src="../assets/icons/earth-bg.png" alt="">
        </div>
      </div>

      <div :class="{'mobile': windowWidth < 680}" data-aos="fade-up" class="item-block">
        <img data-aos="zoom-in" src="../assets/icons/math.svg" alt="">
        <h2> User-friendly interface that has been specifically designed to cater to users of all levels of experience. 
        <span class="logo">The ALEER</span> provides a secure way to earn interest on fiat and digital assets by providing funding to traders who wish to trade on leverage. 
        Users can offer funding for a wide range of currencies and assets, choosing their own rate and duration.
        </h2>
      </div>

      <div :class="{'mobile': windowWidth < 680}" data-aos="fade-up" class="item-block">
        <h2> 
        <span class="logo">The ALEER</span> has incorporated educational materials and resources directly into our interface, making it convenient for users to learn about cryptocurrencies while trading. Our interface provides a seamless experience, allowing you to access real-time market data, monitor your portfolio, execute trades, and access educational resources all in one place.
        </h2>
        <img data-aos="zoom-in" src="../assets/icons/brain.svg" alt="">
      </div>

      <Roadmap data-aos-duration="1000" data-aos="fade-up"/>

      <div :class="{'mobile': windowWidth < 680}" data-aos="fade-in" data-aos-once="true" class="top-crypto">
        <h1>Top 3 crypto coins</h1>
        <div class="item main">
          <h2 class="icon">Icon</h2>
          <h2 class="name">Name</h2>
          <h2>Price$</h2>
          <h2 v-if="windowWidth > 800">1h %</h2>
          <h2 class="last-item">24h %</h2>
          <h2 v-if="windowWidth > 800">7d %</h2>
          <h2  v-if="windowWidth > 680">Market Cap</h2>
        </div>

        <div @click="setSelectedCrypto(coin)" v-for="coin in this.$store.state.coins.slice(0,3)" :key="coin.id" class="item">
          <div><img :src="coin.img" alt=""></div>
          <h2 class="name">{{ coin.name }}</h2>
          <h2>{{ coin.price.toFixed(2) }}</h2>
          <h2 :class="coin.oneHchange > 0 ? 'green' : 'red'" v-if="windowWidth > 800">{{ coin.oneHchange.toFixed(2) }}</h2>
          <h2 class="last-item" :class="coin.twfourHchange > 0 ? 'green' : 'red'">{{ coin.twfourHchange.toFixed(4) }}</h2>
          <h2 :class="coin.sevDchange > 0 ? 'green' : 'red'" v-if="windowWidth > 800">{{ coin.sevDchange.toFixed(2) }}</h2>
          <h2 v-if="windowWidth > 680">{{ coin.marketCap }}</h2>
        </div>

        <div class="home_button">
          <button @click="this.$router.push('/market')">See more</button>
        </div>
      </div>
      
    </div>
    
  </div>
  <div class="footer">
    <h2>© 2023 Aleer. All rights reserved</h2>
  </div>
</template>

<script>
import AOS from 'aos';
import 'aos/dist/aos.css';
import Roadmap from '@/components/Roadmap.vue';

export default {
  data() {
    return {
      windowWidth: null
    }
  },

  components: {
    Roadmap
  },  

  mounted() {
    this.$store.dispatch('fetchData')

    // init library which all animation are made with
    AOS.init();
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
    // set selected crypto in vuex
    setSelectedCrypto(coin) {
      this.$store.commit('selectCrypto', coin.id)
      this.$router.push('/trade')
    },
  }
}
</script>
