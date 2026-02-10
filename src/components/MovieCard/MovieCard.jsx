import './MovieCard.css';

export default function MovieCard(props) {
  return (
    <section className="card">
      <div className="card-image">
        <img src={`/images/${props.image}`} alt={props.title} />
      </div>
      <div className="card-content">
        <p>{props.title}</p>
        <p className="genre">{props.genre}</p>
        <div className="rating">
          <span>⭐ {props.rating}</span>
        </div>
      </div>
    </section>
  );
}
