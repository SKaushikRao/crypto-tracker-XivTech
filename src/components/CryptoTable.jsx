import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectAllCryptos, 
  selectCryptoStatus, 
  fetchCryptosStart, 
  fetchCryptosSuccess, 
  fetchCryptosFailed,
  updateCrypto
} from '../features/crypto/cryptoSlice';
import { fetchTopCryptos, CryptoWebSocketMock } from '../services/cryptoService';
import SparklineChart from './SparklineChart';

// Format numbers with commas
const formatNumber = (num) => {
  if (num === null || num === undefined) return 'N/A';
  return new Intl.NumberFormat('en-US').format(num);
};

// Format currency
const formatCurrency = (num) => {
  if (num === null || num === undefined) return 'N/A';
  return new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD',
    notation: num > 1000000 ? 'compact' : 'standard',
    maximumFractionDigits: num > 1000 ? 0 : 2
  }).format(num);
};

// Format compact currency for large numbers
const formatCompactCurrency = (num) => {
  if (num === null || num === undefined) return 'N/A';
  return new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 2
  }).format(num);
};

// Format percentage
const formatPercentage = (num) => {
  if (num === null || num === undefined) return 'N/A';
  return `${num >= 0 ? '+' : ''}${num.toFixed(2)}%`;
};

const CryptoTable = () => {
  const dispatch = useDispatch();
  const cryptos = useSelector(selectAllCryptos);
  const status = useSelector(selectCryptoStatus);
  
  // Reference to track price changes for animations
  const prevPrices = useRef({});
  
  // State to track which rows should flash
  const [flashStates, setFlashStates] = useState({});

  useEffect(() => {
    // Keep track of price changes to apply flash animations
    const newFlashStates = {};
    
    cryptos.forEach(crypto => {
      const prevPrice = prevPrices.current[crypto.id];
      if (prevPrice && prevPrice !== crypto.price) {
        newFlashStates[crypto.id] = crypto.price > prevPrice ? 'green' : 'red';
        
        // Update the previous price
        prevPrices.current[crypto.id] = crypto.price;
      } else if (!prevPrice) {
        // Initialize if not set yet
        prevPrices.current[crypto.id] = crypto.price;
      }
    });
    
    // Set flash states
    if (Object.keys(newFlashStates).length > 0) {
      setFlashStates(newFlashStates);
      
      // Clear flash animation after 1 second
      setTimeout(() => {
        setFlashStates({});
      }, 1000);
    }
  }, [cryptos]);

  useEffect(() => {
    // Set up WebSocket mock for real-time updates
    const webSocket = new CryptoWebSocketMock((cryptoId, updates) => {
      // Find the crypto that needs to be updated
      const crypto = cryptos.find(c => c.id === cryptoId);
      if (!crypto) return;

      // Calculate new price based on percentage change
      const newPrice = crypto.price * (1 + updates.priceChangePercent);
      
      // Calculate new volume based on percentage change
      const newVolume = crypto.volume * (1 + updates.volumeChangePercent);
      
      // Update price changes
      const newPriceChange = {
        ...crypto.priceChange,
        '1h': crypto.priceChange['1h'] + (Math.random() * 0.4 - 0.2),
        '24h': crypto.priceChange['24h'] + (Math.random() * 0.3 - 0.15),
      };

      // Dispatch update action
      dispatch(updateCrypto({
        id: cryptoId,
        updates: {
          price: newPrice,
          volume: newVolume,
          priceChange: newPriceChange,
          lastUpdated: updates.timestamp
        }
      }));
    });

    // Fetch initial data
    const fetchData = async () => {
      dispatch(fetchCryptosStart());
      try {
        const data = await fetchTopCryptos();
        dispatch(fetchCryptosSuccess(data));
        // Connect WebSocket after initial data is loaded
        webSocket.connect();
      } catch (error) {
        dispatch(fetchCryptosFailed(error.message));
      }
    };

    fetchData();

    // Cleanup WebSocket on component unmount
    return () => {
      webSocket.disconnect();
    };
  }, [dispatch]);

  if (status === 'loading' && cryptos.length === 0) {
    return (
      <div className="flex justify-center items-center p-10 min-h-[400px]">
        <div className="loading-spinner"></div>
        <span className="ml-4 text-lg font-medium text-gray-700">Loading cryptocurrency data...</span>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="error-message">
        <h3 className="text-lg font-semibold mb-2">Error Loading Data</h3>
        <p>Failed to load cryptocurrency data. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="crypto-table">
        <thead>
          <tr>
            <th className="w-12">#</th>
            <th className="min-w-[180px]">Name</th>
            <th className="text-right">Price</th>
            <th className="text-right">1h %</th>
            <th className="text-right">24h %</th>
            <th className="text-right">7d %</th>
            <th className="text-right hide-on-mobile">Market Cap</th>
            <th className="text-right hide-on-mobile">Volume (24h)</th>
            <th className="text-right hide-on-mobile">Circulating Supply</th>
            <th className="text-center">Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {cryptos.map((crypto) => (
            <tr 
              key={crypto.id} 
              className={`crypto-row ${flashStates[crypto.id] === 'green' ? 'price-flash-green' : 
                          flashStates[crypto.id] === 'red' ? 'price-flash-red' : ''}`}
            >
              <td>{crypto.rank}</td>
              <td>
                <div className="crypto-name-cell">
                  <img src={crypto.image} alt={crypto.name} className="crypto-logo" />
                  <span className="crypto-name">{crypto.name}</span>
                  <span className="crypto-symbol">{crypto.symbol}</span>
                </div>
              </td>
              <td className="text-right font-medium">
                {formatCurrency(crypto.price)}
              </td>
              <td className="text-right">
                <span className={`price-change ${crypto.priceChange['1h'] >= 0 ? 'price-change-positive' : 'price-change-negative'}`}>
                  {formatPercentage(crypto.priceChange['1h'])}
                </span>
              </td>
              <td className="text-right">
                <span className={`price-change ${crypto.priceChange['24h'] >= 0 ? 'price-change-positive' : 'price-change-negative'}`}>
                  {formatPercentage(crypto.priceChange['24h'])}
                </span>
              </td>
              <td className="text-right">
                <span className={`price-change ${crypto.priceChange['7d'] >= 0 ? 'price-change-positive' : 'price-change-negative'}`}>
                  {formatPercentage(crypto.priceChange['7d'])}
                </span>
              </td>
              <td className="text-right hide-on-mobile">
                {formatCompactCurrency(crypto.marketCap)}
              </td>
              <td className="text-right hide-on-mobile">
                {formatCompactCurrency(crypto.volume)}
              </td>
              <td className="text-right hide-on-mobile">
                {formatNumber(Math.round(crypto.circulatingSupply))} <span className="text-gray-500">{crypto.symbol}</span>
              </td>
              <td>
                <div className="sparkline-container">
                  <SparklineChart data={crypto.sparkline} change={crypto.priceChange['7d']} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;