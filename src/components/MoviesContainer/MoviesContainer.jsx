import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import './MoviesContainer.css';
import MovieCard from '../MovieCard/MovieCard';
import DropDown from '../Dropdown/Dropdown';
import { GENRE_MAP, RATING_OPTIONS } from '../../utils/constants';

export default function MoviesContainer({ movies, watchlist, onOpenModal }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedGenres, setSelectedGenres] = useState(
    searchParams.get('genres') ? searchParams.get('genres').split(',') : []
  );
  const [selectedRatings, setSelectedRatings] = useState(
    searchParams.get('ratings') ? searchParams.get('ratings').split(',') : []
  );
  const [sortAlpha, setSortAlpha] = useState(searchParams.get('sortAlpha') || '');
  const [sortRating, setSortRating] = useState(searchParams.get('sortRating') || '');

  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set('search', searchTerm);
    if (selectedGenres.length > 0) params.set('genres', selectedGenres.join(','));
    if (selectedRatings.length > 0) params.set('ratings', selectedRatings.join(','));
    if (sortAlpha) params.set('sortAlpha', sortAlpha);
    if (sortRating) params.set('sortRating', sortRating);

    const newParamsString = params.toString();
    if (newParamsString !== searchParams.toString()) {
      setSearchParams(newParamsString ? params : {}, { replace: true });
    }
  }, [
    searchTerm,
    selectedGenres,
    selectedRatings,
    sortAlpha,
    sortRating,
    setSearchParams,
    searchParams,
  ]);

  const availableGenres = useMemo(() => {
    const genresInData = [...new Set(movies.map((m) => m.genre?.toLowerCase()).filter(Boolean))];
    return genresInData.map(
      (id) => GENRE_MAP[id] || { id, label: id.charAt(0).toUpperCase() + id.slice(1) }
    );
  }, [movies]);

  const availableRatings = useMemo(() => {
    return RATING_OPTIONS.filter((option) =>
      movies.some((m) => {
        const r = parseFloat(m.rating);
        return option.max ? r >= option.min && r < option.max : r >= option.min;
      })
    );
  }, [movies]);

  const toggleSelection = (id, setList) => {
    setList((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());

    const movieGenreId = movie.genre?.toLowerCase();
    const matchesGenre = selectedGenres.length === 0 || selectedGenres.includes(movieGenreId);

    let matchesRating = true;
    if (selectedRatings.length > 0) {
      matchesRating = selectedRatings.some((id) => {
        const option = RATING_OPTIONS.find((r) => r.id === id);
        if (!option) return false;
        const r = parseFloat(movie.rating);
        return option.max ? r >= option.min && r < option.max : r >= option.min;
      });
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
              items={availableGenres.map((g) => g.label)}
              selectedItems={selectedGenres.map((id) => GENRE_MAP[id]?.label || id)}
              onToggle={(label) => {
                const id = availableGenres.find((g) => g.label === label)?.id;
                toggleSelection(id, setSelectedGenres);
              }}
              isOpen={openDropdown === 'genre'}
              onOpenToggle={() => setOpenDropdown(openDropdown === 'genre' ? null : 'genre')}
            />

            <DropDown
              label="Ratings"
              items={availableRatings.map((r) => r.label)}
              selectedItems={selectedRatings.map(
                (id) => RATING_OPTIONS.find((r) => r.id === id)?.label
              )}
              onToggle={(label) => {
                const id = RATING_OPTIONS.find((r) => r.label === label)?.id;
                toggleSelection(id, setSelectedRatings);
              }}
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
              movie={movie}
              watchlist={watchlist}
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
