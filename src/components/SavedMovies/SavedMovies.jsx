import movies from '../../utils/moviesList';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';

function SavedMovies(props) {
  const savedMovies = movies.filter((movie) => movie.hasOwnProperty('owner'));
  return (
    <div>
      <Header loggedIn={props.loggedIn} />
      <section className='movies'>
        <SearchForm />
        {props.isLoading ? <Preloader /> : <MoviesCardList movies={savedMovies} />}
      </section>
      <Footer />
    </div>
  );
}

export default SavedMovies;
