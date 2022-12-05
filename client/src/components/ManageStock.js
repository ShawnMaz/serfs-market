import React, {useState} from "react";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_STOCKS } from "../utils/queries";
import { BUY_STOCK, SELL_STOCK } from "../utils/mutations";

const ManageStocks= () => {

    const { loading, data } = useQuery(QUERY_STOCKS)
    const allStocks = data?.stocks || [];

    const [ purchaseStock ] = useMutation(BUY_STOCK)
    const handleClick = async () => {
        try {
          await purchaseStock({
            variables: { id: allStocks._id }
          });
        } catch (e) {
          console.log(e);
        }
      }
    if(loading) {
        <h2>LOADING...</h2>
    }
return (
    <section>
            <h2>
                Current Stocks
            </h2>

            <ul>
                {allStocks.map((stock) => (
                    <li key={stock._id}>
                    {stock.name}
                    {stock.price}
                    {stock.description}
                    <button onClick={handleClick}>Buy</button>
                    </li>
                ))}
            </ul>
    </section>
)
}

export default ManageStocks;