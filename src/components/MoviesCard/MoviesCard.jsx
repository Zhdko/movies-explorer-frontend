import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import { useState } from 'react';

function MoviesCard(props) {
  const movie = props.movie;
  const location = useLocation();

  const name = movie.nameRU;
  const cover = props.isFavorite ? movie.image : 'https://api.nomoreparties.co' + movie.image.url;

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

  function handleLike() {
    props.isSaved(movie) ? props.handleDelete(movie) : props.handleLike(movie);
  }

  function handleDelete() {
    props.handleDelete(movie);
  }

  return (
    <li className='card'>
      <div className='card__info'>
        <div className='card__discription'>
          <h2 className='card__title'>{name}</h2>
          <p className='card__duration'>{duration()}</p>
        </div>
        {location.pathname === '/saved-movies' ? (
          <button type='button' onClick={handleDelete} className='card__icon card__delete' />
        ) : (
          <button
            type='button'
            onClick={handleLike}
            className={`card__icon card__like ${props.isSaved(movie) && 'card__like_active'}`}
          />
        )}
      </div>
      <img src={cover} alt={name} className='card__img' />
    </li>
  );
}

export default MoviesCard;
