import { useEffect, useState } from 'react';
import './MoviesContainer.css';
import MovieCard from '../MovieCard/MovieCard';

export default function MoviesContainer() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('/movies.json')
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error('Error loading movies:', error));
  }, []);

  return (
    <main className="movies-container">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          title={movie.title}
          image={movie.image}
          genre={movie.genre}
          rating={movie.rating}
        />
      ))}
    </main>
  );
}
