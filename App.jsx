import { useEffect, useState } from 'react';
import './index.css';

const App = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    // Fetch currency data from an API
    const fetchCurrencies = async () => {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await response.json();
      const currencyCodes = Object.keys(data.rates);
      setCurrencies(currencyCodes);
    };

    fetchCurrencies();
  }, []);

  const handleConversion = async (event) => {
    event.preventDefault();
    if (amount && fromCurrency && toCurrency) {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      const data = await response.json();
      const conversionRate = data.rates[toCurrency];
      const result = (amount * conversionRate).toFixed(2);
      setConvertedAmount(result);
    }
  };

  return (
    <div className="currency_converter">
      <h2 className="converter_title">Currency Converter</h2>
      <form className="converter_form" onSubmit={handleConversion}>
        <div className="form_group">
          <label className="form_label">Enter Amount:</label>
          <input
            type="number"
            className="form_input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className="form_group_section">
          <div className="form_section">
            <label className="form_label">From</label>
            <select
              className="select_menu"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          <div className="swap_icon">
            <svg width="16" viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19.13 11.66H.22a.22.22 0 0 0-.22.22v1.62a.22.22 0 0 0 .22.22h16.45l-3.92 4.94a.22.22 0 0 0 .17.35h1.97c.13 0 .25-.06.33-.16l4.59-5.78a.9.9 0 0 0-.7-1.43zM19.78 5.29H3.34L7.26.35A.22.22 0 0 0 7.09 0H5.12a.22.22 0 0 0-.34.16L.19 5.94a.9.9 0 0 0 .68 1.4H19.78a.22.22 0 0 0 .22-.22V5.51a.22.22 0 0 0-.22-.22z"
                fill="#fff"
              />
            </svg>
          </div>

          <div className="form_section">
            <label className="form_label">To</label>
            <select
              className="select_menu"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className="submit_button">Convert</button>
        <p className="conversion_result">
  {convertedAmount !== null
    ? `Converted Amount: ${convertedAmount} ${toCurrency}`
    : 'Awaiting conversion...'}
</p>

      </form>
    </div>
  );
};

export default App;





