import { useEffect, useState } from 'react';
import './MoviesContainer.css';
import MovieCard from '../MovieCard/MovieCard';
import DropDown from '../Dropdown/Dropdown';

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
    fetch('/movies.json')
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);

        const uniqueGenres = [...new Set(data.map((m) => m.genre.toLowerCase()))]
          .sort()
          .map((g) => g.charAt(0).toUpperCase() + g.slice(1));
        setAvailableGenres(uniqueGenres);

        const buckets = Object.keys(ratingMap).filter((label) =>
          data.some((m) => {
            const r = parseFloat(m.rating);
            return label === 'Below 7' ? r < 7 : r >= ratingMap[label];
          })
        );
        setAvailableRatingBuckets(buckets);
      });
  }, []);

  const toggleSelection = (item, setList) => {
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
            {/* Genre Dropdown */}
            <DropDown
              label="Genres"
              items={availableGenres}
              selectedItems={selectedGenres}
              onToggle={(item) => toggleSelection(item, setSelectedGenres)}
              isOpen={openDropdown === 'genre'}
              onOpenToggle={() => setOpenDropdown(openDropdown === 'genre' ? null : 'genre')}
            />

            {/* Rating Dropdown */}
            <DropDown
              label="Ratings"
              items={availableRatingBuckets}
              selectedItems={selectedRatings}
              onToggle={(item) => toggleSelection(item, setSelectedRatings)}
              isOpen={openDropdown === 'rating'}
              onOpenToggle={() => setOpenDropdown(openDropdown === 'rating' ? null : 'rating')}
            />
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
