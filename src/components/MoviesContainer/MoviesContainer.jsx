import { useEffect, useState } from 'react';
import './MoviesContainer.css';
import MovieCard from '../MovieCard/MovieCard';

export default function MoviesContainer() {
  const [movies, setMovies] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);

  const [availableGenres, setAvailableGenres] = useState([]);
  const [availableRatingBuckets, setAvailableRatingBuckets] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);

  const ratingMap = { '9+': 9, '8+': 8, '7+': 7, 'Below 7': 0 };

  useEffect(() => {
    // getting the movies and the available genres/ratings
    fetch('/movies.json')
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        const uniqueGenres = [...new Set(data.map((m) => m.genre.toLowerCase()))]
          .sort()
          .map((g) => g.charAt(0).toUpperCase() + g.slice(1));
        setAvailableGenres(uniqueGenres);

        const buckets = ['9+', '8+', '7+', 'Below 7'].filter((label) =>
          data.some((m) => {
            const r = parseFloat(m.rating);
            if (label === '9+') return r >= 9;
            if (label === '8+') return r >= 8;
            if (label === '7+') return r >= 7;
            return r < 7;
          })
        );
        setAvailableRatingBuckets(buckets);
      });
  }, []);

  const toggleSelection = (item, list, setList) => {
    setList((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]));
  };

  // filtering the movies by the rating/genres the user has picked
  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());

    const movieGenre = movie.genre.charAt(0).toUpperCase() + movie.genre.slice(1);
    const matchesGenre = selectedGenres.length === 0 || selectedGenres.includes(movieGenre);

    let matchesRating = true;
    if (selectedRatings.length > 0) {
      const minThreshold = Math.min(...selectedRatings.map((label) => ratingMap[label]));
      matchesRating = parseFloat(movie.rating) >= minThreshold;
    }

    return matchesSearch && matchesGenre && matchesRating;
  });

  const handleClear = () => {
    setSearchTerm('');
    setSelectedGenres([]);
    setSelectedRatings([]);
    setOpenDropdown(null);
  };

  return (
    <div className="container-wrapper">
      <div className="container-header">
        <input
          className="search-input"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="filter-controls">
          <div className="dropdown-group">
            <div className="custom-dropdown">
              <button
                className="dropdown-toggle"
                onClick={() => setOpenDropdown(openDropdown === 'genre' ? null : 'genre')}
              >
                Genres {selectedGenres.length > 0 && `(${selectedGenres.length})`}
              </button>
              {openDropdown === 'genre' && (
                <div className="dropdown-menu">
                  {availableGenres.map((g) => (
                    <label key={g} className="dropdown-item">
                      <input
                        type="checkbox"
                        checked={selectedGenres.includes(g)}
                        onChange={() => toggleSelection(g, selectedGenres, setSelectedGenres)}
                      />
                      {g}
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="custom-dropdown">
              <button
                className="dropdown-toggle"
                onClick={() => setOpenDropdown(openDropdown === 'rating' ? null : 'rating')}
              >
                Ratings
              </button>
              {openDropdown === 'rating' && (
                <div className="dropdown-menu">
                  {availableRatingBuckets.map((r) => (
                    <label key={r} className="dropdown-item">
                      <input
                        type="checkbox"
                        checked={selectedRatings.includes(r)}
                        onChange={() => toggleSelection(r, selectedRatings, setSelectedRatings)}
                      />
                      {r}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button className="clear-btn" onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>

      <main className="movies-container">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </main>
    </div>
  );
}
