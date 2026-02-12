import MovieCard from '../MovieCard/MovieCard';
import './Watchlist.css';

export default function Watchlist({ watchlist, onToggle, onOpenModal }) {
  return (
    <div className="container-wrapper">
      <h1 className="watchlist-title">Your Watchlist</h1>
      <main className="movies-container">
        {watchlist.length > 0 ? (
          watchlist.map((movie) => (
            <MovieCard
              key={movie.id}
              {...movie}
              watchlist={watchlist}
              onToggle={onToggle}
              onOpenModal={() => onOpenModal(movie)}
            />
          ))
        ) : (
          <p className="no-results">Your watchlist is empty.</p>
        )}
      </main>
    </div>
  );
}
