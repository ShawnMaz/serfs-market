import React from "react";

const MyPortfolio= ({profile, stocks}) => {
    const findStockPrice = (id) => {
        const index = stocks.findIndex(index => index._id === id);
        if (stocks[index]) {
            return stocks[index].stockPrice * stocks[index].multiplier;
        }
    }

return (
    <section className='myPortfolio'>
        <ul>
            {profile.portfolio && profile.portfolio.length ? profile.portfolio.map((ownedStock) => (
                <li key={ownedStock.stockId}>
                Stock Name: {ownedStock.stockName} <br/>
                Qty: {ownedStock.quantity} <br/>
                Current Worth: ${ownedStock.quantity * findStockPrice(ownedStock.stockId)} ({ownedStock.quantity} at value of ${findStockPrice(ownedStock.stockId)})
                </li>
            )):<p>You're empty-handed!</p>}
        </ul>
    </section>
)
}

export default MyPortfolio;
