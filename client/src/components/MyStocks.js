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
    const findStock = (id) => {
        const name = stocks.filter(stock => stock._id === id )
        return name[0].stockName
    }
    console.log(stocks)
    console.log("user", profile.money)
return (
    <section>
        <h3>{profile.username}</h3>
        <p>{profile.money}</p>
        <p>Portfolio</p>
            <ul>
                {profile.portfolio ? profile.portfolio.map((ownedStock) => (
                    <li key={ownedStock.stockId}>
                    {stocks[stocks.findIndex(stock => stock._id === ownedStock.stockId)].stockName} <br/>
                    {ownedStock.quantity} <br/>
                    Current Worth: {parseInt(ownedStock.quantity) * parseInt(stocks[stocks.findIndex(stock => stock._id === ownedStock.stockId)].stockPrice)}
                    </li>
                )): null}
            </ul>
    </section>
)
}

export default MyPortfolio;