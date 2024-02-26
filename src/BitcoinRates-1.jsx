import React, { useState, useEffect } from 'react';

// Assuming 'currencies' is an array of currency codes like ['usd', 'eur', 'gbp', ...]
const currencies = ['usd', 'eur', 'gbp'];

function BitcoinRates1() {
    const [currency, setCurrency] = useState(currencies[0]);
    const [rate, setRate] = useState('');

    useEffect(() => {
        // Define the function to fetch exchange rate data
        const fetchExchangeRate = async () => {
            const url = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${currency}`;
            try {
                const response = await fetch(url);
                const data = await response.json();
                // Assuming the API returns an object like { bitcoin: { usd: 34000 }}
                setRate(data.bitcoin[currency]);
            } catch (error) {
                console.error('Error fetching exchange rate:', error);
                setRate('Error fetching data');
            }
        };

        // Call the fetch function
        fetchExchangeRate();
    }, [currency]); // This effect depends on 'currency', so it runs whenever 'currency' changes.

    const options = currencies.map((curr) => (<option value={curr} key={curr}>{curr.toUpperCase()}</option>));

    return (
        <div className="BitcoinRates componentBox">
            <h3>Bitcoin Exchange Rate</h3>
            <label> Choose currency:
                <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}>
                    {options}
                </select>
            </label>
            <p>1 BTC = {rate} {currency.toUpperCase()}</p>
        </div>
    );
}

export default BitcoinRates1;
