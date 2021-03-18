const express = require("express");
const app = express();
const websocket = require("ws")

const Binance = require('node-binance-api');
const { response } = require("express");
const binance = new Binance().options({
  APIKEY: '**********************',
  APISECRET: '**********************'
});



app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static("views"));



   binance.balance((error, balances) => {
  if ( error ) return console.error(error);

  var eldekiUSDT = Number(balances.USDT.available);
  console.log(eldekiUSDT+" USDT");


  var eldekiADA = Number(balances.ADA.available);


     



 binance.prevDay("ETHUSDT", (error, prevDay, symbol) => {
  var ethavgprice = Number(prevDay.weightedAvgPrice);


binance.websockets.chart("ETHUSDT", "1m", (symbol, interval, chart) => {
      let tick = binance.last(chart);
      const last = chart[tick].close; 

   var alinabilirETH = Number((eldekiUSDT / last));
 console.log("Alınabilir Ethereum: "+alinabilirETH);

    console.log("Ethereum Anlık Fiyat: "+last) 
    
 /*    if (ethavgprice = last) {
  let quantity = alinabilirETH;
 binance.marketBuy("ETHUSDT", quantity, (error, response)=>{
   console.log(response);
 }); 


} */

}); 

    

  binance.prices('BNBUSDT', (error, ticker) => {
    var bnb_usdt = Number(ticker.BNBUSDT);  




 app.get("/adausdt", (req,res)=>{

  binance.prices('ADAUSDT', (error, ticker) => {
    var ada_usdt = ticker.ADAUSDT;



  binance.prevDay("ADAUSDT", (error, prevDay, symbol) => {
    var adaAvg = Number(prevDay.weightedAvgPrice);  



binance.trades("ADAUSDT", (error, trades, symbol) => {
  var sonIslem = trades.length-1;
  console.info("Son işlem "+sonIslem)
  console.info(symbol+" trade history", trades[sonIslem]);

    var parite1= trades[sonIslem].price ;
    var adet1= trades[sonIslem].qty;
    var komisyon1= trades[sonIslem].commission * bnb_usdt;


   res.render("adausdt",
   {adausdt:ada_usdt,
    adaAvg:adaAvg,
    eldekiUsdt:eldekiUSDT,
    eldekiAda:eldekiADA,
    parite1:parite1,
    adet1:adet1,
    komisyon1:komisyon1
  
  });

});
});
});
});
});

app.get("/", (req,res)=>{
  res.render("index");
});

app.get("/ethusdt", (req,res)=>{
    

    binance.prices('ETHUSDT', (error, ticker) => {
    var eth_usdt = ticker.ETHUSDT;

    binance.prices('BETHETH', (error, ticker)=>{
    var betheth = ticker.BETHETH;



    var eldekiETH = Number(balances.ETH.available);
    var eldekiBETH = Number(balances.BETH.available);
    var islemdekiBETH = Number(balances.BETH.onOrder);
    var toplamBeth = Number(eldekiBETH + islemdekiBETH);

    var ethdegeri =  Number(toplamBeth) * Number(betheth);
    var beth_usdt = Number(eth_usdt * ethdegeri);




     
    res.render("betheth", 
    {Selam:eth_usdt, 
    Ethavg:ethavgprice, 
    EldekiEth:eldekiETH,
    EldekiBeth:eldekiBETH,
    IslemdekiBeth:islemdekiBETH,
    Beth_usdt:beth_usdt


  });
});
});
});
});
});

let port= 3000;
app.listen(port, ()=>{
    console.log("Server "+port+" portunda dinleniyor...");
  });
