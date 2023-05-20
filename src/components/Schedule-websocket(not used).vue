
<script>
export default {
  // data() {
  //   return {
  //     ws: null
  //   }
  // }
    // mounted() {
      // this.connectWebSocket();
    // },
    // watch: {
    //   '$store.state.selectedCrypto': function() {
    //     this.subscribeToTicker();
    //   },
    //   '$store.state.selectedCurrency': function() {
    //     this.subscribeToTicker();
    //   }
    // },
    // methods: {
    //   // for watcher
    //   subscribeToTicker() {
    //   if (this.ws) {
    //     this.ws.close();
    //   }
    //   this.series.data = []
    //   this.options.xaxis.categories = [1]
    //   this.ws.send(JSON.stringify({
    //     type: 'subscribe',
    //     channels: [
    //       {
    //         name: 'ticker',
    //         product_ids: [`${this.$store.state.selectedCrypto}-${this.$store.state.selectedCurrency}`]
    //       }
    //     ]
    //   }));
    //   },
      
    //   // connect by websocket to crypto market api
    //   connectWebSocket() {
    //     const url = `wss://ws-feed.pro.coinbase.com`;
  
    //     this.ws = new WebSocket(url);
    //     // on opening the page create connection
    //     this.ws.onopen = () => {
    //       this.ws.send(JSON.stringify({
    //         type: 'subscribe',
    //         // channels in ws graphic
    //         channels: [
    //           {
    //             name: 'ticker',
    //             product_ids: [`${this.$store.state.selectedCrypto}-${this.$store.state.selectedCurrency}`]
    //           }
    //         ],
    //       }));
    //     }
    //     this.ws.onmessage = (event) => {
    //       const data = JSON.parse(event.data);
    //       if (data.type === 'ticker') {
    //         const price = data.price;
    //         this.price = price;
    //       }
    //       // if (this.series[0].data.length > 10) {
    //       //   this.series[0].data.shift()
    //       //   this.options.xaxis.categories.shift()
    //       // }
    //       // this.series[0].data.push(this.price);
    //       // this.options.xaxis.categories.push(new Date().toLocaleTimeString());
    //       // this.$refs.chart.updateSeries(this.series);
    //     };
    //     this.ws.onclose = () => {
    //       this.connectWebSocket();
    //     };
    //     this.ws.onerror = (error) => {
    //       console.error(error);
    //     };
    //   },
    // }
}
</script>
