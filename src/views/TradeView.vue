<template>
<div class="trade_container">
    <div class="trade_header home_header">
        <h2 @click="this.$router.push('/')">ALEER</h2>
        <div>
            <h3 @click="this.$router.push('/market')">Market</h3>
            <h3 @click="this.$router.push('/error')">Buy crypto</h3>
            <div @click="this.$router.push('/error')" class="account"><img src="../assets/icons/acc.svg" alt=""></div>
        </div>
    </div>

    <div :class="windowWidth < 800 ? 'mobile' : 'pc'" class="trade_content">
        <Schedule />
        <div v-if="windowWidth > 1350" class="buysell_container"><BuySell /></div>
    </div>
</div>
</template>

<script>
import Schedule from '../components/Schedule.vue'
import BuySell from '../components/BuySell.vue'
import ErrorPage from './ErrorPage.vue'
export default {
    components: {
        Schedule, BuySell, ErrorPage
    },
    data() {
        return {
            loadedPage: false,
            windowWidth: null,
            openedCurrencyPopup: false
        }
    },
    mounted() {
        this.loadedPage = this.$store.state.loadedPage

        if (window.innerWidth < 800) {
            this.pageMore800 = false
        }
        if (window.innerWidth < 680) {
            this.pageMore680 = false
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
        changeCurrencyPopup() {
            this.$store.commit('changeCurrencyPopup', false)
        },  
    },  
    watch: {
        // check changes in store
        '$store.state.loadedPage': function(newVal) {
            this.loadedPage = newVal
        },
    }
}
</script>