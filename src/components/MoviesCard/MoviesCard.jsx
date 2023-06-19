import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import { useState } from 'react';

function MoviesCard(props) {
  const movie = props.movie;
  const location = useLocation();
  const [isFavorite, setIsFavorite] = useState(false);

  function toggleFavoriteMovie() {
    setIsFavorite(!isFavorite);
  }

  function deleteFavoriteMovie() {}

  return (
    <li className='card'>
      <div className='card__info'>
        <div className='card__discription'>
          <h2 className='card__title'>{movie.nameRU}</h2>
          <p className='card__duration'>{movie.duration}</p>
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
      <img src={movie.image} alt={movie.nameRU} className='card__img' />
    </li>
  );
}

export default MoviesCard;
