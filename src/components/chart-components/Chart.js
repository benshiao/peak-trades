import React, { useState } from "react";
import styled from "styled-components";

import Candle from "./Candle";
import CrossHairs from "./CrossHairs";

const CSS = styled.div`
  .caret{
    font-size: 65%;
  }

  .priceChanges{
    font-size: 80%;
  }
`;

const Chart = props => {
  const { data, graph_type, width: chart_width, height: chart_height } = props;
  // let { last_bar_idx = 0, bars_wide = 40 } = props;

  // last_bar_idx should default to the last bar in the data, or else be sure passed-in value doesn't exceed the last bar
  // last_bar_idx = last_bar_idx > 0 ? Math.min(last_bar_idx, data.length - 1) : data.length - 1;

  const [mouseCoords, setMouseCoords] = useState({
    x: -50,
    y: -50
  });

  // let mouseCoords = {
  //   x: 0,
  //   y: 0
  // };

  // const setMouseCoords = (x, y) => {
  //   mouseCoords = { x, y };
  // };

  // find the high and low bounds of all the bars being sidplayed
  const dollar_high = Math.max.apply(Math, data.map(bar => +bar.high)) * 1.15;
  const dollar_low = Math.min.apply(Math, data.map(bar => +bar.low)) * 0.95 ;

  // calculate the candle width
  const candle_width = Math.floor((chart_width / data.length) * 0.7);

  const chart_dims = {
    pixel_width: chart_width,
    pixel_height: chart_height,
    dollar_high,
    dollar_low,
    dollar_delta: dollar_high - dollar_low
  };

  // toFixed rounds number to 2 decimal places
  const dollarAt = pixel => {
    const dollar =
      (Math.abs(pixel - chart_dims.pixel_height) / chart_dims.pixel_height) *
        chart_dims.dollar_delta +
      chart_dims.dollar_low;

    return pixel > 0 ? dollar.toFixed(2) : "-";
  };

  // Gets candlestick data at x position
  const candleDataAt = pixel => {
    if(pixel<=0 || pixel >= chart_dims.pixel_width) return "-";
    const candle = data[Math.floor((pixel/ chart_dims.pixel_width) * data.length)];

    return candle;
  };

  const convertDate = dateString => {
    if(!dateString) return "";
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

  const candleChange = pixel => {
    if(pixel<=0 || pixel >= chart_dims.pixel_width) return "";
    const candle = data[Math.floor(  (pixel/ chart_dims.pixel_width) * (data.length) )];
    const change = ((candle['close']/candle['open'])-1) * 100;
    const posNeg = change >= 0 ? '+' : '-';
    return posNeg + Math.abs(change).toFixed(2);
  };

  const pixelFor = dollar => {
    return -1*(
      ((dollar - chart_dims["dollar_low"]) / chart_dims["dollar_delta"]) *
        chart_dims["pixel_height"] -
        chart_dims["pixel_height"]
    );
  };

  const onMouseLeave = () => {
    setMouseCoords({
      x: -50,
      y: -50
    });
  };

  const onMouseMoveInside = e => {
    //for date(x axis), calc using dates[x cord/width] , create dates[]
    setMouseCoords({
      x:
        e.nativeEvent.x -
        Math.round(e.currentTarget.getBoundingClientRect().left) - candle_width/2,
      y:
        e.nativeEvent.y -
        Math.round(e.currentTarget.getBoundingClientRect().top)
    });
  };

  const onMouseClickInside = e => {
    console.log(`Click at ${e.nativeEvent.offsetX}, ${e.nativeEvent.offsetY}`);
  };

  // Returns string for mouse off chart display
  const graphTypeStr = () => {
    switch(graph_type){
      case 'day':
        return "Yesterday";
      case 'week':
        return "Past Week";
      case 'month':
        return "Past Month";
      case 'quarter':
        return "Past 3 Months";
      case 'year':
        return "Past Year";
      default:
        return "Error chart.js";
    }
  };

  // Return JSX for mouse off chart display
  const mouseOffChartJSX = () => {
    if(data.length<3) return <></>;
    const englishStr = <tspan fill='#898996'>{graphTypeStr()}</tspan>;
    const changePercent = ((data[data.length-1]["close"] / data[0]["open"]) - 1) * 100 ;
    const changeUSD = data[data.length-1]["close"] - data[0]["open"];
    return <>
      <tspan className="" fill="#dedfe4">${data[data.length-1]["close"]} </tspan>
      <tspan className="caret" fill={changeUSD>=0?"#81dfc4":"#d75b6d"}>{changeUSD>=0?"▲":"▼"} </tspan>
      <tspan className="priceChanges" fill={changeUSD>=0?"#81dfc4":"#d75b6d"}> ${Math.abs(changeUSD).toFixed(2)} ({changePercent.toFixed(2)}%) </tspan>
      {englishStr}
    </>;
  }

  return (
    <CSS>
    <svg
      width={chart_width*1.025 /* Extra width to fit price */}
      height={chart_height}
      className="chart"
      onMouseMove={onMouseMoveInside}
      onClick={onMouseClickInside}
      onMouseLeave={onMouseLeave}
    >
      {data.map((bar, i) => {
        const candle_x = (chart_width / (data.length)) * (i + 1);
        return (
          <Candle
            key={i}
            data={bar}
            x={candle_x}
            candle_width={candle_width}
            pixelFor={pixelFor}
          />
        );
      })}

      <CrossHairs x={mouseCoords.x + candle_width/2} y={mouseCoords.y} chart_dims={chart_dims} />
      {mouseCoords.x>0 && mouseCoords.x<=chart_width? <> 
      {/* Price CrossHair */}
      <rect x={(chart_width*1.025)-(1+dollarAt(mouseCoords.y).length)*8.2} y={mouseCoords.y-12} width={(1+dollarAt(mouseCoords.y).length)*8.2} height='24' fill="gray" rx='9' ry='9'>{/* background color for price */}</rect>
      <text x={5 + (chart_width*1.025)-(1+dollarAt(mouseCoords.y).length)*8} y={mouseCoords.y+5} fill="white" fontSize="12">
        ${dollarAt(mouseCoords.y)}
      </text>
      {/* Open/High */}
      <text x='16' y='20' fontSize="12">
        <tspan fill='#898996'>Open</tspan> <tspan fill='#dedfe4'>${candleDataAt(mouseCoords.x)['open']}  </tspan>
        <tspan fill='#898996'>High</tspan> <tspan fill='#dedfe4'>${candleDataAt(mouseCoords.x)['high']}</tspan>
      </text>
      {/* Low/Close */}
      <text x='16' y='40' fontSize="12">
        <tspan fill='#898996'>Close</tspan> <tspan fill='#dedfe4'>${candleDataAt(mouseCoords.x)['close']}  </tspan>
        <tspan fill='#898996'>Low</tspan> <tspan fill='#dedfe4'>${candleDataAt(mouseCoords.x)['low']}</tspan>
      </text>
      {/* Volume/%change */}
      <text x='16' y='59' fontSize="12">
        <tspan fill='#898996'>Volume</tspan> <tspan fill='#dedfe4'>{mouseCoords.x > 0 ?(candleDataAt(mouseCoords.x)['volume']/1000).toFixed(2) + 'K': ''}  </tspan>
        <tspan fill='#898996'>Change</tspan> <tspan fill={candleChange(mouseCoords.x)>=0?"#81dfc4":"#d75b6d"}>{candleChange(mouseCoords.x)}%</tspan>
      </text>
      {/* Date Time */}
      <text x="16" y="85" fill='#898996' fontSize='20'>
        {convertDate(candleDataAt(mouseCoords.x)['xAxis'])} 
      </text>
      </> : <text x='16' y='40' fontSize="25">{mouseOffChartJSX()}</text>}
      
    </svg>
    </CSS>
  );
};

export default Chart;
