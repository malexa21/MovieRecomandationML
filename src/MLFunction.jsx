import { useState, useEffect } from 'react';
import Movies from './MoviesDataBase';

const MLMovies = ({ favoriteMovieIds }) => {
  const [recommendations, setRecommendations] = useState([]);
  // initializam o lista goala unde sa tinem minte recomandarile si state-ul lor

  console.log("ID-uri favorite primite:", favoriteMovieIds);

  const getRecommendations = () => {
    const favoriteMovies = Movies.filter(movie => 
      favoriteMovieIds.includes(movie.id)
    );
// creeam o variabila care tine minte id-ul fiecarui film favorit

    if (favoriteMovies.length === 0){
      console.log("nu exista recomandari");
      return[];
    } 
//verificam daca chiar exista filme favorite, altfel returnam o lista goala

    //Definim pentru program la care detalii ale filmului trebuie sa se uite, astfel incat sa le invete
    const favoriteFeatures = {
        genres: {},
        averageRating: 0,
        recentYears: 0,
        isFavorite: false,
    };

    //Analizam elementele comune tuturor filmelor favorite
    favoriteMovies.forEach(movie => {
      movie.genres.forEach(genre => {
        favoriteFeatures.genres[genre] = (favoriteFeatures.genres[genre] || 0) + 1;
      });
      favoriteFeatures.averageRating += movie.rating;
    });


    const scoredMovies = Movies.map(movie => {
      if (favoriteMovieIds.includes(movie.id))return null;//Pentru a nu analiza scorul fiecarui film favorit din nou, il anulam pe acesta pentru a verifica
      //doar filmele care nu sunt deja favorite
        
        let score = 0;
      
      //verificam care genuri coincid
        movie.genres.forEach(genre => {
          score += favoriteFeatures.genres[genre] || 0; //alternativa la return 0
        });

        score += 10 - Math.abs(movie.rating - (favoriteFeatures.averageRating / favoriteMovies.length));

        return { ...movie, score };

      

      // ne asiguram ca nu recomandam filmele deja favorite/vizionate

    }).filter(Boolean); //

    return scoredMovies.slice(0,3); //returnam doar primele 3 filme cu cele mai mari scoruri
  };

  useEffect(() => {
    setRecommendations(getRecommendations());
  }, [favoriteMovieIds]); // asigura rerandarea si recalcularea scorurilor de fiecare data cand filmele favortie se schimba sau sunt adaugate

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