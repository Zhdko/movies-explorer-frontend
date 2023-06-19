import movies from '../../utils/moviesList';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';

function Movies(props) {
  return (
    <div>
      <Header loggedIn={true} />
      <section className='movies'>
        <SearchForm />
        <MoviesCardList movies={movies} />
      </section>
      <Footer />
    </div>
  );
}

export default Movies;
