import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavBar from './components/navbar/NavBar';
import MoviesContainer from './components/MoviesContainer/MoviesContainer';
import Watchlist from './components/Watchlist/Watchlist';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="mainContainer">
        <NavBar />

        <Routes>
          <Route path="/" element={<MoviesContainer />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>

        <footer>
          <p className="footer-text">&copy; 2026 Framely. All rights reserved.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
