import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';

import './Modal.css';

export default function Modal({ movie, setOpenModal, watchlist, onToggle }) {
  const isInWatchlist = watchlist?.some((m) => m.id === movie.id);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') setOpenModal(false);
    };
    window.addEventListener('keydown', handleEsc);

    return () => window.removeEventListener('keydown', handleEsc);
  }, [setOpenModal]);

  const toggleModal = () => {
    setOpenModal(false);
  };

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
              onClick={() => onToggle(movie)}
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
