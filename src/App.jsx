import { useState } from 'react';
import './App.css';
import Movies from './MoviesDataBase.jsx';
import MLMovies from './mlSoftware/MLFunction.jsx';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const Interface = () => {
  const [movies, setMovies] = useState(Movies);
  const [selectedGenre, setSelectedGenre] = useState('All');

  const genres = ['All', 'Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror'];

  const toggleFavorite = (id) => {
    const updatedMovies = movies.map(movie => {
      if (movie.id === id) {
        return { ...movie, isFavorite: !movie.isFavorite };
      } else {
        return movie;
      }
    });
    setMovies(updatedMovies);
  };

  const getFilteredMovies = () => {
    if (selectedGenre === 'All') {
      return movies;
    } else {
      return movies.filter(movie => {
        if (movie.genres.includes(selectedGenre)) {
          return true;
        } else {
          return false;
        }
      });
    }
  };

  const getStatusMessage = () => {
    if (selectedGenre === 'All') {
      return 'Showing all movies';
    } else {
      return `🎥 Showing: ${selectedGenre}`;
    }
  };

  return (
    <div className="app">
      {/* Left Sidebar - Static Filters */}
      <div className="sidebar">
        <h1 className="title">🎬 Movie Recommender</h1>
        <div className="button-group">
          {genres.map((genre) => {
            if (genre === selectedGenre) {
              return (
                <button
                  key={genre}
                  className="genre-button active"
                  onClick={() => setSelectedGenre(genre)}
                >
                  {genre}
                </button>
              );
            } else {
              return (
                <button
                  key={genre}
                  className="genre-button"
                  onClick={() => setSelectedGenre(genre)}
                >
                  {genre}
                </button>
              );
            }
          })}
        </div>
        <div className="result">
          <p>{getStatusMessage()}</p>
        </div>
        <div className="blank"/>
        <div className='recommended'>
          <MLMovies 
            users={{
              user1: [1, 2, 10],
              user2: [3, 6, 22]
            }}
          />
        </div>
      </div>

      {/* Right Side Content - Scrollable Movie Cards */}
      <div className="content">
        <div className="movie-grid">
          {getFilteredMovies().map((movie) => {
            if (movie.isFavorite) {
              return (
                <div key={movie.id} className="movie-card favorite">
                  <button 
                    onClick={() => toggleFavorite(movie.id)}
                    className="heart-button"
                  >
                    <FaHeart className="heart-icon filled" />
                  </button>
                  <h3>{movie.title} ({movie.year})</h3>
                  <p>Genres: {movie.genres.join(', ')}</p>
                  <p>⭐ {movie.rating}/10</p>
                </div>
              );
            } else {
              return (
                <div key={movie.id} className="movie-card">
                  <button 
                    onClick={() => toggleFavorite(movie.id)}
                    className="heart-button"
                  >
                    <FaRegHeart className="heart-icon" />
                  </button>
                  <h3>{movie.title} ({movie.year})</h3>
                  <p>Genres: {movie.genres.join(', ')}</p>
                  <p>⭐ {movie.rating}/10</p>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Interface;