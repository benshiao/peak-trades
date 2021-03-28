import React from 'react';
import styled from "styled-components";

const Trade = props => {
  const { trade } = props;


  const CSS = styled.div`
  
    .trade-card{
      margin-bottom: 10px;
      font-size: 12px;
      
      display:block;
      overflow:auto;

      box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
      background: #3d3d4a;  
    }
    .trade-card-sub{
      float: left;
      width: 33.33%;
      padding: 1.25%;    
    }
    .result-item{
      border-bottom: 2px solid #6464a3;
      height: auto;
      margin-bottom: 4%;
      padding-bottom: 1%;
    }
    .result-title{
      text-align: left;
      color: #898996;
      font-size: 12px;
      width: 40%;
    }
    .result-output{
      text-align: right;
      color: #dedfe4;
      font-size: 14px;
      width: 60%;
    }
  `;
  return (
    <CSS>
      <div className="trade-card">
        <div className="trade-card-sub">
          <div className="result-item">
            <label className="result-title">Buy date: </label>
            <label className="result-output">{trade.buyDate}</label>
          </div>
          <div className="result-item">
            <label className="result-title">Buy price: </label>
            <label className="result-output">{trade.buyPrice}</label>
          </div>
          <div className="result-item">
            <label className="result-title">Indicator at Buy: </label>
            <label className="result-output">{trade.indicatorAtBuy}</label>
          </div>
        </div>
        <div className="trade-card-sub">
          <div className="result-item">
            <label className="result-title">Sell date:</label>
            <label className="result-output">{trade.sellDate}</label>
          </div>
          <div className="result-item">
            <label className="result-title">Sell price: </label>
            <label className="result-output">{trade.sellPrice}</label>
          </div>
          <div className="result-item">
            <label className="result-title">Indicator at Sell: </label>
            <label className="result-output">{trade.indicatorAtSell}</label>
          </div>
        </div>
        <div className="trade-card-sub">
          <div className="result-item">
            <label className="result-title">Number of shares:</label>
            <label className="result-output"> {trade.numShares.toFixed(2)}</label>
          </div>
          <div className="result-item">
            <label className="result-title">Profit Percent: </label>
            <label className="result-output">${trade.profitUSD.toFixed(2)}({trade.profitPercent>0?"+":""}{(trade.profitPercent*100).toFixed(2)}%)</label>
          </div>
          <div className="result-item">
            <label className="result-title"> Candle Length: </label>
            <label className="result-output">{trade.candleLength}</label>
          </div>
        </div>
      </div>
      
    </CSS>
  )
}

export default Trade;