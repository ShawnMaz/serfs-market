import { useReducer } from "react";

import { 
    UPDATE_STOCK,
    UPDATE_STOCK_ENTRY,
    UPDATE_EVENT
} from './actions';

export const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_EVENT:
            return {
                ...state,
                event: [...action.event]
                }
        case UPDATE_STOCK:
            return {
                ...state,
                stocks: state.stocks.map((stock) => {
                    if(action._id === stock._id) {
                        stock.stockPrice = action.stockPrice;
                    }
                    return stock;
                })
            }
        case UPDATE_STOCK_ENTRY:
            return {
                ...state,
                stockEntry: state.stockEntry.map((stockEntry) => {
                    if(action.stockId === stockEntry.stockId) {
                        stockEntry.quantity = action.quantity
                    }
                    return stockEntry;
                })
            }
        default:
            return state;
    }
}

export function useStockReducer(initialState) {
    return useReducer(reducer, initialState);
  }