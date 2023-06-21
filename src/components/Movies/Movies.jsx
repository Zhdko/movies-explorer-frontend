import movies from '../../utils/moviesList';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';

function Movies(props) {
  return (
    <div>
      <Header loggedIn={props.loggedIn} />
      <section className='movies'>
        <SearchForm handleSearch={props.handleSearch} />
        {props.isLoading ? <Preloader /> : <MoviesCardList movies={props.movies} />}
      </section>
      <Footer />
    </div>
  );
}

export default Movies;
