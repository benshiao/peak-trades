import React, {useContext} from 'react';
import styled from "styled-components";
import { GlobalContext } from '../context/GlobalState';

const CSS = styled.div`
  width: fit;
  background: transparent;

  .search-item{
    width:100%;
    @media only screen and (max-width: 768px) {
      width: 200%;
    }
    border:none;

    border-bottom: 1px solid black;
    background: #373641;
    padding: 16px;
    padding-bottom: 5px;
    font-size: 16px;

    text-align: left;
    color: #dedfe4;
    text-transform: uppercase;
    font-weight: 420;
    letter-spacing: 1.5px;      

    &:focus, &:hover{
      outline: none;
      background: #3d3d4a;
    }
  }

  .company-name{
    color: #898996;
    text-transform: capitalize;
  }
`;

//graphSymbol(mySymbol.symbol, 'day', true)
export const SearchItem = ({ mySymbol }) => {
  const { graphSymbol } = useContext(GlobalContext);
  console.log(mySymbol.symbol, mySymbol.name);
  return (
    <div>
      <CSS>
        <button className="search-item" onClick={() => graphSymbol(mySymbol.symbol, mySymbol.name, 'day', true)}>
          <p>({mySymbol.symbol})<span className="company-name"> {mySymbol.name}</span></p>
        </button>
      </CSS>
    </div>
  )
}
