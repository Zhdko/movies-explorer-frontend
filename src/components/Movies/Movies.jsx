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
      <main className='movies'>
        <SearchForm />
        <MoviesCardList movies={movies} />
      </main>
      <Footer />
    </div>
  );
}

export default Movies;
