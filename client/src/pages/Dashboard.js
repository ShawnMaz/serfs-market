import React, { useEffect } from 'react';
import Auth from '../utils/auth';
import News from '../components/News';
import { useStockContext } from '../utils/GlobalState';
import { UPDATE_STOCK, UPDATE_STOCK_ENTRY } from '../utils/actions';
const Dashboard = () => {

    const [state, dispatch] = useStockContext();

    const { stocks, stockEntry } = state;

    const buyStock = stockId => {
   
            dispatch ({
                type: UPDATE_STOCK_ENTRY,
                stockId: stockId,
                quantity: parseInt(stockEntry.quantity) + 1
            })
        }
    

    return (
        <section>
            <div>
                Logo
            </div>
            <div>
                <h2>
                    My Gains
                </h2>

                <div>
                    data on current stock price
                </div>
            </div>
            
            <div>
                <h2>
                    My Stocks
                </h2>

                <div>
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

                </div>
            </div>
            <div>
                <h2>
                    Serf’s News
                </h2>
                <News />
            </div>

            test
        </section>
    )
}

export default Dashboard;