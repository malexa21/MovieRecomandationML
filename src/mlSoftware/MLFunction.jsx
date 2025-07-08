
import Movies from '../MoviesDataBase';

const MLMovies = ({ favoriteMovieIds }) => {

  const learnFromFavorites = () => {
    const favoriteMovies = Movies.filter(movie => favoriteMovieIds.includes(movie.id));//filtreaza filmele favorite fara a crea un array pentru ele
    
    const learnedData = {//obiect de invatare
      likedGenres: {},
      avgRating: 0
    };

    if (favoriteMovies.length === 0) return learnedData;//daca nu exista filme favorite, returneaza un obiect gol

    // calculeaza preferinte precum gen sau rating
    favoriteMovies.forEach(movie => {
      movie.genres.forEach(genre => {
        learnedData.likedGenres[genre] = (learnedData.likedGenres[genre] || 0) + 1;//calculeaza aparitia fiecarui gen comun, cele neexistente fiind anulate
      });
      learnedData.avgRating += movie.rating;//aduna rating-ul tuturor filmelor care au acelasi gen
    });
    
    learnedData.avgRating /= favoriteMovies.length;//calculeaza rating-ul mediu necesar
    return learnedData;//invata datele de recomandare
  };

  //predictia pe baza datelor invatate
  const predictMovieScore = (movie, learnedData) => {
    let genreScore = 0;

    movie.genres.forEach(genre => {
      genreScore += learnedData.likedGenres[genre] || 0;
    });

    const ratingDiff = Math.abs(movie.rating - learnedData.avgRating);

    return genreScore + (10 - ratingDiff);
};

  const getRecommendations = () => {
    const learnedData = learnFromFavorites();

    return Movies
      .filter(movie => !favoriteMovieIds.includes(movie.id)) // elimina favoritele
      .map(movie => ({//creeaza o lista in care se afla doar filmele nefavorite
        ...movie, score: predictMovieScore(movie, learnedData) //invata scorul pentru urmatoarele utilizari
      }))
      .slice(0, 1); // ia cel mai bun scor
  };

  const recommendations = getRecommendations();

return (
  <div>
    <h2>Recommendations</h2>
      {(() => {
        if (!recommendations || recommendations.length === 0) {
          return <p>No recommendations available</p>;
        } else {
          return (
            <ul>
              {recommendations.map(movie => movie && (
                <li key={movie.id}>
                  <h3>{movie.title}</h3>
                  <p>Genres: {movie.genres.join(', ')}</p>
                </li>
              ))}
            </ul>
          );
        }
      })()}
  </div>
);
};

export default MLMovies;