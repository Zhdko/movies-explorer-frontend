import movies from '../../utils/moviesList';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';

function SavedMovies(props) {
  const savedMovies = movies.filter((movie) => movie.hasOwnProperty('owner'));
  return (
    <div>
      <Header loggedIn={true} />
      <main className='movies'>
        <SearchForm />
        <MoviesCardList movies={savedMovies} />
      </main>
      <Footer />
    </div>
  );
}

export default SavedMovies;
