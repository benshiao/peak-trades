import React, {useContext} from 'react';
import { GlobalContext } from '../context/GlobalState';

export const GraphSection = () => {
  const { graphData_AV_API } = useContext(GlobalContext);

  //code for graph here -12/28/20
  //refer to balance.js for example, remember imports, js, and html code

  if(false)
    return (
      <div className='card mb-1 center'>
        <p><span className='text-warning'>({graphData_AV_API['Meta Data']['2. Symbol']}) </span></p>
      </div>
    )
  else
    return (<></>)
    //return nothing bc no graphs to display
}
