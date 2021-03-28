import React, {useState, useContext} from 'react';
import styled from "styled-components";
import { SearchResults } from './SearchResults';

import { GlobalContext } from '../context/GlobalState';

const CSS = styled.div`

  .search {
    &__container {
        padding-top: 10px;
        padding-right: 9%;
    }
    
    &__title {
        font-family: 'Lato', sans-serif; 
        font-size: 28px; 
        font-weight: 300; 
        text-align: center;
        color: #dedfe4;

        @media only screen and (max-width: 768px) {
          padding: 0%;
          font-size: 0%;
        }
    }
    
    &__input {
        width: 100%;
        padding: 2.5% 4%;

        background-color: transparent;
        transition: transform 250ms ease-in-out;
        font-size: 12px;
        line-height: 15px;
        
        color: #898996;
        text-transform: uppercase;
        font-weight: 520;
        letter-spacing: 1.5px;
        background-color: transparent;
 
        background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-size: 18px 18px;
        background-position: 97% center;
        border-radius: 50px;
        border: 1px solid #4f4f62;
        transition: all 250ms ease-in-out;
        backface-visibility: hidden;
        transform-style: preserve-3d;

        @media only screen and (max-width: 768px) {
          width: 200%;
        }
        
        &::placeholder {
            color: #898996;
            text-transform: uppercase;
            font-weight: 520;
            letter-spacing: 1.5px;
            @media only screen and (max-width: 768px) {
              font-size: 0%;
            }
        }
        
        &:hover,
        &:focus {
            padding: 12px 0;
            outline: 0;
            border: 1px solid transparent;
            border-bottom: 1px solid #4f4f62;
            border-radius: 0;
            background-position: 100% center;
        }
    }
  }

  .logo-img{
    width: 115px;
    padding: 12px 24px;
    @media only screen and (max-width: 768px) {
      width: 15%;
      padding: 2%;
    }
  }

  .credits{
    padding-top: 10px;
    padding-right: 2%;
    font-size: 15px;
    font-weight: 350;
    text-align: center;
    color: white;
    @media only screen and (max-width: 768px) {
      padding: 0 0 0 60%;
      font-size: 80%;
    }
  }

  background: #373641;

`;

export const Header = () => {
  const [text, setSearch] = useState('');

  const { stockSearch } = useContext(GlobalContext);

  //running search for stocks
  const onSubmit = e  => {
    e.preventDefault();

    const searchInput = { text: text };
    if(!(searchInput.text.length===0))
      stockSearch(searchInput);
  }

  return (
    <CSS>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossOrigin="anonymous"></link>
        
      <nav className="navbar">
      
        <img className="logo-img" src="cs-chart.png" alt=""/>
        <label className="search__title" >PeakTrades</label>
          
        <div className="col-4 center search__container"> 
          <form  onSubmit={onSubmit}>
            <label className="search__title">Search Comapny:</label>
            <input className="search__input" type="text" placeholder="Search Tickers..." onChange={(e) => setSearch(e.target.value)}/>
            
          </form>
          <SearchResults />
        </div>
        <h6 className="credits">
          by <a className="" href="https://www.linkedin.com/in/benshiao" rel="noreferrer" target="_blank">Benjamin Shiao</a>
        </h6>

      </nav>
    </CSS>
  )
}
