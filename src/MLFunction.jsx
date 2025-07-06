import { useState, useEffect } from 'react';
import Movies from './MoviesDataBase';

const MLMovies = ({ favoriteMovieIds }) => {
  const [recommendations, setRecommendations] = useState([]);

  // Beginner-friendly ML-like recommendation function
  const getRecommendations = () => {
    // Step 1: Get favorite movies
    const favoriteMovies = Movies.filter(movie => 
      favoriteMovieIds.includes(movie.id)
    );

    if (favoriteMovies.length === 0) return [];

    // Step 2: Extract features from favorites (simple "learning")
    const favoriteFeatures = {
        genres: {},
        averageRating: 0,
        recentYears: 0,
        isFavorite: false,
    };

    // Count genre popularity in favorites
    favoriteMovies.forEach(movie => {
      movie.genres.forEach(genre => {
        favoriteFeatures.genres[genre] = (favoriteFeatures.genres[genre] || 0) + 1;
      });
      favoriteFeatures.averageRating += movie.rating;
      favoriteFeatures.recentYears += (movie.year > 2010) ? 1 : 0;
    });

    // Step 3: Score all movies (simple "prediction")
    const scoredMovies = Movies.map(movie => {
      if (favoriteMovieIds.includes(movie.id)) return null; // Skip favorites

      let score = 0;
      
      // Genre match scoring
      movie.genres.forEach(genre => {
        score += favoriteFeatures.genres[genre] || 0;
      });

      // Rating similarity scoring
      score += 10 - Math.abs(movie.rating - (favoriteFeatures.averageRating / favoriteMovies.length));

      // Recent movies bonus
      if (movie.year > 2010) score += 5;

      return { ...movie, score };
    }).filter(Boolean); // Remove nulls

    // Step 4: Sort by score and return top 5
    return scoredMovies.sort((a, b) => b.score - a.score).slice(0, 5);
  };

  useEffect(() => {
    setRecommendations(getRecommendations());
  }, [favoriteMovieIds]);

  return (
    <div>
      <h2>Recommendations</h2>
        <ul>
          {recommendations.map(movie => (
            <li key={movie.id}>
              <h3>{movie.title}</h3>
              <p>Genres: {movie.genres.join(', ')}</p>
            </li>
          ))}
        </ul>
    
    </div>
  );
};

export default MLMovies;