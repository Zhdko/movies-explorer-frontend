import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList(props) {
  return (
    <div>
      <ul className='cards list'>
        {props.movies.map((movie) => {
          return <MoviesCard key={movie.movieId} movie={movie} onClick={props.onClick} children={props.children} />;
        })}
      </ul>
      {props.movies.length > 6 && (
        <button type='button' className='show-more-btn'>
          Ещё
        </button>
      )}
    </div>
  );
}

export default MoviesCardList;
