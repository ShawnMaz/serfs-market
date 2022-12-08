import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { BUY_STOCK, SELL_STOCK } from "../utils/mutations";

const ManageStocks= ({stock}) => {
    // functions to clear useState
    function removeSaleError() {
      setSaleError(false);
    }
    function removeBuyError() {
      setBuyError(false);
    }
    function removeSoldMsg() {
      setSoldStock(false);
    }
    function removeBoughtMsg() {
      setBoughtStock(false);
    }

    const [ quantity, setQuantity ] = useState(1)
    // , {
    //   refetchQueries: [{query:QUERY_USER}]
    // }
    const [ buyError, setBuyError ] = useState(false);
    const [ boughtStock, setBoughtStock ] = useState(false);
    const [ purchaseStock ] = useMutation(BUY_STOCK)
    const buyClick = async (e) => {
      const id = e.target.dataset.id
        try {
          await purchaseStock({
            variables: { stockId: id, qty: parseInt(quantity) }
          }); 
          setBuyError(false);
          setBoughtStock(true);
          setTimeout(removeBoughtMsg, 1000)
        } catch (e) {
          console.log(e);
          setBuyError(true);
          setTimeout(setBuyError, 1000)
        }
      }

    const [ saleError, setSaleError ] = useState(false);
    const [ soldStock, setSoldStock ] = useState(false);
    const [ sellStock ] = useMutation(SELL_STOCK)
    const sellClick = async (e) => {
      const id = e.target.dataset.id
        try {
          await sellStock({
            variables: { stockId: id, qty: parseInt(quantity) }
          });
          setSaleError(false);
          setSoldStock(true);
          setTimeout(removeSoldMsg, 1000)
        } catch (e) {
          console.log(e);
          setSaleError(true);
          setTimeout(setSaleError, 1000)
        }
      }

return (
    <section>
        <div>{stock.stockCategory}, {stock.stockName}, ${stock.stockPrice * stock.multiplier}, {stock.stockDescription}</div>
        <div className='manageStock'>
          <span>Quantity</span>
          <input
            type='number'
            placeholder='1'
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          {buyError && <p>Can't buy stock!</p>}
          {saleError && <p>Can't sell stock!</p>}
          {boughtStock && <p>Stock purchased!</p>}
          {soldStock && <p>Stock sold!</p>}
          <div className='manageStockButton'>
            <button onClick={buyClick} data-id={stock._id}>Buy</button>
            <button onClick={sellClick} data-id={stock._id}>Sell</button>
          </div>
        </div>
        <div>
        </div>
    </section>
)
}

export default ManageStocks;