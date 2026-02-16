import './MovieCard.css';

export default function MovieCard(props) {
  return (
    <>
      <section onClick={props.onOpenModal} className="card">
        <div className="card-image">
          <img
            src={props.image ? `/images/${props.image}` : `/images/default.jpg`}
            alt={props.title}
          />
        </div>
        <div className="card-content">
          <p>{props.title}</p>
          <p className="genre">{props.genre}</p>
          <div className="rating">
            <span>⭐ {props.rating}</span>
            <span></span>
          </div>
        </div>
      </section>
    </>
  );
}
