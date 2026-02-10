import './MovieCard.css';

export default function MovieCard(props) {
  return (
    <section className="card">
      <div className="card-image">
        <img src={`/images/${props.image}`} alt={props.title} />
      </div>
      <div className="card-content">
        <h3>{props.title}</h3>
        <p className="genre">{props.genre}</p>
        <div className="rating">
          <span>⭐ {props.rating}</span>
        </div>
      </div>
    </section>
  );
}
