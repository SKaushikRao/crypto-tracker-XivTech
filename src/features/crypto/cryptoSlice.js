import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cryptos: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    fetchCryptosStart(state) {
      state.status = 'loading';
    },
    fetchCryptosSuccess(state, action) {
      state.status = 'succeeded';
      state.cryptos = action.payload;
    },
    fetchCryptosFailed(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
    updateCrypto(state, action) {
      const { id, updates } = action.payload;
      const cryptoIndex = state.cryptos.findIndex(crypto => crypto.id === id);
      
      if (cryptoIndex !== -1) {
        state.cryptos[cryptoIndex] = { 
          ...state.cryptos[cryptoIndex], 
          ...updates,
          priceChange: {
            ...state.cryptos[cryptoIndex].priceChange,
            ...updates.priceChange
          }
        };
      }
    },
    updateAllCryptos(state, action) {
      state.cryptos = action.payload;
    }
  },
});

// Export actions
export const {
  fetchCryptosStart,
  fetchCryptosSuccess,
  fetchCryptosFailed,
  updateCrypto,
  updateAllCryptos,
} = cryptoSlice.actions;

// Selectors
export const selectAllCryptos = (state) => state.crypto.cryptos;
export const selectCryptoStatus = (state) => state.crypto.status;
export const selectCryptoError = (state) => state.crypto.error;
export const selectCryptoById = (state, id) => 
  state.crypto.cryptos.find(crypto => crypto.id === id);

export default cryptoSlice.reducer;