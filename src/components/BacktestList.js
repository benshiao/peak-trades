import React, { useContext } from 'react';
import styled from "styled-components";
import { Backtest } from './Backtest';
import { Homepage } from './Homepage';
import { GlobalContext } from '../context/GlobalState';

const CSS = styled.div`
  margin: 0% 3% 0% 3%;
  padding: 1%;

  background: #373641;
  border-radius: 10px;

  h3{
    font-family: 'Lato', sans-serif; 
    font-size: 28px; 
    font-weight: 300; 
    text-align: left;
    color: #dedfe4;
  }

`;

export const BacktestList = () => {
  const { backtests, current_symbol } = useContext(GlobalContext);


  if(current_symbol.length>0){
    return (
      <>
        {backtests.length>0?
          <CSS>
            <h3>Backtest Strategy Testing</h3>
            {backtests.map(backtest => (<Backtest key={backtest.id} backtest={backtest} />))}
          </CSS>
        :
          <></>
        }
        

        <Homepage/>
      </>
      )
    }else{
      return (
        <Homepage/>
      )
    }
}
