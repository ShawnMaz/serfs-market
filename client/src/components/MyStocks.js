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
   


    const findIndex = (id) => {
        const index = stocks.findIndex(index => index._id === id)
        return stocks[index].stockPrice;
    }
    // console.log(profile)

return (
    <section className='myPortfolio'>
        <ul>
            {profile.portfolio ? profile.portfolio.map((ownedStock) => (
                <li key={ownedStock.stockId}>
                Stock Name: {ownedStock.stockName} <br/>
                Qty: {ownedStock.quantity} <br/>
                Current Worth: { (ownedStock.quantity) } {/* todo: query stock from ID, multiply by value and multiplier */}
                </li>
            )): null}
        </ul>
    </section>
)
}

export default MyPortfolio;