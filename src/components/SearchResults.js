import React, { useContext } from 'react';
import { SearchItem } from './SearchItem';

import { GlobalContext } from '../context/GlobalState';

export const SearchResults = () => {
  const { symbol_list } = useContext(GlobalContext);

  return (
    <>
      {symbol_list.map(mySymbol => (<SearchItem key={mySymbol.symbol} mySymbol={mySymbol} />))}
    </>
  )
}