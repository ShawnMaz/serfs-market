import React from "react";

const MyPortfolio= ({profile, stocks}) => {
    // const { username: useParams } = useParams();
    // const { loading, data } = useQuery(QUERY_USER, {
    //     variables: {username: useParams}
    // });
    // const profile = data?.user || [];

  
    // if(loading) {
    //     <h2>LOADING...</h2>
    // }
    // console.log(stocks)
    // console.log("user", profile.money)

    // const findIndex = (id) => {
    //     const index = stocks.findIndex(index => index._id === id)
    //     return stocks[index].stockPrice;
    // }

    const findStockPrice = (id) => {
        const index = stocks.findIndex(index => index._id === id);
        if (stocks[index]) {
            return stocks[index].stockPrice * stocks[index].multiplier;
        }
    }

    // console.log(profile)

return (
    <section className='myPortfolio'>
        <ul>
            {profile.portfolio && profile.portfolio.length ? profile.portfolio.map((ownedStock) => (
                <li key={ownedStock.stockId}>
                Stock Name: {ownedStock.stockName} <br/>
                Qty: {ownedStock.quantity} <br/>
                Current Worth: {ownedStock.quantity * findStockPrice(ownedStock.stockId)} ({ownedStock.quantity} at value of {findStockPrice(ownedStock.stockId)})
                </li>
            )):<p>You're empty-handed!</p>}
        </ul>
    </section>
)
}

export default MyPortfolio;