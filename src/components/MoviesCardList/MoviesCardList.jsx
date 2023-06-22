import Message from '../Message/Message';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import './MoviesCardList.css';

function MoviesCardList(props) {
  if (props.isLoading) return <Preloader />;
  if (props.movies.length === 0) return <Message message='Ничего не найдено' />;
  if (props.isResultError)
    return (
      <Message
        message={
          'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
        }
      />
    );

  return (
    <div>
      <ul className='cards list'>
        {props.movies.map((movie) => {
          return (
            <MoviesCard
              key={movie.id || movie.movieId}
              movie={movie}
              onClick={props.onClick}
              isFavorite={props.isFavorite}
              handleLike={props.handleLike}
              handleDelete={props.handleDelete}
              isSaved={props.isSaved}
            />
          );
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
