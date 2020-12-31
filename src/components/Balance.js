import React, { useContext, useEffect, useState } from 'react';
import * as d3 from "d3";
import Chart from "../components/chart-components/Chart";

import { GlobalContext } from '../context/GlobalState';
import "../chart.css";


export const Balance = () => {
  //grab global variables/functions to call in this file
  const { transactions, graphData_AV_API } = useContext(GlobalContext);

  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  
  // ********************************************************************************
  //temp graph d3 example--------------------------
  // ********************************************************************************
  const chart_width = window.screen.availWidth*2/3;
  const chart_height = window.screen.availHeight*2/3;

  // Processes API call and sends data to candlestick chart.
  const processGraphData = () => {
    let split_ratio = 1.0;
    let xAxis_times = [];
    let graphDataProcessed = [];

    // Iterate/translate API call to fit my charts inputs
    for(let myDate in graphData_AV_API['Time Series (Daily)']){
      xAxis_times.push(myDate);
      graphDataProcessed.push({
        "open": +graphData_AV_API['Time Series (Daily)'][myDate]['1. open']/split_ratio,
        "close": +graphData_AV_API['Time Series (Daily)'][myDate]['4. close']/split_ratio,
        "high": +graphData_AV_API['Time Series (Daily)'][myDate]['2. high']/split_ratio,
        "low": +graphData_AV_API['Time Series (Daily)'][myDate]['3. low']/split_ratio,
        "volume": +graphData_AV_API['Time Series (Daily)'][myDate]['6. volume']
      });
      split_ratio *= +graphData_AV_API['Time Series (Daily)'][myDate]['8. split coefficient'];
    }
    
    const length = xAxis_times.length;
    // Below return traanslates lines 26-36 bc idk how to format this type of object
    return d3.range(length).map((item, i) => {
      console.log(xAxis_times[i]);
      return {
        time: i,
        open: graphDataProcessed[i]['open'],
        high: graphDataProcessed[i]['high'],
        low: graphDataProcessed[i]['low'],
        close: graphDataProcessed[i]['close'],
        volume: graphDataProcessed[i]['volume']
      };
    });
  };
  
  // Only for intialization: maybe make it display SPY as default
  const [data, setData] = useState(() => processGraphData());
  // Whenever graphData_AV_API is changed, code below will update graph
  useEffect(() => {
    setData(processGraphData());
  }, [graphData_AV_API]);
  // ********************************************************************************
  //candlestick tutorial end-----
  // ********************************************************************************


  return (
    <>
      <h4>Your Balance</h4>

      <Chart data={data} width={chart_width} height={chart_height} />
      <h1>${total}</h1>
    </>
  )
}


