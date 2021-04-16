import React from 'react';
import styled from "styled-components";

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
    .result-title-profit{
      text-align: left;
      color: #898996;
      font-size: 12px;
      width: 1%;

    }
    .result-output-profit{
      text-align: right;
      color: #dedfe4;
      font-size: 14px;
      width: 99%;

    }
  `;

const Trade = props => {
  const { trade } = props;

  return (
    <CSS>
      <div className="trade-card">
        <div className="trade-card-sub">
          <div className="result-item">
            <label className="result-title">Buy Date: </label>
            <label className="result-output">{trade.buyDate}</label>
          </div>
          <div className="result-item">
            <label className="result-title">Buy Price: </label>
            <label className="result-output">{trade.buyPrice}</label>
          </div>
          <div className="result-item">
            <label className="result-title">Indicator Value at Buy: </label>
            <label className="result-output">{trade.indicatorAtBuy.toFixed(2)}</label>
          </div>
        </div>
        <div className="trade-card-sub">
          <div className="result-item">
            <label className="result-title">Sell Date:</label>
            <label className="result-output">{trade.sellDate}</label>
          </div>
          <div className="result-item">
            <label className="result-title">Sell Price: </label>
            <label className="result-output">{trade.sellPrice}</label>
          </div>
          <div className="result-item">
            <label className="result-title">Indicator Value at Sell: </label>
            <label className="result-output">{trade.indicatorAtSell.toFixed(2)}</label>
          </div>
        </div>
        <div className="trade-card-sub">
          <div className="result-item">
            <label className="result-title" data-tooltip="Number of shares for trade." data-tooltip-location="left">Num of Shares:</label>
            <label className="result-output"> {trade.numShares.toFixed(2)}</label>
          </div>
          <div className="result-item">
            <label className="result-title-profit" data-tooltip="Profit from this position." data-tooltip-location="left">Profit: </label>
            <label className="result-output-profit">${trade.profitUSD.toFixed(2)}({trade.profitPercent>0?"+":""}{(trade.profitPercent*100).toFixed(2)}%)</label>
          </div>
          <div className="result-item">
            <label className="result-title" data-tooltip="Number of days between opening and closing this position."> Num Candles in Trade: </label>
            <label className="result-output">{trade.candleLength}</label>
          </div>
        </div>
      </div>
      
    </CSS>
  )
}

export default Trade;