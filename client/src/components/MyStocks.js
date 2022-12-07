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
    <section>
        <p>Portfolio</p>
            <ul>
                {profile.portfolio ? profile.portfolio.map((ownedStock) => (
                    <li key={ownedStock.stockId}>
                    {ownedStock.stockName} <br/>
                    {ownedStock.quantity} <br/>
                    Current Worth: {parseInt(ownedStock.quantity) }
                    </li>
                )): null}
            </ul>
    </section>
)
}

export default MyPortfolio;