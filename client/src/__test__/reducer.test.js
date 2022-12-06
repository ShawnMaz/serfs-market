import { reducer } from "../utils/reducers";
import {
    UPDATE_STOCK,
    UPDATE_EVENT,
    UPDATE_STOCK_ENTRY,
} from '../utils/actions';

const initialState = {
    stocks: [
        {
            _id: '1',
            stockName: 'Wine',
            stockDescription: 'something you drink',
            stockCategories: 'Luxury',
            stockPrice: 1
        },
        {
            _id: '2',
            stockName: 'Sword',
            stockDescription: 'used for war',
            stockCategories: 'Weapons',
            stockPrice: 2
        }
    ],
    event: [],
    stockEntry: [
        {
            stockId: '1',
            quantity: 2
        },
        {
            stockId: '2',
            quantity: 1
        }
    ]

    
};

test('UPDATE_STOCK', () => {
    let newState = reducer(initialState, {
        type: UPDATE_STOCK,
        _id:'1',
        stockPrice: 2
    })

    expect(newState.stocks[0].stockPrice).toBe(2);
});
test('UPDATE_EVENT', () => {
    let newState = reducer(initialState, {
        type: UPDATE_EVENT,
        event: [{}, {}]
    })

    expect(initialState.event.length).toBe(0);
    expect(newState.event.length).toBe(2);
});
test('UPDATE_STOCK_ENTRY', () => {
    let newState = reducer(initialState, {
        type: UPDATE_STOCK_ENTRY,
        stockId: '1',
        quantity: 3
    })

    expect(newState.stockEntry[0].quantity).toBe(3);
});