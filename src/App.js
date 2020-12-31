import React from 'react';
import { Header } from './components/Header';
import { Balance } from './components/Balance';
import { IncomeExpenses } from './components/IncomeExpenses';
import { TransactionList } from './components/TransactionList';
import { AddTransaction } from './components/AddTransaction';
import { SearchResults } from './components/SearchResults';
import { GraphSection } from './components/GraphSection';

import { GlobalProvider } from './context/GlobalState';

import './App.css';

function App() {
  return (
    <GlobalProvider>
      <Header />
      <SearchResults />
      <GraphSection />
      <Balance />
      <IncomeExpenses />
      <TransactionList />
      <AddTransaction />
    </GlobalProvider>
  );
}

export default App;

/*
import React, { useRef } from 'react';
import { select } from "d3";

line 15->
const svgRef = useRef();
useEffect( () = > {
  consolglog(svgref)
  const svg = select(svgRef.current);//now can use all d3 commands and stuff
  svg.selectAll("circle").data(data)
    .join(
      enter => enter.append("circle")     //effects circles we add
        .attr("r", value => value)
        .attr("cx", value => value*2)
        .attr("cy", value => value*2)
        .attr("stroke", "red"),
      update => update.attr("class", "updated"),    //effects circles that we update(exist in html alr)
      exit => exit.remove()                         //delete else, or remove
    )                                               //add .attr here to effect ALL circles

}, []);

html-->
<svg ref = {svgRef}> </svg>
*/