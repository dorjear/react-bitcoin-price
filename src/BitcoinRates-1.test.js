import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import BitcoinRates1 from './BitcoinRates-1'; // Adjust the import path as necessary

// Mocking the global.fetch method
beforeAll(() => {
    global.fetch = jest.fn();
    // global.fetch = jest.fn(
    // () =>
    //     Promise.resolve({
    //         json: () => Promise.resolve({ bitcoin: { usd: 50000, eur: 45000 } }),
    //     })
    // );
})

beforeEach(() => {
    fetch.mockClear();
});

test('renders and updates the Bitcoin price correctly', async () => {

    fetch.mockImplementationOnce(() =>
        Promise.resolve({
            json: () => Promise.resolve({ bitcoin: { usd: 50000 } }),
        })
    );

    render(<BitcoinRates1 />);

    screen.debug()

    // Initially, USD should be selected, and the price should be fetched for USD
    expect(screen.getByRole('combobox')).toHaveValue('usd');
    await waitFor(() => expect(screen.getByText(/1 BTC = 50000 USD/)).toBeInTheDocument());

    fetch.mockImplementationOnce(() =>
        Promise.resolve({
            json: () => Promise.resolve({ bitcoin: { eur: 45000 } }),
        })
    );

    // Change the currency to EUR
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'eur' } });

    // Expect the fetch to have been called again and the price to update for EUR
    await waitFor(() => expect(screen.getByText(/1 BTC = 45000 EUR/)).toBeInTheDocument());
});
