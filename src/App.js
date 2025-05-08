import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { store } from './store';
import CryptoTable from './components/CryptoTable';
import AboutUs from './components/AboutUs';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App min-h-screen flex flex-col">
          <header className="app-header">
            <div className="container mx-auto px-4 flex justify-between items-center">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold">Crypto Tracker - XivTech S Kaushik Rao</h1>
                <p className="text-gray-300">Real-Time cryptocurrency price updates (Semi-Functional)</p>
              </div>
              <nav>
                <Link to="/about" className="text-white hover:text-gray-300 font-medium px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                  About Me
                </Link>
              </nav>
            </div>
          </header>
          
          <main className="content-wrapper flex-grow">
            <div className="container mx-auto px-4">
              <Routes>
                <Route path="/" element={
                  <div className="crypto-card">
                    <CryptoTable />
                  </div>
                } />
                <Route path="/about" element={<AboutUs />} />
              </Routes>
            </div>
          </main>
          
          <footer className="app-footer">
            <div className="container mx-auto px-4 text-center">
              <p>Data provided by CoinGecko API | Crypto Tracker &copy; {new Date().getFullYear()}</p>
            </div>
          </footer>
        </div>
      </Router>
    </Provider>
  );
}

export default App;