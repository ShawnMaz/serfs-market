import React, { createContext, useContext } from "react";
import { useStockReducer } from "./reducers";

const StockContext = createContext();
const { Provider } = StockContext;

const StockProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useStockReducer({
    stocks: [],
    event: [],
    stockEntry: [],
  });

  console.log(state);

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStockContext = () => {
  return useContext(StockContext);
};

export { StockProvider, useStockContext };
