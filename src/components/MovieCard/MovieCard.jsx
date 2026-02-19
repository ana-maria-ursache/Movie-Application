import './MovieCard.css';

export default function MovieCard({ movie, onOpenModal }) {
  return (
    <>
      <section onClick={onOpenModal} className="card">
        <div className="card-image">
          <img
            src={movie.image ? `/images/${movie.image}` : `/images/default.jpg`}
            alt={movie.title}
          />
        </div>
        <div className="card-content">
          <p>{movie.title}</p>
          <p className="genre">{movie.genre}</p>
          <div className="rating">
            <span>⭐ {movie.rating}</span>
            <span></span>
          </div>
        </div>
      </section>
    </>
  );
}
