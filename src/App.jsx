import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavBar from './components/navbar/NavBar';
import MoviesContainer from './components/MoviesContainer/MoviesContainer';
import Watchlist from './components/Watchlist/Watchlist';

import './App.css';

function App() {
  const [watchlist, setWatchlist] = useState(JSON.parse(localStorage.getItem('watchlist')) || []);

  const toggleWatchlist = (movie) => {
    setWatchlist((prev) => {
      const isIncluded = prev.some((m) => m.id === movie.id);
      const updated = isIncluded ? prev.filter((m) => m.id !== movie.id) : [...prev, movie];

      localStorage.setItem('watchlist', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <BrowserRouter>
      <div className="main-container">
        <NavBar />

        <Routes>
          <Route
            path="/"
            element={<MoviesContainer watchlist={watchlist} onToggle={toggleWatchlist} />}
          />
          <Route
            path="/watchlist"
            element={<Watchlist watchlist={watchlist} onToggle={toggleWatchlist} />}
          />
        </Routes>

        <footer>
          <p className="footer-text">&copy; 2026 Framely. All rights reserved.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
