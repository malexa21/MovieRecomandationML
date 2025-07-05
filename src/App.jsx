import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [selectedGenre, setSelectedGenre] = useState('');

  const genres = ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror'];

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
  };

  return (
    <div className="container">
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
          <p>🎥 Recomandări pentru genul: <strong>{selectedGenre}</strong></p>
        ) : (
          <p>Selectează un gen pentru a primi recomandări.</p>
        )}
      </div>
    </div>
  );
};

export default App;
