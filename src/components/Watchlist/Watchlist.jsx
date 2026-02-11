import { useState, useEffect } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './Watchlist.css';

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem('watchlist')) || [];
    setWatchlist(savedMovies);
  }, []);

  const updateWatchlistState = () => {
    const freshData = JSON.parse(localStorage.getItem('watchlist')) || [];
    setWatchlist(freshData);
  };

  return (
    <div className="container-wrapper">
      <h1 className="watchlist-title">Your Watchlist</h1>
      <main className="movies-container">
        {watchlist.map((movie) => (
          <MovieCard key={movie.id} {...movie} onDataChange={updateWatchlistState} />
        ))}
      </main>
    </div>
  );
}
