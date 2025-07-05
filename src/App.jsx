import { useState } from 'react';//Static data => No need for useState
import './App.css';
import Movies from'./MoviesDataBase.jsx';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const MovieList = () => {
  return (
    <div>
      {Movies.map(movie => (
        <div key={movie.id}>
          <h2>{movie.title} ({movie.year})</h2>
          <p>Genres: {movie.genres.join(', ')}</p>
          <p>Rating: {movie.rating}/10</p>
        </div>
      ))}
    </div>
  );
}

const Interface = () => {
  const [selectedGenre, setSelectedGenre] = useState('');
  const genres = ['All', 'Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror'];

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
  };

  const filteredMovies = selectedGenre === 'All' || !selectedGenre
    ? Movies
    : Movies.filter(movie => movie.genres.includes(selectedGenre));

  return (
    <div className="app">
      {/* Left Sidebar - Static Filters */}
      <div className="sidebar">
        <h1 className="title">🎬 Movie Recommender</h1>
        <div className="button-group">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => handleGenreClick(genre)}
              className={`genre-button ${
                selectedGenre === genre ? 'active' : ''
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
        <div className="result">
          {selectedGenre ? (
            <p>🎥 Showing: <strong>{selectedGenre}</strong></p>
          ) : (
            <p>Select a genre to filter</p>
          )}
        </div>
      </div>

      {/* Right Content - Scrollable Movie Cards */}
      <div className="content">
        <div className="movie-grid">
          {filteredMovies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <h3>{movie.title} ({movie.year})</h3>
              <p>Genres: {movie.genres.join(', ')}</p>
              <p>⭐ {movie.rating}/10</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Interface;
