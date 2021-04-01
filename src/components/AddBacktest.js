import React, {useContext} from 'react';
import styled from "styled-components";
import uuid from 'uuid';
import { GlobalContext } from '../context/GlobalState';


const CSS = styled.div`
  margin: 3% 3% 0% 3%;
  padding: 1%;

  h3{
    font-family: 'Lato', sans-serif; 
    font-size: 28px; 
    font-weight: 300; 
    text-align: left;
    color: #dedfe4;
  }
  
  .btn {
    font-size: 80%;
    font-family: 'Lato', sans-serif; 
    text-align: center;
    justify-content: center;
    align-items: center;
    position: relative;
    color: white;
    width: 300px;
    height: 70px;
    padding: none;
    margin: 1%;
    padding: 0% 1%;
    transition: all 0.3s;
    span {
      transition: all 0.3s;
      tranform: scale(1, 1);
    }
  }
    
  .btn::before, .btn::after {
    content: '';
    position: absolute;
    transition: all 0.3s;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .btn-one::before {
    left: 4px;
    z-index: 1;
    
    opacity: 0;
    background: rgba(255, 255, 255, 0.1);
    transform: scale(0.1, 1);
  }

  .btn-one:hover::before {
    opacity: 1;
    transform: scale(1, 1);
  }

  .btn-one::after {
    transition: all 0.3s;
    border: 1px solid rgba(255, 255, 255, 0.5);
  }

  .btn-one:hover::after {
    transform: scale(1, .1);
    opacity: 0;
  }
  .btn-text{
    width:90%;
    color: #dedfe4;
    display:inline;
  }
  .plus-icon{
    filter: invert(1);
    width: 8%;
    vertical-align: -30%;
    margin-right: 3%;
  }

  background: #373641;
  border-radius: 10px;
`;

export const AddBacktest = () => {
  const { addBacktest, current_symbol } = useContext(GlobalContext);

  const onSubmit = (indicator) => {
    const newBacktest = {
      id: uuid(),
      indicator
    }
    addBacktest(newBacktest);
  }


  if(current_symbol.length>0){
    return (
      <CSS>
        <h3>Select Technical Indicator(s)</h3>
        <button className="btn btn-one" onClick={() => onSubmit('RSI')}>
          <img className="plus-icon" src="https://img.icons8.com/android/24/000000/plus.png" alt=""/>
          <div className="btn-text">Relative Strength Index (RSI)</div>
        </button>
        <button className="btn btn-one" onClick={() => onSubmit('EMA')}>
          <img className="plus-icon" src="https://img.icons8.com/android/24/000000/plus.png" alt=""/>
          <div className="btn-text">Exponential Moving Average (EMA)</div>
        </button>
        <button className="btn btn-one" onClick={() => onSubmit('SMA')}>
          <img className="plus-icon" src="https://img.icons8.com/android/24/000000/plus.png" alt=""/>
          <div className="btn-text">Simple Moving Average (SMA)</div>
        </button>
        <button className="btn btn-one" onClick={() => onSubmit('BBANDS')}>
          <img className="plus-icon" src="https://img.icons8.com/android/24/000000/plus.png" alt=""/>
          <div className="btn-text">Bollinger Bands (BB)</div>
        </button>
      </CSS>
      )
    }else{
      return (
        <>
        {/** make a <about> element that  */}
        </>
      )
    }
}
