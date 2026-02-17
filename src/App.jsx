import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MoviesContainer from './components/MoviesContainer/MoviesContainer';
import Watchlist from './components/Watchlist/Watchlist';
import Modal from './components/Modal/Modal';
import MoviePage from './components/MoviePage/MoviePage';
import Layout from './components/Layout/Layout';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('/movies.json')
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load movies (Status: ${res.status})`);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setMovies(data);
        }
      })
      .catch((err) => {
        console.error('Error loading movies:', err.message);
        setMovies([]);
      });
  }, []);

  const [watchlist, setWatchlist] = useState(() => {
    try {
      const saved = localStorage.getItem('watchlist');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Watchlist corrupted, resetting:', error);
      return [];
    }
  });

  const [openModal, setOpenModal] = useState(null);

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
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/search?&titleSort?&ratingSort?&genre?&rating?"
            element={
              <MoviesContainer
                movies={movies}
                watchlist={watchlist}
                onToggle={toggleWatchlist}
                onOpenModal={setOpenModal}
              />
            }
          />
          <Route
            path="/watchlist"
            element={
              <Watchlist
                watchlist={watchlist}
                onToggle={toggleWatchlist}
                onOpenModal={setOpenModal}
              />
            }
          />
          <Route
            path="/movies/:id"
            element={
              <MoviePage
                movies={movies}
                watchlist={watchlist}
                onToggle={toggleWatchlist}
                onOpenModal={setOpenModal}
              />
            }
          />
        </Route>
      </Routes>

      {openModal && (
        <Modal
          movie={openModal}
          setOpenModal={() => setOpenModal(null)}
          watchlist={watchlist}
          onToggle={toggleWatchlist}
        />
      )}
    </BrowserRouter>
  );
}

export default App;
