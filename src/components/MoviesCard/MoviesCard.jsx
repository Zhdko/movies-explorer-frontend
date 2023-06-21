import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import { useState } from 'react';

function MoviesCard(props) {
  const movie = props.movie;
  const location = useLocation();
  const [isFavorite, setIsFavorite] = useState(false);

  const name = movie.nameRU;
  const cover = 'https://api.nomoreparties.co' + movie.image.url;

  const duration = () => {
    const minutes = (movie.duration % 60) + 'м';
    const hours = Math.floor(movie.duration / 60) + 'ч';
    if (movie.duration > 60) {
      return hours + ' ' + minutes;
    } else if (movie.duration === 60) {
      return hours;
    } else {
      return minutes;
    }
  };

  function toggleFavoriteMovie() {
    setIsFavorite(!isFavorite);
  }

  function deleteFavoriteMovie() {}

  return (
    <li className='card' key={movie.movieId}>
      <div className='card__info'>
        <div className='card__discription'>
          <h2 className='card__title'>{name}</h2>
          <p className='card__duration'>{duration()}</p>
        </div>
        {location.pathname === '/saved-movies' ? (
          <button type='button' onClick={deleteFavoriteMovie} className='card__icon card__delete' />
        ) : (
          <button
            type='button'
            onClick={toggleFavoriteMovie}
            className={`card__icon card__like ${isFavorite && 'card__like_active'}`}
          />
        )}
      </div>
      <img src={cover} alt={name} className='card__img' />
    </li>
  );
}

export default MoviesCard;
