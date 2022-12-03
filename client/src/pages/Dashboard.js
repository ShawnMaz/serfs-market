import React from 'react';
import Auth from '../utils/auth';
import News from '../components/News';

const Dashboard = () => {


    
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
                    my portfolio
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