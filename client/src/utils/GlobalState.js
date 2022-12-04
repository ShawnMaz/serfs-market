import React, { createContext, useContext } from "react";
import { useStockReducer } from "./reducers";

const StockContext = createContext();
const { Provider } = StockContext;

const StockProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useStockReducer({
    stocks: [
        {
            _id: '1',
            stockName: 'Wine',
            stockCategories: 'Luxury',
            stockPrice: 1
        },
        {
            _id: '2',
            stockName: 'Sword',
            stockCategories: 'Weapons',
            stockPrice: 2
        }
    ],
    event: [],
    stockEntry: [
        {
            stockId: '1',
            quantity: 2
        },
        {
            stockId: '2',
            quantity: 1
        }
    ],
  });

  console.log(state);

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStockContext = () => {
  return useContext(StockContext);
};

export { StockProvider, useStockContext };
