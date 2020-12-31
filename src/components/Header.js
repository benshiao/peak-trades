import React, {useState, useContext} from 'react'
import { GlobalContext } from '../context/GlobalState';

export const Header = () => {
  const [text, setSearch] = useState('');

  const { stockSearch } = useContext(GlobalContext);

  //running search for stocks, to make crypto, copy paste below and the form element below
  const onSubmit = e  => {
    e.preventDefault();

    const searchInput = { text: text };
    if(!(searchInput.text.length===0))
      stockSearch(searchInput);
  }

  return (
    <nav className="navbar navbar-light bg-dark">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossOrigin="anonymous"></link>

      <div className="container-fluid">
        <p className="navbar-brand text-light mb-4" >Project,link to homepg</p>
        <form className="col-sm-5 center" onSubmit={onSubmit}>
          <label className="text-warning">Search Stock:</label>
          <input className="form-control me-2" type="search" placeholder="Search Stock Tickers/Crypto Pairs" onChange={(e) => setSearch(e.target.value)} aria-label="Search"></input>
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </nav>
  )
}
