import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';
import { useState } from 'react';

function SavedMovies(props) {
  const [filteredMovies, setFilteredMovies] = useState(props.movies);

  function handleSearch(filmName, isShortFilms) {
    const filteredMovies = props.movies.filter((movie) => movie.nameRU.toLowerCase().includes(filmName.toLowerCase()));

    if (isShortFilms) {
      setFilteredMovies(filteredMovies.filter((movie) => movie.duration <= 40));
    }
    setFilteredMovies(filteredMovies);
  }

  return (
    <div>
      <Header loggedIn={props.loggedIn} />
      <main className='movies'>
        <SearchForm handleSearch={props.handleSearch} defaultInputValue='' />
        <MoviesCardList movies={props.movies} isFavorite={true} handleDelete={props.handleDelete} />
      </main>
      <Footer />
    </div>
  );
}

export default SavedMovies;
