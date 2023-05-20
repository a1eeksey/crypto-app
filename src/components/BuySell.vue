<template>
  <div class="buysell_container">
    <div class="buysell_select-option">
        <div class="buy-option">
            <h3>BUY</h3>
            <div class="buy-line"></div>
        </div>
        <div class="sell-option">
            <h3>SELL</h3>
            <div class="sell-line"></div>
        </div>
    </div>

    <div class="buysell_categories">
        <div class="type">
            <h3>TYPE</h3>
            <select>
                <option value="limit">Limit</option>
                <option value="market">Market</option>
                <option value="stop-limit">Stop limit</option>
            </select>
        </div>

        <div class="price">
            <h3>PRICE</h3>
            <input type="number">
        </div>

        <div class="amount">
            <h3>AMOUNT</h3>
            <input type="number">
        </div>

        <div class="total">
            <h3>TOTAL</h3>
            <input type="number">
        </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>