const logger = (state, action) => {
  switch(action.type) {
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(transaction => transaction.id !== action.payload)
      }
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions]
      }
    case 'STOCK_SEARCH':
      return {
        ...state,
        graphData_AV_API: state.graphData_AV_API,
        symbol_list: action.payload
      }
    case 'DISPLAY_GRAPHS':
      return {
        ...state,
        graphData_AV_API: action.payload,
        symbol_list: []
      }
    default:
      return state;
  }
}

export default logger;
