import { useReducer, useEffect } from 'react';

// Action types
const ActionTypes = {
    FETCH_INIT: 'FETCH_INIT',
    FETCH_SUCCESS: 'FETCH_SUCCESS',
    FETCH_FAILURE: 'FETCH_FAILURE'
};

// Initial state for the reducer
const initialState = {
    isLoading: false,
    error: null,
    data: {}
};

// Reducer function
function reducer(state, action) {
    switch (action.type) {
        case ActionTypes.FETCH_INIT:
            return { ...state, isLoading: true, error: null };
        case ActionTypes.FETCH_SUCCESS:
            return { ...state, isLoading: false, data: action.payload, error: null };
        case ActionTypes.FETCH_FAILURE:
            return { ...state, isLoading: false, error: action.payload };
        default:
            throw new Error();
    }
}

// Custom hook for fetching Bitcoin rates
function useFetchBitcoinRates(currency) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: ActionTypes.FETCH_INIT });

            try {
                const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${currency}`);
                const data = await response.json();
                dispatch({ type: ActionTypes.FETCH_SUCCESS, payload: data.bitcoin[currency] });
            } catch (error) {
                dispatch({ type: ActionTypes.FETCH_FAILURE, payload: error.message });
            }
        };

        fetchData();
    }, [currency]);

    return state;
}

export default useFetchBitcoinRates;
