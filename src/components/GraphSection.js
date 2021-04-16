import React, { useContext, useEffect, useState } from 'react';
import Chart from "./chart-components/Chart";
import styled from "styled-components";

import { GlobalContext } from '../context/GlobalState';
import "../chart.css";

const CSS = styled.div`

  .chart-info-area{
    margin: 0 16% 0 16%;
    padding-top: 120px;
  }

  .stock-info{
    display: flex;
    align-items: center;
    width: 110.5%;
    margin: 2% -5%;
    padding: 20px 50px 0px 50px;
    color: #dedfe4;
    background-color: transparent;//#2e4033;
    border-radius: 10px;
    font-family: 'Source Sans Pro', arial, sans-serif;
    font-size: 16px;
    font-weight: 200;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 5px 15px;

    
    @media only screen and (max-width: 768px) {
      padding: 2%;
      font-size: 75%;
    }

    &-ticker{
      text-align: left;
      float: left;
      width: 33.33333%;
    }
    &-company{
      text-align: center;
      float: left;
      width: 33.33333%;
    }
    &-updated{
      text-align: right;
      float:left;
      width: 33.33333%;
    }
  }

  .chart-buttons{
    margin: 5px 0 0 16%;
  }
  .chart-button{
    color: #dedfe4;
    font-size: 16px;
    padding: 5px 15px;
    background-color: transparent;
    margin: 0 10px;
    border: none;
    border-radius: 10px;

    &:hover,&:focus {
        background: #101010;
        outline: none;
        box-shadow: rgba(0, 0, 0, 0.4) 0px 3px 10px;
    }
  }
`;

// Hook for dynamic window size
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    // Add event listener
    window.addEventListener("resize", handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}

export const GraphSection = () => {
  //grab global variables/functions to call in this file
  const { graphData_AV_API, graphSymbol, current_symbol, current_company, graph_type } = useContext(GlobalContext);

  const myWindow = useWindowSize();
  const chart_width = myWindow.width*2/3;
  const chart_height = myWindow.height*2/3;

  // Processes update to API call and sends data to candlestick chart.
  const processGraphData = () => {
    let time_series_type;
    if(graphData_AV_API['Time Series (15min)']){
      time_series_type = 'Time Series (15min)';
    }else if(graphData_AV_API['Time Series (60min)']){
      time_series_type = 'Time Series (60min)';
    }else{//if(graphData_AV_API['Time Series (Daily)']){
      time_series_type = 'Time Series (Daily)';
    }
    const time_series_isDaily = time_series_type === 'Time Series (Daily)' ? true : false;
    let split_ratio = 1.0;

    //this arrays are sus
    let graphDataProcessed = [];
    let i = 0

    let date_counter = 0;
    let previous_date = '';
    let stop_graphing = false;
    // Iterate/translate API call to fit my charts inputs
    for(let myDate in graphData_AV_API[time_series_type]){
      // Counts unique dates, stops graphing according to graph_Type
      if( !(previous_date===myDate.substr(0,10)) ){
        previous_date = myDate.substr(0,10);
        date_counter++;
        
        switch(graph_type){
            case 'day':
                if(date_counter>1) stop_graphing = true;
                break;
            case 'week':
                if(date_counter>5) stop_graphing = true;
                break;
            case 'month':
                if(date_counter>20) stop_graphing = true;
                break;
            case 'quarter':
                if(date_counter>60) stop_graphing = true;
                break;
            case 'year':
                if(date_counter>253) stop_graphing = true;
                break;
            default:
        }
        if(stop_graphing) break;
      }

      // Some API data open==close==high==low, resulting in candles of size 0x0, resulting in empty graph. 
      // flat_candle ensures candles are never 0x0 (invisible).
      let flat_candle = +graphData_AV_API[time_series_type][myDate]['1. open']=== +graphData_AV_API[time_series_type][myDate]['4. close'] ? 0.001 : 0;
      
      graphDataProcessed.push({
        "time": i++,
        "xAxis": myDate,
        "open": (+graphData_AV_API[time_series_type][myDate]['1. open']/split_ratio).toFixed(2),
        "close": (flat_candle+graphData_AV_API[time_series_type][myDate]['4. close']/split_ratio).toFixed(2),
        "high": (+graphData_AV_API[time_series_type][myDate]['2. high']/split_ratio).toFixed(2),
        "low": (+graphData_AV_API[time_series_type][myDate]['3. low']/split_ratio).toFixed(2),
        "volume": +graphData_AV_API[time_series_type][myDate][time_series_isDaily ? '6. volume' : '5. volume']
      });
      if(time_series_isDaily) split_ratio *= +graphData_AV_API[time_series_type][myDate]['8. split coefficient'];
    }
    graphDataProcessed.reverse();
    return graphDataProcessed;
  };

  // Only for intialization: maybe make it display SPY as default
  const [data, setData] = useState(() => processGraphData());
  // Whenever graphData_AV_API is changed, code below will update graph
  useEffect(() => {
    if(current_symbol.length>0) setData(processGraphData());
  }, [graph_type, current_symbol]); // eslint-disable-line react-hooks/exhaustive-deps

  // Convert JS date into easy to read date
  const convertDate = dateString => {
    if(!dateString) return "error";
    const myYear = dateString.substring(2,4);
    const myMonth = parseInt(dateString.substring(5,7), 10);
    const myDay = parseInt(dateString.substring(8,10), 10);
    if(dateString.length===10){
      return myMonth + "/" + myDay + "/" + myYear;
    }
    const myHour = parseInt(dateString.substring(11,13), 10);
    const myMinute = dateString.substring(14,16);

    return myMonth + "/" + myDay + "/" + myYear + " " + myHour + ":" + myMinute + " EST";
  }

  if(current_symbol.length>0){
    return (
      <>
      <CSS>
        <div className="chart-info-area">
          <div className="stock-info">
            <p className="stock-info-ticker">Ticker: {current_symbol}</p>
            <p className="stock-info-company">Name: {current_company}</p>
            <p className="stock-info-updated">Updated: {convertDate(graphData_AV_API["Meta Data"]["3. Last Refreshed"])}</p>
          </div>
          <Chart data={data} graph_type={graph_type} width={chart_width} height={chart_height} />
        </div>
        <div className="chart-buttons">
          <button className="chart-button" onClick={() => graphSymbol(current_symbol, current_company,'day', false)}>
            1D
          </button>
          <button className="chart-button" onClick={() => graphSymbol(current_symbol, current_company,'week', false)}>
            1W
          </button>
          <button className="chart-button" onClick={() => graphSymbol(current_symbol, current_company, 'month', false)}>
            1M
          </button>
          <button className="chart-button" onClick={() => graphSymbol(current_symbol, current_company, 'quarter', false)}>
            3M
          </button>
          <button className="chart-button" onClick={() => graphSymbol(current_symbol, current_company, 'year', false)}>
            1Y
          </button>
        </div>
      </CSS>
      </>
    )
  }else{
    return (
      <>
      </>
    )
  }
}


