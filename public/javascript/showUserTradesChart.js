function getTradesInfo(){
      $.ajax({
        url: `/users/trades-info`,
        dataType:'json'
      })
      .then( trades => {
        console.log(trades);
        printTradesInfoChart(trades)

      })
      .catch( e => console.log(e));
}

function printTradesInfoChart(trades){
  const tradesDates = trades.map(trade => trade.created_at)
  const tradesMoney = trades.map(trade => trade.moneyIfStopsArbitrage)
  const ctx = $('#user-money-evolution')
  const chart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: tradesDates,
          datasets: [{
              label: "How your money grows",
              backgroundColor: '#06a808',
              borderColor: '#06a808',
              data: tradesMoney,
          }]
      },

      // Configuration options go here
      options: {}
  })

}

setInterval(getTradesInfo, 1000*60)
