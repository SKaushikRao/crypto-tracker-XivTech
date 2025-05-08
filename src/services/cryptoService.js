import axios from 'axios';

// We'll use CoinGecko API as it's free and doesn't require API keys for basic usage
const API_URL = 'https://api.coingecko.com/api/v3';

// Limit to these specific cryptocurrencies for the demo
const CRYPTO_IDS = ['bitcoin', 'ethereum', 'tether', 'ripple', 'binancecoin', 'solana'];

// Fetch top cryptocurrencies
export const fetchTopCryptos = async () => {
  try {
    const response = await axios.get(`${API_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        ids: CRYPTO_IDS.join(','),
        order: 'market_cap_desc',
        per_page: 10,
        page: 1,
        sparkline: true, // This gives us 7d data for the sparkline chart
        price_change_percentage: '1h,24h,7d'
      }
    });

    // Transform data to match our application structure
    return response.data.map(crypto => ({
      id: crypto.id,
      rank: crypto.market_cap_rank,
      name: crypto.name,
      symbol: crypto.symbol.toUpperCase(),
      image: crypto.image,
      price: crypto.current_price,
      priceChange: {
        '1h': crypto.price_change_percentage_1h_in_currency,
        '24h': crypto.price_change_percentage_24h_in_currency,
        '7d': crypto.price_change_percentage_7d_in_currency,
      },
      marketCap: crypto.market_cap,
      volume: crypto.total_volume,
      circulatingSupply: crypto.circulating_supply,
      maxSupply: crypto.max_supply,
      sparkline: crypto.sparkline_in_7d.price
    }));
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    throw error;
  }
};

// Mock WebSocket for real-time updates
export class CryptoWebSocketMock {
  constructor(onUpdate) {
    this.onUpdate = onUpdate;
    this.intervalId = null;
    this.connected = false;
  }

  connect() {
    if (this.connected) return;
    
    this.connected = true;
    this.intervalId = setInterval(() => {
      this.simulateUpdate();
    }, 1500); // Update every 1.5 seconds
  }

  disconnect() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.connected = false;
  }

  simulateUpdate() {
    // Randomly select a cryptocurrency to update
    const randomCryptoId = CRYPTO_IDS[Math.floor(Math.random() * CRYPTO_IDS.length)];
    
    // Generate random price change (-2% to +2%)
    const priceChangePercent = (Math.random() * 4 - 2) / 100;
    
    // Generate random volume change (-5% to +5%)
    const volumeChangePercent = (Math.random() * 10 - 5) / 100;
    
    // Updates to be applied
    const updates = {
      priceChangePercent,
      volumeChangePercent,
      timestamp: Date.now()
    };
    
    // Send update to listener
    this.onUpdate(randomCryptoId, updates);
  }
}