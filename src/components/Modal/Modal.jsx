import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import './Modal.css';

export default function Modal({ movie, setOpenModal, onDataChange }) {
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    setIsInWatchlist(watchlist.some((m) => m.id === movie.id));
  }, [movie.id]);

  const handleWatchlistToggle = (e) => {
    e.stopPropagation();
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

    if (isInWatchlist) {
      watchlist = watchlist.filter((m) => m.id !== movie.id);
    } else {
      watchlist.push(movie);
    }

    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    setIsInWatchlist(!isInWatchlist);

    if (onDataChange) {
      // if the function exists(it is passed), use it
      onDataChange();
    }
  };

  const toggleModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') setOpenModal(false);
    };
    window.addEventListener('keydown', handleEsc);

    return () => window.removeEventListener('keydown', handleEsc);
  }, [setOpenModal]);

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={() => setOpenModal(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={toggleModal}>
          &times;
        </button>
        <div className="modal-body">
          <img src={`/images/${movie.image}`} alt={movie.title} className="modal-img" />
          <div className="modal-info">
            <h2>{movie.title}</h2>
            <p className="modal-genre">
              {movie.genre.charAt(0).toUpperCase() + movie.genre.slice(1)}
            </p>
            <p className="modal-rating">⭐ {movie.rating}</p>
            <button
              className={`watchlist-btn ${isInWatchlist ? 'remove' : 'add'}`}
              onClick={handleWatchlistToggle}
            >
              {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
