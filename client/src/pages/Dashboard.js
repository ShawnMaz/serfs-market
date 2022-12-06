import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Auth from '../utils/auth';
import News from '../components/News';
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_STOCKS, QUERY_USER } from "../utils/queries";
import { useStockContext } from '../utils/GlobalState';
import { UPDATE_STOCK, UPDATE_STOCK_ENTRY } from '../utils/actions';
import serfsLogo from '../assets/images/serfsLogo.jpg';
import scroll from '../assets/images/scroll.jpg';
import ManageStocks from '../components/ManageStock';
import MyPortfolio from '../components/MyStocks';

const Dashboard = () => {

    // const [state, dispatch] = useStockContext();
    
    // const { stocks, stockEntry } = state;

    // const buyStock = stockId => {
    //     const stock = stockEntry.find((choice) => choice.stockId === stockId)
    //     if(stock){
    //         dispatch ({
    //             type: UPDATE_STOCK_ENTRY,
    //             stockId: stockId,
    //             quantity: parseInt(stockEntry.quantity) + 1
    //         })

    //     }
    //     console.log (parseInt(stockEntry[0].quantity) + 1)
    //     console.log(stock)
    // }
    

    const { loading, data } = useQuery(QUERY_STOCKS)
    const allStocks = data?.stocks || [];


    if(loading) {
        <h2>LOADING...</h2>
    }
    return (
        <section>
            <div>
                <span role='img' aria-label='serfsLogo'>
                    <img src={serfsLogo} style={{ width: '25%'}} alt='Shield' />
                </span>
            </div>
            <div>
            <h2>
                    current market
                </h2>

                {allStocks.map((stock) => (
                    <ManageStocks key={stock._id} stock = {stock} />
                ))}
            </div>
            
            <div>
                <h2>
                    My Stocks
                </h2>

                <MyPortfolio />

                {/* <div>
                    <ul>
                        {stockEntry.map((eachStock) => (
                            <li 
                                key={eachStock.stockId}
                            >
                                {eachStock.quantity}
                                <button onClick={() => {buyStock(eachStock.stockId)}}>Add</button>
                            </li>

                        ))}
                    </ul>

                </div> */}
            </div>
            <div>
                <h2>
                    Serf’s News
                </h2>
                    <span role='img' aria-label='market'>
                        <img src={scroll} style={{ width: '25%'}} alt='Old yellow scroll paper.' />
                    </span>

                <News />
            </div>

            test
        </section>
    )
}

export default Dashboard;