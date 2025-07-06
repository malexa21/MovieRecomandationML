import { useState } from 'react';
import Movies from './MoviesDataBase';

const MLMovies = () => {
    const [movies, setMovies] = useState(Movies); // Initialize with imported Movies

    // Funcția de recomandare
    const getRecommendations = () => {
        const favoriteMovies = movies.filter(movie => movie.isFavorite);

        if (favoriteMovies.length === 0) {
            return [];
        }

        const commonGenres = [];
        favoriteMovies.forEach(movie => {
        //Verificia doar filmele favorite in parte
            movie.genres.forEach(genre => {
            //Verifica doar genul fiecarui film in parte 
                if (!commonGenres.includes(genre)) commonGenres.push(genre);
                //Daca genurile comune dintre filemele selectate nu includ un alt gen, atunci adauga-l la lista de genuri posibile
            });
        });
        //Elimina filemele cu genuri comune, dar care au isFavorite = true fara a crea un array nou
        return movies.filter(movie => 
            !movie.isFavorite && movie.genres.some(g => commonGenres.includes(g))
            //Functia some verifica daca cel putin un elemnt din lista de genuri exista. Functioneaza binar. E practic un filter cu posibilitate decizionala fara a implica o structura decizionala
            //g reprezinta o variabila temporara care ajuta functia some sa verifice in parte fiecare gen
            //Astfel sunt returnate doar filme nefavorite cu genurile comune
        );
    };

    //Calculeaza recomandarile
    const recommendedMovies = getRecommendations();

    return (
        <div>
            <h2>Recomandări:</h2>
            <ul>
                {recommendedMovies.map(movie => (
                    <li key={movie.id}>
                        {movie.title} (Genuri: {movie.genres.join(', ')})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MLMovies;