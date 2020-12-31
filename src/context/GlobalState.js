import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

// Initial state
const initialState = {
  transactions: [],
  symbol_list: [], 
  graphData_AV_API: {}
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  function deleteTransaction(id) {
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id
    });
  }

  function addTransaction(transaction) {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: transaction
    });
  }

  async function stockSearch(searchInput) {
    //API call for searching stock tickers
    let response = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchInput.text}&apikey=CQ5JZQYM4DG0OODA`);
    let data = await response.json();
    //console.log(data);

    //create temp list
    let new_symbol_list = [];

    //Alerts API limit reached
    if(data.Note){
      alert("MAX API CALLS. Please wait a minute. Thank you for visitng my project! However, it was built using Alpha Vantage's standard API where the call frequency is 5 calls per minute and 500 calls per day.");
    }else{
      //iterate over all search results
      Object.keys(data.bestMatches).forEach( (e) => {
        //filter non-US stocks, then add
        if(data.bestMatches[e]["4. region"] === "United States"){
          let new_symbol = {
            symbol: data.bestMatches[e]["1. symbol"],
            name: data.bestMatches[e]["2. name"]
          }
          new_symbol_list = [new_symbol, ...new_symbol_list];
        }
        // console.log(data.bestMatches[e]); 
      });
    }

    //update state of web app (official symbol_list)
    dispatch({
      type: 'STOCK_SEARCH',
      payload: new_symbol_list
    });
  }

  // User selected stock symbol --> graphSymbol(). 
  // ****************************************
  // Need to add parameters to make it run for 1D,1W,etc
  // console.log(data['Meta Data']['2. Symbol']); to find symbol for 1D,1W... buttons
  // ****************************************
  async function graphSymbol(selectedSymbol) {
    //let graphWindow = 'TIME_SERIES_INTRADAY';
    //let graphWindowSize = '60min';
    let outputSize = 'compact';

    let response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${selectedSymbol}&outputsize=${outputSize}&apikey=CQ5JZQYM4DG0OODA`);
    //if intraday else daily --- above line of code, requires seperate API calls, too differnt due to interval
    let data = await response.json();

    // console.log(data['Meta Data']['2. Symbol']);
    // console.log(data['Time Series (Daily)']);
    // for(let x in data['Time Series (Daily)']){
    //   console.log(x,data['Time Series (Daily)'][x]);
    // }

    //Alerts API limit reached
    if(data.Note){
      alert("MAX API CALLS. Please wait a minute for more. Thank you for visitng my project! However, it was built using Alpha Vantage's standard API where the call frequency is 5 calls per minute and 500 calls per day.");
      alert("The graph will display old data due to the API limit.");
      //creates old IBM stock data to prevent crashing the graph.
      data = {
    "Meta Data": {
        "1. Information": "MAX API CALLS",
        "2. Symbol": "IBM",
        "3. Last Refreshed": "2020-12-30",
        "4. Output Size": "Compact",
        "5. Time Zone": "US/Eastern"
    },
    "Time Series (Daily)": {
        "2020-12-30": {
            "1. open": "123.8000",
            "2. high": "124.8500",
            "3. low": "123.6300",
            "4. close": "124.3400",
            "5. volume": "3321725"
        },
        "2020-12-29": {
            "1. open": "125.3500",
            "2. high": "125.4800",
            "3. low": "123.2400",
            "4. close": "123.8000",
            "5. volume": "3487007"
        },
        "2020-12-28": {
            "1. open": "125.1000",
            "2. high": "126.6000",
            "3. low": "124.4600",
            "4. close": "124.8200",
            "5. volume": "3583222"
        },
        "2020-12-24": {
            "1. open": "125.0000",
            "2. high": "125.1000",
            "3. low": "124.2100",
            "4. close": "124.6900",
            "5. volume": "1761122"
        },
        "2020-12-23": {
            "1. open": "123.8800",
            "2. high": "125.2100",
            "3. low": "123.7400",
            "4. close": "123.9000",
            "5. volume": "2693889"
        },
        "2020-12-22": {
            "1. open": "123.3100",
            "2. high": "124.2200",
            "3. low": "122.4100",
            "4. close": "123.6100",
            "5. volume": "4337757"
        },
        "2020-12-21": {
            "1. open": "123.9700",
            "2. high": "124.1800",
            "3. low": "121.7200",
            "4. close": "123.3900",
            "5. volume": "6115671"
        },
        "2020-12-18": {
            "1. open": "125.5900",
            "2. high": "126.4000",
            "3. low": "124.9700",
            "4. close": "125.8500",
            "5. volume": "7552845"
        },
        "2020-12-17": {
            "1. open": "126.0800",
            "2. high": "126.0900",
            "3. low": "124.9100",
            "4. close": "125.5500",
            "5. volume": "3787962"
        },
        "2020-12-16": {
            "1. open": "125.9300",
            "2. high": "126.5728",
            "3. low": "125.2860",
            "4. close": "125.5500",
            "5. volume": "4530096"
        },
        "2020-12-15": {
            "1. open": "124.3900",
            "2. high": "125.9300",
            "3. low": "123.4400",
            "4. close": "125.9300",
            "5. volume": "4359601"
        },
        "2020-12-14": {
            "1. open": "125.3200",
            "2. high": "126.2435",
            "3. low": "123.4700",
            "4. close": "123.5300",
            "5. volume": "5050023"
        },
        "2020-12-11": {
            "1. open": "124.0800",
            "2. high": "125.5100",
            "3. low": "123.6100",
            "4. close": "124.2700",
            "5. volume": "4481416"
        },
        "2020-12-10": {
            "1. open": "126.3500",
            "2. high": "126.9300",
            "3. low": "124.9400",
            "4. close": "124.9600",
            "5. volume": "4803172"
        },
        "2020-12-09": {
            "1. open": "125.8000",
            "2. high": "127.6900",
            "3. low": "125.7000",
            "4. close": "126.7900",
            "5. volume": "6513517"
        },
        "2020-12-08": {
            "1. open": "125.3200",
            "2. high": "126.3300",
            "3. low": "124.6400",
            "4. close": "125.7100",
            "5. volume": "5395024"
        },
        "2020-12-07": {
            "1. open": "126.4900",
            "2. high": "126.9700",
            "3. low": "124.5700",
            "4. close": "124.7000",
            "5. volume": "8318500"
        },
        "2020-12-04": {
            "1. open": "123.9700",
            "2. high": "127.3800",
            "3. low": "123.6400",
            "4. close": "127.2000",
            "5. volume": "5522760"
        },
        "2020-12-03": {
            "1. open": "124.1600",
            "2. high": "124.8600",
            "3. low": "123.2900",
            "4. close": "123.6100",
            "5. volume": "4548161"
        },
        "2020-12-02": {
            "1. open": "122.8500",
            "2. high": "124.6400",
            "3. low": "122.4100",
            "4. close": "124.6200",
            "5. volume": "3690737"
        },
        "2020-12-01": {
            "1. open": "123.9000",
            "2. high": "125.8300",
            "3. low": "123.0800",
            "4. close": "123.1600",
            "5. volume": "5099334"
        },
        "2020-11-30": {
            "1. open": "124.1000",
            "2. high": "125.0000",
            "3. low": "123.0900",
            "4. close": "123.5200",
            "5. volume": "5987991"
        },
        "2020-11-27": {
            "1. open": "124.2000",
            "2. high": "125.3130",
            "3. low": "123.9100",
            "4. close": "124.3500",
            "5. volume": "2091186"
        },
        "2020-11-25": {
            "1. open": "122.9300",
            "2. high": "124.3300",
            "3. low": "122.1100",
            "4. close": "124.2000",
            "5. volume": "4135894"
        },
        "2020-11-24": {
            "1. open": "120.8600",
            "2. high": "124.7300",
            "3. low": "120.8050",
            "4. close": "124.4200",
            "5. volume": "7535949"
        },
        "2020-11-23": {
            "1. open": "117.4300",
            "2. high": "120.5150",
            "3. low": "117.2700",
            "4. close": "120.0900",
            "5. volume": "5655119"
        },
        "2020-11-20": {
            "1. open": "117.6000",
            "2. high": "118.0400",
            "3. low": "116.6900",
            "4. close": "116.9400",
            "5. volume": "5024593"
        },
        "2020-11-19": {
            "1. open": "116.5400",
            "2. high": "117.4500",
            "3. low": "115.8900",
            "4. close": "117.1800",
            "5. volume": "3439648"
        },
        "2020-11-18": {
            "1. open": "117.7200",
            "2. high": "118.8800",
            "3. low": "116.7500",
            "4. close": "116.7700",
            "5. volume": "4606828"
        },
        "2020-11-17": {
            "1. open": "117.6000",
            "2. high": "118.5400",
            "3. low": "117.0700",
            "4. close": "117.7000",
            "5. volume": "4134455"
        },
        "2020-11-16": {
            "1. open": "118.3000",
            "2. high": "118.5500",
            "3. low": "117.1200",
            "4. close": "118.3600",
            "5. volume": "5293385"
        },
        "2020-11-13": {
            "1. open": "115.1900",
            "2. high": "117.3700",
            "3. low": "115.0100",
            "4. close": "116.8500",
            "5. volume": "4683512"
        },
        "2020-11-12": {
            "1. open": "115.6300",
            "2. high": "116.3700",
            "3. low": "113.4800",
            "4. close": "114.5000",
            "5. volume": "6500799"
        },
        "2020-11-11": {
            "1. open": "118.1200",
            "2. high": "118.3500",
            "3. low": "116.2200",
            "4. close": "117.2000",
            "5. volume": "4289601"
        },
        "2020-11-10": {
            "1. open": "116.6900",
            "2. high": "118.1700",
            "3. low": "116.2500",
            "4. close": "117.9100",
            "5. volume": "5622756"
        },
        "2020-11-09": {
            "1. open": "117.8800",
            "2. high": "119.7400",
            "3. low": "115.2700",
            "4. close": "115.5300",
            "5. volume": "8992152"
        },
        "2020-11-06": {
            "1. open": "115.0800",
            "2. high": "115.1000",
            "3. low": "113.3900",
            "4. close": "114.0400",
            "5. volume": "5249171"
        },
        "2020-11-05": {
            "1. open": "113.3000",
            "2. high": "115.2900",
            "3. low": "113.0100",
            "4. close": "114.7700",
            "5. volume": "4902206"
        },
        "2020-11-04": {
            "1. open": "112.3300",
            "2. high": "113.9100",
            "3. low": "111.1600",
            "4. close": "111.9000",
            "5. volume": "5800071"
        },
        "2020-11-03": {
            "1. open": "114.0000",
            "2. high": "115.6500",
            "3. low": "113.6300",
            "4. close": "114.1600",
            "5. volume": "4204287"
        },
        "2020-11-02": {
            "1. open": "112.6500",
            "2. high": "113.8265",
            "3. low": "112.2500",
            "4. close": "112.9100",
            "5. volume": "5311497"
        },
        "2020-10-30": {
            "1. open": "107.9000",
            "2. high": "111.8000",
            "3. low": "107.7500",
            "4. close": "111.6600",
            "5. volume": "7923882"
        },
        "2020-10-29": {
            "1. open": "107.2500",
            "2. high": "109.6400",
            "3. low": "106.5500",
            "4. close": "108.9100",
            "5. volume": "6760241"
        },
        "2020-10-28": {
            "1. open": "108.6600",
            "2. high": "109.7300",
            "3. low": "105.9200",
            "4. close": "106.6500",
            "5. volume": "9427321"
        },
        "2020-10-27": {
            "1. open": "112.1500",
            "2. high": "112.2200",
            "3. low": "110.0300",
            "4. close": "110.5600",
            "5. volume": "5936106"
        },
        "2020-10-26": {
            "1. open": "114.4500",
            "2. high": "114.9000",
            "3. low": "111.8400",
            "4. close": "112.2200",
            "5. volume": "7203366"
        },
        "2020-10-23": {
            "1. open": "116.5000",
            "2. high": "116.6200",
            "3. low": "115.5300",
            "4. close": "116.0000",
            "5. volume": "3893362"
        },
        "2020-10-22": {
            "1. open": "115.0000",
            "2. high": "116.0600",
            "3. low": "112.9800",
            "4. close": "115.7600",
            "5. volume": "7858158"
        },
        "2020-10-21": {
            "1. open": "116.6600",
            "2. high": "117.6899",
            "3. low": "114.7900",
            "4. close": "115.0600",
            "5. volume": "9755308"
        },
        "2020-10-20": {
            "1. open": "119.8000",
            "2. high": "120.1500",
            "3. low": "116.8400",
            "4. close": "117.3700",
            "5. volume": "21501073"
        },
        "2020-10-19": {
            "1. open": "126.8000",
            "2. high": "127.3500",
            "3. low": "125.0800",
            "4. close": "125.5200",
            "5. volume": "7478735"
        },
        "2020-10-16": {
            "1. open": "125.1700",
            "2. high": "126.4300",
            "3. low": "124.6550",
            "4. close": "125.9300",
            "5. volume": "4714320"
        },
        "2020-10-15": {
            "1. open": "124.0800",
            "2. high": "125.2150",
            "3. low": "123.8500",
            "4. close": "124.8900",
            "5. volume": "3389301"
        },
        "2020-10-14": {
            "1. open": "125.1300",
            "2. high": "126.9400",
            "3. low": "125.1300",
            "4. close": "125.9400",
            "5. volume": "3730139"
        },
        "2020-10-13": {
            "1. open": "126.5700",
            "2. high": "127.1500",
            "3. low": "124.4600",
            "4. close": "125.1000",
            "5. volume": "5406088"
        },
        "2020-10-12": {
            "1. open": "128.0700",
            "2. high": "128.2500",
            "3. low": "126.4400",
            "4. close": "127.2100",
            "5. volume": "4635115"
        },
        "2020-10-09": {
            "1. open": "132.0000",
            "2. high": "132.0000",
            "3. low": "127.6000",
            "4. close": "127.7900",
            "5. volume": "8353704"
        },
        "2020-10-08": {
            "1. open": "130.8600",
            "2. high": "135.5000",
            "3. low": "129.7700",
            "4. close": "131.4900",
            "5. volume": "25288926"
        },
        "2020-10-07": {
            "1. open": "122.6700",
            "2. high": "124.3900",
            "3. low": "122.3200",
            "4. close": "124.0700",
            "5. volume": "2815663"
        },
        "2020-10-06": {
            "1. open": "122.5800",
            "2. high": "124.8300",
            "3. low": "121.5900",
            "4. close": "121.9700",
            "5. volume": "3872265"
        },
        "2020-10-05": {
            "1. open": "121.8400",
            "2. high": "122.7500",
            "3. low": "121.0500",
            "4. close": "122.0100",
            "5. volume": "3050949"
        },
        "2020-10-02": {
            "1. open": "119.0400",
            "2. high": "121.7500",
            "3. low": "118.8200",
            "4. close": "120.5700",
            "5. volume": "2925228"
        },
        "2020-10-01": {
            "1. open": "122.3600",
            "2. high": "123.3000",
            "3. low": "120.3550",
            "4. close": "121.0900",
            "5. volume": "3211661"
        },
        "2020-09-30": {
            "1. open": "121.3800",
            "2. high": "122.9100",
            "3. low": "120.8000",
            "4. close": "121.6700",
            "5. volume": "3261235"
        },
        "2020-09-29": {
            "1. open": "121.4100",
            "2. high": "122.1858",
            "3. low": "120.2100",
            "4. close": "120.9400",
            "5. volume": "2130564"
        },
        "2020-09-28": {
            "1. open": "120.5700",
            "2. high": "122.3300",
            "3. low": "120.4100",
            "4. close": "121.7300",
            "5. volume": "3509576"
        },
        "2020-09-25": {
            "1. open": "117.6000",
            "2. high": "119.4100",
            "3. low": "116.9400",
            "4. close": "118.9500",
            "5. volume": "2953686"
        },
        "2020-09-24": {
            "1. open": "118.1000",
            "2. high": "119.5150",
            "3. low": "116.4800",
            "4. close": "118.0900",
            "5. volume": "3546160"
        },
        "2020-09-23": {
            "1. open": "120.8000",
            "2. high": "121.5900",
            "3. low": "118.4300",
            "4. close": "118.8300",
            "5. volume": "3939398"
        },
        "2020-09-22": {
            "1. open": "120.3300",
            "2. high": "121.4500",
            "3. low": "119.5300",
            "4. close": "120.5100",
            "5. volume": "2957809"
        },
        "2020-09-21": {
            "1. open": "120.4800",
            "2. high": "120.7000",
            "3. low": "118.5800",
            "4. close": "120.2500",
            "5. volume": "5311441"
        },
        "2020-09-18": {
            "1. open": "124.2600",
            "2. high": "124.9200",
            "3. low": "122.6500",
            "4. close": "122.7600",
            "5. volume": "5391570"
        },
        "2020-09-17": {
            "1. open": "122.6200",
            "2. high": "125.5500",
            "3. low": "121.9700",
            "4. close": "124.9200",
            "5. volume": "3171262"
        },
        "2020-09-16": {
            "1. open": "122.7100",
            "2. high": "125.8200",
            "3. low": "122.7100",
            "4. close": "124.2200",
            "5. volume": "3789458"
        },
        "2020-09-15": {
            "1. open": "122.8200",
            "2. high": "123.4000",
            "3. low": "122.2400",
            "4. close": "122.4400",
            "5. volume": "2915221"
        },
        "2020-09-14": {
            "1. open": "122.3600",
            "2. high": "123.3800",
            "3. low": "121.7600",
            "4. close": "122.0900",
            "5. volume": "3641887"
        },
        "2020-09-11": {
            "1. open": "121.3900",
            "2. high": "122.7000",
            "3. low": "120.7300",
            "4. close": "121.4600",
            "5. volume": "3548091"
        },
        "2020-09-10": {
            "1. open": "122.5300",
            "2. high": "123.5764",
            "3. low": "120.2400",
            "4. close": "120.5600",
            "5. volume": "3978805"
        },
        "2020-09-09": {
            "1. open": "122.1300",
            "2. high": "123.7000",
            "3. low": "121.2900",
            "4. close": "122.2600",
            "5. volume": "3770678"
        },
        "2020-09-08": {
            "1. open": "122.1600",
            "2. high": "122.8700",
            "3. low": "120.7100",
            "4. close": "121.2100",
            "5. volume": "5210292"
        },
        "2020-09-04": {
            "1. open": "124.3500",
            "2. high": "125.3500",
            "3. low": "121.2400",
            "4. close": "122.3000",
            "5. volume": "6018238"
        },
        "2020-09-03": {
            "1. open": "128.1900",
            "2. high": "129.9500",
            "3. low": "123.6500",
            "4. close": "124.4500",
            "5. volume": "5716750"
        },
        "2020-09-02": {
            "1. open": "123.7200",
            "2. high": "128.7000",
            "3. low": "123.5750",
            "4. close": "128.1800",
            "5. volume": "6592430"
        },
        "2020-09-01": {
            "1. open": "122.8500",
            "2. high": "123.9500",
            "3. low": "122.1500",
            "4. close": "123.4000",
            "5. volume": "3155623"
        },
        "2020-08-31": {
            "1. open": "125.2500",
            "2. high": "125.2500",
            "3. low": "123.0300",
            "4. close": "123.3100",
            "5. volume": "4827879"
        },
        "2020-08-28": {
            "1. open": "124.9600",
            "2. high": "125.3000",
            "3. low": "124.2187",
            "4. close": "125.0700",
            "5. volume": "3099940"
        },
        "2020-08-27": {
            "1. open": "124.6000",
            "2. high": "125.1000",
            "3. low": "123.9800",
            "4. close": "124.6500",
            "5. volume": "3422654"
        },
        "2020-08-26": {
            "1. open": "124.9500",
            "2. high": "125.1200",
            "3. low": "123.9500",
            "4. close": "124.1700",
            "5. volume": "3388687"
        },
        "2020-08-25": {
            "1. open": "126.0000",
            "2. high": "126.8200",
            "3. low": "124.4900",
            "4. close": "124.6400",
            "5. volume": "2977697"
        },
        "2020-08-24": {
            "1. open": "123.7900",
            "2. high": "126.0600",
            "3. low": "123.3600",
            "4. close": "125.6800",
            "5. volume": "4070816"
        },
        "2020-08-21": {
            "1. open": "123.0100",
            "2. high": "123.4842",
            "3. low": "122.3100",
            "4. close": "123.1600",
            "5. volume": "3385051"
        },
        "2020-08-20": {
            "1. open": "123.2000",
            "2. high": "124.0400",
            "3. low": "122.8100",
            "4. close": "123.1500",
            "5. volume": "2561164"
        },
        "2020-08-19": {
            "1. open": "124.8300",
            "2. high": "125.5000",
            "3. low": "123.5000",
            "4. close": "123.8400",
            "5. volume": "3743949"
        },
        "2020-08-18": {
            "1. open": "125.0000",
            "2. high": "125.5000",
            "3. low": "124.2400",
            "4. close": "124.9200",
            "5. volume": "2882355"
        },
        "2020-08-17": {
            "1. open": "125.2500",
            "2. high": "125.5900",
            "3. low": "124.4100",
            "4. close": "124.4400",
            "5. volume": "3336459"
        },
        "2020-08-14": {
            "1. open": "124.2000",
            "2. high": "125.5600",
            "3. low": "123.9100",
            "4. close": "125.2700",
            "5. volume": "2963753"
        },
        "2020-08-13": {
            "1. open": "125.9600",
            "2. high": "126.3900",
            "3. low": "124.7700",
            "4. close": "125.0300",
            "5. volume": "3171258"
        },
        "2020-08-12": {
            "1. open": "127.6100",
            "2. high": "127.7900",
            "3. low": "125.8760",
            "4. close": "126.7000",
            "5. volume": "3530177"
        },
        "2020-08-11": {
            "1. open": "128.7600",
            "2. high": "130.4700",
            "3. low": "126.6100",
            "4. close": "126.7500",
            "5. volume": "5001176"
        },
        "2020-08-10": {
            "1. open": "125.4200",
            "2. high": "127.2400",
            "3. low": "125.1849",
            "4. close": "127.1100",
            "5. volume": "3968295"
        }
    }
              };
      console.log(data);
    }else{
      console.log(data);
    }


    dispatch({
      type: 'DISPLAY_GRAPHS',
      payload: data
    });
  }

  return (<GlobalContext.Provider value={{
    transactions: state.transactions,
    symbol_list: state.symbol_list,
    graphData_AV_API: state.graphData_AV_API,
    deleteTransaction,
    addTransaction,
    stockSearch,
    graphSymbol
  }}>
    {children}
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossOrigin="anonymous"></script>
      
  </GlobalContext.Provider>);
}