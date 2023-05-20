<template>
  <div :class="pageMore680 ? 'pc' : 'mobile'" class="roadmap">
    <h1>Roadmap</h1>
    <h2>How it works</h2>

    <div class="items">
        <!--1-->
        <div class="item">
            <img src="@/assets/icons/instruction-1.png" alt="">
            <h1 class="step">STEP 1</h1>
            <h1>Login Or Create our account</h1>
            <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
        </div>
        <!--2-->
        <div class="item">
            <img src="@/assets/icons/instruction-2.png" alt="">
            <h1 class="step">STEP 2</h1>
            <h1>Connect Wallet</h1>
            <h2> At sit ut nulla eu stetur eget. Nec, ac, sollicitudin aliquam ut egestas duis dolor.</h2>
        </div>
        <!--3-->
        <div class="item">
            <img src="@/assets/icons/instruction-3.png" alt="">
            <h1 class="step">STEP 3</h1>
            <h1>Start Trading</h1>
            <h2>Congue suspendisse aliquam ut egestas duis dolor.</h2>
        </div>
        <!--4-->
        <div class="item">
            <img src="@/assets/icons/instruction-4.png" alt="">
            <h1 class="step">STEP 4</h1>
            <h1>Pre-Sale and Buy</h1>
            <h2>At sit ut nulla eu stetur eget. Nec, ac, sollicitudin aliquam ut egestas duis dolor.</h2>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            pageMore680: true
        }
    },
    mounted() {
        if (window.innerWidth < 680) {
            this.pageMore680 = false
        }
    }
}
</script>