import React, {useState, useContext} from 'react';
import styled from "styled-components";
import { SearchResults } from './SearchResults';

import { GlobalContext } from '../context/GlobalState';

const CSS = styled.div`
  *{
    font-family: 'Lato', sans-serif; 
  }

  .title{
    font-size: 28px; 
    font-weight: 300; 
    color: #dedfe4;

    position: absolute;
    padding-left: 115px;
    top: 25px;
  }
  .search {
    &__container {
        width:55%;
        float:left;
        padding-left: 20%;
        padding-top: 0px;
    }
    
    &__title {
      font-size: 28px; 
      font-weight: 300; 
      text-align: left;
      color: #dedfe4;

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

        
        &::placeholder {
            color: #898996;
            text-transform: uppercase;
            font-weight: 520;
            letter-spacing: 1.5px;
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
    padding: 15px 24px;
  }

  .credits{
    float:right;
    width: 15%;
    font-size: 15px;
    font-weight: 350;
    text-align: center;
    color: white;
    padding-top: 35px
  }

  
  
  background: #32323b;
  .header{
    width:100%;
    height: 100px;
    z-index:99;
    position: fixed;
    background: #32323b;
  }

  .search-credits{
    width:80%;
    float:right;
  }
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
      <nav className="header">
      
        <img className="logo-img" src="icons8-money-80.png" alt=""/>
        <div className="title" >AlgoTrade</div>
          

        <div className="search-credits">
          <div className="search__container"> 
            <form  onSubmit={onSubmit}>
              <label className="search__title" style={{paddingLeft:80}}>Search Company:</label>
              <input className="search__input" type="text" placeholder="Search Tickers..." onChange={(e) => setSearch(e.target.value)}/>
              
            </form>
            <SearchResults />
          </div>


          <div className="credits">
             <a className="" href="https://www.linkedin.com/in/john-duan/" rel="noreferrer" target="_blank" style={{color:"#61dafb"}}> By Han</a>
          </div>
        </div>

      </nav>
    </CSS>
  )
}
