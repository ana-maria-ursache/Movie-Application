import { useEffect, useState } from 'react';
import './MoviesContainer.css';
import MovieCard from '../MovieCard/MovieCard';
import DropDown from '../Dropdown/Dropdown';

export default function MoviesContainer({ movies, watchlist, onToggle, onOpenModal }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [availableGenres, setAvailableGenres] = useState([]);
  const [availableRatingBuckets, setAvailableRatingBuckets] = useState([]);

  const [openDropdown, setOpenDropdown] = useState(null);

  const [sortAlpha, setSortAlpha] = useState(''); // 'A-Z' or 'Z-A'
  const [sortRating, setSortRating] = useState(''); // 'High-Low' or 'Low-High'

  const ratingMap = { '9+': 9, '8+': 8, '7+': 7, 'Below 7': 0 };

  useEffect(() => {
    if (movies.length > 0) {
      const uniqueGenres = [...new Set(movies.map((m) => m.genre?.toLowerCase() || ''))]
        .filter(Boolean)
        .sort()
        .map((g) => g.charAt(0).toUpperCase() + g.slice(1));
      setAvailableGenres(uniqueGenres);

      const buckets = Object.keys(ratingMap).filter((label) =>
        movies.some((m) => {
          const r = parseFloat(m.rating);
          return label === 'Below 7' ? r < 7 : r >= ratingMap[label];
        })
      );
      setAvailableRatingBuckets(buckets);
    }
  }, [movies]);

  const toggleSelection = (item, setList) => {
    setList((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]));
  };

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());

    const movieGenre =
      (movie.genre || 'Unknown').charAt(0).toUpperCase() + (movie.genre || '').slice(1);
    const matchesGenre = selectedGenres.length === 0 || selectedGenres.includes(movieGenre);

    let matchesRating = true;
    if (selectedRatings.length > 0) {
      const minThreshold = Math.min(...selectedRatings.map((label) => ratingMap[label]));
      matchesRating = parseFloat(movie.rating) >= minThreshold;
    }
    return matchesSearch && matchesGenre && matchesRating;
  });

  const finalDisplayMovies = [...filteredMovies].sort((a, b) => {
    if (sortAlpha === 'A-Z') return a.title.localeCompare(b.title);
    if (sortAlpha === 'Z-A') return b.title.localeCompare(a.title);

    if (sortRating === 'High-Low') return b.rating - a.rating;
    if (sortRating === 'Low-High') return a.rating - b.rating;

    return 0;
  });

  const handleClear = () => {
    setSearchTerm('');
    setSelectedGenres([]);
    setSelectedRatings([]);
    setSortAlpha('');
    setSortRating('');
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
            {/* Alphabetical Sort Dropdown */}
            <DropDown
              label="Title Sort"
              items={['A-Z', 'Z-A']}
              selectedItems={sortAlpha ? [sortAlpha] : []}
              onToggle={(item) => {
                setSortAlpha(item);
                setSortRating('');
              }}
              isOpen={openDropdown === 'sortAlpha'}
              onOpenToggle={() =>
                setOpenDropdown(openDropdown === 'sortAlpha' ? null : 'sortAlpha')
              }
            />

            {/* Rating Sort Dropdown */}
            <DropDown
              label="Rating Sort"
              items={['High-Low', 'Low-High']}
              selectedItems={sortRating ? [sortRating] : []}
              onToggle={(item) => {
                setSortRating(item);
                setSortAlpha('');
              }}
              isOpen={openDropdown === 'sortRating'}
              onOpenToggle={() =>
                setOpenDropdown(openDropdown === 'sortRating' ? null : 'sortRating')
              }
            />

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
        {movies.length > 0 ? (
          finalDisplayMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              {...movie}
              watchlist={watchlist}
              onToggle={onToggle}
              onOpenModal={() => onOpenModal(movie)}
            />
          ))
        ) : (
          <div className="no-results">There aren't movies in the database for now, sorry.</div>
        )}
      </main>
    </div>
  );
}
