import React, {useState} from "react";
import { useMutation, useQuery } from "@apollo/client";
import { BUY_STOCK, SELL_STOCK } from "../utils/mutations";

const ManageStocks= ({stock}) => {

    const [ quantity, setQuantity ] = useState(1)
    // , {
    //   refetchQueries: [{query:QUERY_USER}]
    // }
    const [ purchaseStock ] = useMutation(BUY_STOCK)
    const buyClick = async (e) => {
      const id = e.target.dataset.id
        try {
          await purchaseStock({
            variables: { stockId: id, qty: parseInt(quantity) }
          }); 

        } catch (e) {
          console.log(e);
        }
      }


    const [ sellStock ] = useMutation(SELL_STOCK)
    const sellClick = async (e) => {
      const id = e.target.dataset.id
        try {
          await sellStock({
            variables: { stockId: id, qty: parseInt(quantity) }
          }); 

        } catch (e) {
          console.log(e);
        }
      }

return (
    <section>

        <div>{stock.stockCategory}, {stock.stockName}, ${stock.stockPrice}, {stock.stockDescription}</div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder=""
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button onClick={buyClick} data-id={stock._id}>Buy</button>
          <button onClick={sellClick} data-id={stock._id}>Sell</button>
        </div>
        <div>

        </div>
    </section>
)
}

export default ManageStocks;