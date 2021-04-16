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

  /* Tooltips */

  [data-tooltip] {
    position: relative;
    z-index: 10;
  }
  
  /* Positioning and visibility settings of the tooltip */
  [data-tooltip]:before,
  [data-tooltip]:after {
    position: absolute;
    visibility: hidden;
    opacity: 0;
    left: 50%;
    bottom: calc(100% + 5px); /* 5px is the size of the arrow */
    pointer-events: none;
    transition: 0.2s;
    will-change: transform;
  }
  
  /* The actual tooltip with a dynamic width */
  [data-tooltip]:before {
    content: attr(data-tooltip);
    padding: 10px 18px;
    min-width: 50px;
    max-width: 300px;
    width: max-content;
    width: -moz-max-content;
    border-radius: 6px;
    font-size: 14px;
    background-color: rgba(59, 72, 80, 0.9);
    background-image: linear-gradient(30deg,
      rgba(59, 72, 80, 0.44),
      rgba(59, 68, 75, 0.44),
      rgba(60, 82, 88, 0.44));
    box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.2);
    color: #fff;
    text-align: center;
    white-space: pre-wrap;
    transform: translate(-50%, -5px) scale(0.5);
  }
  
  /* Tooltip arrow */
  [data-tooltip]:after {
    content: '';
    border-style: solid;
    border-width: 5px 5px 0px 5px; /* CSS triangle */
    border-color: rgba(55, 64, 70, 0.9) transparent transparent transparent;
    transition-duration: 0s; /* If the mouse leaves the element, 
                                the transition effects for the 
                                tooltip arrow are "turned off" */
    transform-origin: top;   /* Orientation setting for the
                                slide-down effect */
    transform: translateX(-50%) scaleY(0);
  }
  
  /* Tooltip becomes visible at hover */
  [data-tooltip]:hover:before,
  [data-tooltip]:hover:after {
    visibility: visible;
    opacity: 1;
  }
  /* Scales from 0.5 to 1 -> grow effect */
  [data-tooltip]:hover:before {
    transition-delay: 0.3s;
    transform: translate(-50%, -5px) scale(1);
  }
  /* 
    Arrow slide down effect only on mouseenter (NOT on mouseleave)
  */
  [data-tooltip]:hover:after {
    transition-delay: 0.5s; /* Starting after the grow effect */
    transition-duration: 0.2s;
    transform: translateX(-50%) scaleY(1);
  }
  /* End of tooltips*/
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
          <div className="btn-text" data-tooltip="The relative strength index (RSI) is a momentum indicator used to evaluate overbought or oversold conditions. The RSI is displayed as an oscillator and can have a reading from 0 to 100.">Relative Strength Index (RSI)</div>
        </button>
        <button className="btn btn-one" onClick={() => onSubmit('EMA')}>
          <img className="plus-icon" src="https://img.icons8.com/android/24/000000/plus.png" alt=""/>
          <div className="btn-text" data-tooltip="The expnential moving average (EMA) is a moving average that places a greater weight and significance on the most recent data points.">Exponential Moving Average (EMA)</div>
        </button>
        <button className="btn btn-one" onClick={() => onSubmit('SMA')}>
          <img className="plus-icon" src="https://img.icons8.com/android/24/000000/plus.png" alt=""/>
          <div className="btn-text" data-tooltip="The simple moving average (SMA) calculates the average of a selected range of prices by the number of periods in that range.">Simple Moving Average (SMA)</div>
        </button>
        <button className="btn btn-one" onClick={() => onSubmit('BBANDS')}>
          <img className="plus-icon" src="https://img.icons8.com/android/24/000000/plus.png" alt=""/>
          <div className="btn-text" data-tooltip="The Bollinger Bands are defined by a set of trendlines plotted two standard deviations (positively and negatively) away from a simple moving average (SMA) of a security's price, which can be adjusted to user preferences.">Bollinger Bands (BB)</div>
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
