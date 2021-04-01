import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BacktestList } from './components/BacktestList';
import { AddBacktest } from './components/AddBacktest';
import { GraphSection } from './components/GraphSection';
import styled from "styled-components";

import { GlobalProvider } from './context/GlobalState';

import './App.css';


const CSS = styled.div`
  background: #3d3d4a;
  margin-bottom: 0px;
  border-bottom: 1px solid transparent;
`;

function App() {
  return (
    <GlobalProvider>
      <CSS>
      <Header />
      <GraphSection />
      <AddBacktest />
      <BacktestList />
      <Footer />
      </CSS>
    </GlobalProvider>
  );
}

export default App;

