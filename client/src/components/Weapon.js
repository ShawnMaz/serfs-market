import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { BUY_STOCK, SELL_STOCK } from "../utils/mutations";

const Weapon = ({ weapon }) => {

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

  const [quantity, setQuantity] = useState(1);
  const [buyError, setBuyError] = useState(false);
  const [boughtStock, setBoughtStock] = useState(false);
  const [purchaseStock] = useMutation(BUY_STOCK);
  const buyClick = async (e) => {
    const id = e.target.dataset.id;
    try {
      await purchaseStock({
        variables: { stockId: id, qty: parseInt(quantity) },
      });
      setBuyError(false);
      setBoughtStock(true);
      setTimeout(removeBoughtMsg, 1000);
    } catch (e) {
      console.log(e);
      setBuyError(true);
      setTimeout(removeBuyError, 1000);
    }
  };

  const [saleError, setSaleError] = useState(false);
  const [soldStock, setSoldStock] = useState(false);
  const [sellStock] = useMutation(SELL_STOCK);
  const sellClick = async (e) => {
    const id = e.target.dataset.id;
    try {
      await sellStock({
        variables: { stockId: id, qty: parseInt(quantity) },
      });
      setSaleError(false);
      setSoldStock(true);
      setTimeout(removeSoldMsg, 1000);
    } catch (e) {
      console.log(e);
      setSaleError(true);
      setTimeout(removeSaleError, 1000);
    }
  };

  return (
    <div className="weap-contain">
      <div className="stock-desc">
        <span className="stock-name">{weapon.stockName}: $
        {weapon.stockPrice * weapon.multiplier}</span>
        <br />
        {weapon.stockDescription}
      </div>
      <div className="manageStock">
        <span>Quantity: </span>
        <input
          type="number"
          placeholder="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        {buyError && <p>Can't buy stock!</p>}
        {saleError && <p>Can't sell stock!</p>}
        {boughtStock && <p>Stock purchased!</p>}
        {soldStock && <p>Stock sold!</p>}
        <div className="manageStockButton">
          <button onClick={buyClick} data-id={weapon._id}>
            Buy
          </button>
          <button onClick={sellClick} data-id={weapon._id}>
            Sell
          </button>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Weapon;
