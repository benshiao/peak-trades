import styled from "styled-components";

const CSS = styled.div`


  .main-box{
    color: #898996;
    display:flex;

    padding: 5%;
    margin: 0%;

    .intro-text{  
      padding-top: 8%;
      text-align: center;
      p{
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

`;

export const Homepage = () => {
  return (
    <CSS>
      <div className="main-box"> 
        <div className="intro-text">
          <h4>PeakTrades</h4>
          <p>
            Simple, yet powerful tool to run backtests for algorithm trading strategies and to visualize stock market data.
          </p>
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
