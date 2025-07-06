import {useState} from React;
import movie from './App';
import Movies from './MoviesDataBase'

const MLMovies = () => {
    const favoriteMovies = movie.filter(selectedMovie => selectedMovie.isFavorite);

    const commonGenres = [];
    favoriteMovies.forEach(movie => {
        movie.genres.forEach(genre => {
            if (!commonGenres.includes(genre)) {
                commonGenres.push(genre);
            }
        });
    });

}

export default MLMovies;