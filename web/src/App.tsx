import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalStyle } from './styles/components';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import SuperDealsPage from './pages/SuperDealsPage';
import LatestDealsPage from './pages/LatestDealsPage';
import PriceDropsPage from './pages/PriceDropsPage';
import EventsPage from './pages/EventsPage';

function App() {
  return (
    <Router>
      <GlobalStyle />
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/super-deals" element={<SuperDealsPage />} />
            <Route path="/latest" element={<LatestDealsPage />} />
            <Route path="/price-drops" element={<PriceDropsPage />} />
            <Route path="/events" element={<EventsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
