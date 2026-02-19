import { useParams, useNavigate } from 'react-router-dom';
import MovieCard from '../MovieCard/MovieCard';
import '../MoviePage/MoviePage.css';

export default function MoviePage({ movies, watchlist, onWatchlistChange }) {
  const { id } = useParams();

  const movie = movies.find((m) => m.id === parseInt(id));

  if (!movie) {
    return (
      <div className="movie-page-container">
        <p className="error">Movie not found</p>
      </div>
    );
  }

  const isInWatchlist = watchlist.some((m) => m.id === movie.id);

  return (
    <div className="movie-page-container">
      <div className="movie-card-wrapper">
        <MovieCard {...movie} disableLink />
      </div>

      <button
        className={`watchlist-btn ${isInWatchlist ? 'in-watchlist' : ''}`}
        onClick={() => onWatchlistChange(movie)}
      >
        {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
      </button>
    </div>
  );
}
