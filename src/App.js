import React from 'react';
import { Header } from './components/Header';
import { BacktestList } from './components/BacktestList';
import { AddBacktest } from './components/AddBacktest';
import { GraphSection } from './components/GraphSection';
import styled from "styled-components";

import { GlobalProvider } from './context/GlobalState';

import './App.css';


const CSS = styled.div`
  // background: linear-gradient(-75deg, #9dc88d, #4d774e, #164a41);
  // background-size: 100% 200%;

  background: #3d3d4a;
  }
`;

function App() {
  return (
    <GlobalProvider>
      <CSS>
      <Header />
      <GraphSection />
      <AddBacktest />
      <BacktestList />
      </CSS>
    </GlobalProvider>
  );
}

export default App;

