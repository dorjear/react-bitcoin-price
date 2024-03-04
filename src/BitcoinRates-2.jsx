import React, { useState, useReducer, useEffect } from 'react';
import { useUser } from './UserContext';
import Profile from "./Profile"; // Adjust the import path as necessary

const currencies = ['usd', 'eur', 'gbp', 'hhh'];

// Initial state for the reducer
const initialState = {
    loading: false,
    error: '',
    data: {}
};

// Reducer function to handle state changes based on dispatched actions
function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_START':
                return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, data: action.payload };
        case 'FETCH_ERROR':
            return { ...state, loading: false, error: 'Error fetching data' };
        default:
            return state;
    }
}

function BitcoinRates2() {
    const [currency, setCurrency] = useState('usd'); // Default currency
    const [state, dispatch] = useReducer(reducer, initialState);
    const { user } = useUser();

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_START' });
            try {
                const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${currency}`);
                const data = await response.json();
                if(response.status !== 200 || !data.bitcoin[currency]) throw new Error(response)
                dispatch({ type: 'FETCH_SUCCESS', payload: data.bitcoin });
            } catch (error) {
                dispatch({ type: 'FETCH_ERROR' });
            }
        };

        fetchData();
    }, [currency]); // Dependency array to trigger useEffect when currency changes

    const options = currencies.map((curr) => (<option value={curr} key={curr}>{curr}</option>));

    return (
        <div className="BitcoinRates componentBox">
            {user && <h3>Welcome, {user.name}!</h3>}
            <h3>Bitcoin Exchange Rate</h3>
            <label>Choose currency: <select
                value={currency} onChange={(e) => setCurrency(e.target.value)}>{options}</select></label>
            {state.loading && <p>Loading...</p>}
            {state.error && <p>{state.error}</p>}
            {state.data[currency] && <p>1 BTC = {state.data[currency]} {currency.toUpperCase()}</p>}
            <Profile />
        </div>
    );
}

export default BitcoinRates2;
