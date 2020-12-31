import React, {useContext} from 'react';
import { GlobalContext } from '../context/GlobalState';

export const SearchItem = ({ mySymbol }) => {
  const { graphSymbol } = useContext(GlobalContext);

  return (
    <div className='card mb-1 center'>
      <button onClick={() => graphSymbol(mySymbol.symbol)} className="text-info bg-dark">
        <p><span className='text-warning'>({mySymbol.symbol}) </span>{mySymbol.name}</p>
      </button>
    </div>
  )
}
