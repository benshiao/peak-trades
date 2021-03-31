import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

// AlphaVantage API Key = CQ5JZQYM4DG0OODA

// Initial state
const initialState = {
    backtests: [],     // starter code thing, can delete later
    symbol_list: [],      // user input search results (1 API call)
    graphData_AV_API: {}, // graphs historical stock data (1 API call)
    current_symbol: '',   // current stock symbol being graphed
    current_company: '',  // current stock company name being graphed
    graph_type: '',       // tracks graph type for graphSection.js to know to add proper amount of candles to chart
    cache_TSDA: {},        // cache AV_API for time series daily adjusted until user changes stock view(prevents unnecssary API calls)
    cache_TS15min: {},        // cache AV_API for time series 15 min until user changes stock view(prevents unnecssary API calls)
    cache_TS60min: {}        // cache AV_API for time series 60 min until user changes stock view(prevents unnecssary API calls)
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Actions
    function deleteBacktest(id) {
        dispatch({
        type: 'DELETE_BACKTEST',
        payload: id
        });
    }

    function addBacktest(backtest) {
        dispatch({
        type: 'ADD_BACKTEST',
        payload: backtest
        });
    }

    async function cache_TSDA_function(data) {
        // If API limit: Alerts API limit reached, maintains current payload(stock data)
        // Else: update current payload
        if(data.Note){
            alert("MAX API CALLS. Please wait a minute for more. PeakTrades was built using Alpha Vantage's free API where the call frequency is 5 calls per minute.");
            dispatch({
                type: 'MAX_API',
                payload: data
            });
        }else{
            dispatch({
                type: 'FILL_CACHE_TSDA',
                payload: data
            });
        }
    }

    // User clicks outside search results
    async function clearSearch(searchInputClear) {
        dispatch({
            type: 'STOCK_SEARCH',
            payload: []
        });
    }

    // Updates search results from API when user searches for a stock
    async function stockSearch(searchInput) {
        //API call for searching stock tickers
        let response = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchInput.text}&apikey=CQ5JZQYM4DG0OODA`);
        let data = await response.json();

        //create temp list
        let new_symbol_list = [];

        // If API limit: alerts, maintains current results(if any)
        // Else: updates search results display properly
        if(data.Note){
            alert("MAX API CALLS. Please wait a minute for more. Thank you for visitng my project! However, it was built using Alpha Vantage's standard API where the call frequency is 5 calls per minute and 500 calls per day.");
            // Maintains current search results
            dispatch({
                type: 'MAX_API',
                payload: new_symbol_list
            });
        }else{
        //iterate over all search results
        Object.keys(data.bestMatches).forEach( (e) => {
            //filter non-US stocks, then add
            if(data.bestMatches[e]["4. region"] === "United States"){
            let new_symbol = {
                symbol: data.bestMatches[e]["1. symbol"],
                name: data.bestMatches[e]["2. name"]
            }
            new_symbol_list = [new_symbol, ...new_symbol_list];
            }
        });
        new_symbol_list.reverse();
        //update state of web app (official symbol_list)
        dispatch({
            type: 'STOCK_SEARCH',
            payload: new_symbol_list
        });
        }
    }

    // Graphs API data based on user selected stock symbol
    async function graphSymbol(selectedSymbol, selectedCompany, graphType, doClearCache) {
        // Clear cache for new symbol search
        if(doClearCache){
            state.cache_TSDA = {};
            state.cache_TS15min = {};
            state.cache_TS60min = {};
        }

        // Specific API call parameters
        let function_API;
        let outputSize;
        let interval_API = '';
        let cache_exists = false;
        let data;
        let response;
        switch(graphType){
            case 'day':
                if(state.cache_TS15min['Time Series (15min)']){
                    cache_exists = true;
                    data = state.cache_TS15min;
                }else{
                    function_API = 'TIME_SERIES_INTRADAY';
                    interval_API = '&interval=15min';
                    outputSize = 'compact';
                }
                break;
            case 'week':
                if(state.cache_TS60min['Time Series (60min)']){
                    cache_exists = true;
                    data = state.cache_TS60min;
                }else{
                    function_API = 'TIME_SERIES_INTRADAY';
                    interval_API = '&interval=60min';
                    outputSize = 'compact';
                }
                break;
            default:
                if(state.cache_TSDA['Time Series (Daily)']){
                    cache_exists = true;
                    data = state.cache_TSDA;
                }else{
                    function_API = 'TIME_SERIES_DAILY_ADJUSTED';
                    outputSize = 'full';
                }
        }
        if(!cache_exists){
            response = await fetch(`https://www.alphavantage.co/query?function=${function_API}&symbol=${selectedSymbol}${interval_API}&outputsize=${outputSize}&apikey=CQ5JZQYM4DG0OODA`);
            data = await response.json();
        }



        // If API limit: Alerts API limit reached, maintains current payload(stock data)
        // Else: update current payload
        if(data.Note){
            alert("MAX API CALLS. Please wait a minute for more. Thank you for visitng my project! However, it was built using Alpha Vantage's standard API where the call frequency is 5 calls per minute and 500 calls per day.");
            dispatch({
                type: 'MAX_API',
                payload: [graphType,data]
            });
        }else if(data['Error Message']){
            alert("ERROR. This stock does not have valid data in the Alpha Vantage database.");
            dispatch({
                type: 'MAX_API',
                payload: [graphType,data]
            });
        }else{
            dispatch({
                type: 'DISPLAY_GRAPHS',
                payload: [graphType,data, selectedCompany]
            });
        }
    }

    return (<GlobalContext.Provider value={{
        backtests: state.backtests,
        symbol_list: state.symbol_list,
        graphData_AV_API: state.graphData_AV_API,
        current_symbol: state.current_symbol,
        current_company: state.current_company,
        cache_TSDA: state.cache_TSDA,
        cache_TS15min: state.cache_TS15min,
        cache_TS60min: state.cache_TS60min,
        graph_type: state.graph_type,
        deleteBacktest,
        addBacktest,
        clearSearch,
        stockSearch,
        graphSymbol,
        cache_TSDA_function
    }}>
        {children}
        
    </GlobalContext.Provider>);
}
