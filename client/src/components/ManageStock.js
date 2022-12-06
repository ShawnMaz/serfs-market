import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_STOCKS, QUERY_USER } from "../utils/queries";
import { BUY_STOCK, SELL_STOCK } from "../utils/mutations";

const ManageStocks = ({ stock }) => {
  const [quantity, setQuantity] = useState(1);
  console.log(stock);

  // , {
  //   refetchQueries: [{query:QUERY_USER}]
  // }
  const [purchaseStock] = useMutation(BUY_STOCK);
  const buyClick = async (e) => {
    const id = e.target.dataset.id;
    console.log(e.target.dataset.id);
    try {
      await purchaseStock({
        variables: { stockId: id, qty: parseInt(quantity) },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const [sellStock] = useMutation(SELL_STOCK);
  const sellClick = async (e) => {
    const id = e.target.dataset.id;
    console.log(e.target.dataset.id);
    try {
      await sellStock({
        variables: { stockId: id, qty: parseInt(quantity) },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section>
      {/* <h2>
                Current Stocks
            </h2>

            <ul>
                {allStocks.map((stock) => (
                    <li key={stock._id} >
                    {stock.stockName}
                    {stock.stockPrice}
                    {stock.stockDescription}
                    <input value={quantity} onChange={(e)=> setQuantity(e.target.value)}/>
                    <button onClick={handleClick} data-id={stock._id}>Buy</button>
                    </li>
                ))}
            </ul> */}


      <div>
        {stock.stockCategory}, {stock.stockName}, ${stock.stockPrice},{" "}
        {stock.stockDescription}
      </div>
      <div>
        <span>Qty:</span>
        <input
          type="number"
          placeholder=""
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button onClick={buyClick} data-id={stock._id}>
          Buy
        </button>
        <button onClick={sellClick} data-id={stock._id}>
          Sell
        </button>
      </div>
    </section>
  );
};

export default ManageStocks;
