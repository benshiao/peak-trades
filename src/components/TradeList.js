import React from 'react';
import Trade from './Trade';

const TradeList = props => {
  const { tradeList } = props;
  let myId = 0;
  return (
    <>
      {tradeList.map(trade => (<Trade key={myId++} trade={trade} />))}
    </>
  )
}

export default TradeList;