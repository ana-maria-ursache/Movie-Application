import { useState } from 'react';
import './MovieCard.css';
import Modal from '../Modal/Modal';

export default function MovieCard(props) {
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal(true);
  };

  return (
    <>
      <section onClick={toggleModal} className="card">
        <div className="card-image">
          <img src={`/images/${props.image}`} alt={props.title} />
        </div>
        <div className="card-content">
          <p>{props.title}</p>
          <p className="genre">{props.genre}</p>
          <div className="rating">
            <span>⭐ {props.rating}</span>
            <span></span>
          </div>
        </div>
        {openModal && <Modal movie={props} setOpenModal={setOpenModal} />}
      </section>

      {openModal && (
        <Modal movie={props} setOpenModal={setOpenModal} onDataChange={props.onDataChange} />
      )}
    </>
  );
}
