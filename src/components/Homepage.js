import React, {useContext} from 'react';
import styled from "styled-components";
import uuid from 'uuid';
import { GlobalContext } from '../context/GlobalState';

const CSS = styled.div`
  .main-box{
    color: #898996;
    display:flex;

    padding: 5%;
    margin: 0%;
    padding-top: 140px;

    .intro-text{  
      padding-top: 8%;
      text-align: center;
      .intro-text-p{
        color: #898996;
        font-size: 22px;
      }
      h4{
        font-size: 30px;
        color: #dedfe4;
      }
    }

    .howto-text{  
      padding-top: 4%;
      width: 50%;
      text-align: center;
      p{
        color: #898996;
        font-size: 16px;
      }
      h4{
        font-size: 180%;
        color: #dedfe4;
      }
    }
    .img-chart{
      z-index:0;
      width: 50%;
      transform: perspective(700px) rotateY(-10deg);
      box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
    }
    .img-backtest{

      z-index:0;
      width: 50%;
      transform: perspective(700px) rotateY(10deg);
      box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
    }

  }

  //Try it button CSS
  
.share-button {
  width: 280px;
  height: 40px;

  color: #373641;
  background: #dedfe4;

  border-radius: 7px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  //padding: 0 50px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  margin: auto;
  transition: .3s linear;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}
.share-button:hover{
  transform: scale(1.1);
}
.share-button span{
  position: absolute;
  width: 100%;
  height: 100%;

  background: #898996;
  color: #3d3d4a;
  padding-top: 5px;
  font-size: 20px;

  text-align: center;
  z-index: 1;
  transition: .2s linear;
  border-radius: 7px;
 
}
.share-button:focus span{
  transform: translateX(-100%);
  transition-delay: .3s;
}
.share-button-p{
  padding-top: 16px;
  font-size: 16px;
}


`;

export const Homepage = () => {
  const { graphSymbol, addBacktest } = useContext(GlobalContext);

  return (
    <CSS>
      <div className="main-box"> 
        <div className="intro-text">
          <h4>PeakTrades</h4>
          <p className="intro-text-p">
            Simple, yet powerful tool to run backtests for algorithm trading strategies and to visualize stock market data.
          </p>
          {/** This button will graph SPY and run a BB backtest */}
          <button className="share-button" onClick={() => {
              graphSymbol("SPY", "S&P 500 ETF TRUST ETF", "year", true);
              addBacktest({
                id: uuid(),
                indicator: "BBANDS",
                immediatelyCalculate: true
              });
            }}>
            <span>See Example ➤</span>
            <p className="share-button-p">Running Backtest on SPY...</p>
          </button>
        </div>
        <img className="img-chart" src="chart-img.png" alt=""/>
      </div>
      <div className="main-box"> 
        <img className="img-backtest" src="backtest-img.png" alt=""/>
        <div className="howto-text">
          <h4>How Does it Work?</h4>
          <p>
            <br/>
            Search a US listed stock ticker and select a company to visualize their historic stock market data on an 
            interactive candlestick chart.
            <br/><br/>
            Select a{" "}
            <a className="" href="https://www.investopedia.com/terms/t/technicalindicator.asp" rel="noreferrer" target="_blank">technical indicator</a> 
            {" "}to create a customizable{" "}
            <a className="" href="https://www.investopedia.com/terms/b/backtesting.asp" rel="noreferrer" target="_blank">backtest</a> 
            {" "}to visualize the results of your strategy. 
            <br/><br/>
            Create multiple {" "}
            <a className="" href="https://www.investopedia.com/terms/b/backtesting.asp" rel="noreferrer" target="_blank">backtests</a>  
            {" "}and compare your algorithms using different indicators across different stocks.
          </p>
        </div>
      </div>
    </CSS>
  )
}
