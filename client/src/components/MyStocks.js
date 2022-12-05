import React, {useState} from "react";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";

const MyPortfolio= () => {

    const { loading, data } = useQuery(QUERY_USER)
    const profile = data?.user || [];

  
    if(loading) {
        <h2>LOADING...</h2>
    }
return (
    <section>
        <h3>{profile.username}</h3>
        <p>{profile.money}</p>
        <p>Portfolio</p>
            <ul>
                {profile.portfolio.map((stocks) => (
                    <li key={stocks._id}>
                    {stocks.stockId}
                    {stocks.quantity}
                    </li>
                ))}
            </ul>
    </section>
)
}

export default MyPortfolio;