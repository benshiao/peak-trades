const logger = (state, action) => {
  switch(action.type) {
    case 'DELETE_BACKTEST':
      return {
        ...state,
        backtests: state.backtests.filter(backtest => backtest.id !== action.payload)
      }
    case 'ADD_BACKTEST':
      return {
        ...state,
        backtests: [action.payload, ...state.backtests]
      }
    case 'STOCK_SEARCH':
      return {
        ...state,
        graphData_AV_API: state.graphData_AV_API,
        symbol_list: action.payload,
        current_symbol: state.current_symbol
      }
    case 'MAX_API':
      return {
        ...state
      }
    case 'FILL_CACHE_TSDA':
      return {
        ...state,
        cache_TSDA: action.payload['Time Series (Daily)'] ? action.payload : state.cache_TSDA
      }
    case 'DISPLAY_GRAPHS':
      return {
        ...state,
        graphData_AV_API: action.payload[1],
        symbol_list: [],
        current_symbol: action.payload[1]['Meta Data']['2. Symbol'],
        current_company: action.payload[2],
        cache_TSDA: action.payload[1]['Time Series (Daily)'] ? action.payload[1] : state.cache_TSDA,
        cache_TS15min: action.payload[1]['Time Series (15min)'] ? action.payload[1] : state.cache_TS15min,
        cache_TS60min: action.payload[1]['Time Series (60min)'] ? action.payload[1] : state.cache_TS60min,
        graph_type: action.payload[0]
      }
    default:
      return state;
  }
}

export default logger;
