import { Route, Routes, useNavigate } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import './App.css';
import NotFound from '../NotFound/NotFound';
import { useState } from 'react';
import ProtectedRouteElement from '../ProtectedRoute/ProptectedRoute';
import CurrentUserContext from '../Contexts/CurrentUserContext';
import * as auth from '../../utils/auth';
import api from '../../utils/Api';
import PopupInfo from '../PopupInfo/PopupInfo';
import movieApi from '../../utils/MoviesApi';

function App(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [infoMessage, setInfoMessage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResultError, setIsResultError] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);

  const navigate = useNavigate();

  function getUserInfo() {
    api
      .getUserData()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => openPopup(err));
  }

  function handleRegister(password, email, name) {
    auth
      .register(password, email, name)
      .then((res) => {
        navigate('/signin', { replace: true });
      })
      .catch((err) => openPopup(err))
      .finally(() => {
        openPopup('Вы успешно зарегистрированы!', true);
        setTimeout(() => closePopup(), 1000);
      });
  }

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((res) => {
        setLoggedIn(true);
        getUserInfo();
        navigate('/movies', { replace: true });
      })
      .catch((err) => openPopup(err));
  }

  function handleLogout() {
    auth
      .logout()
      .then((res) => {
        setLoggedIn(false);
        navigate('/', { replace: true });
      })
      .catch((err) => openPopup(err))
      .finally(() => {
        openPopup('Вы вышли из системы.', true);
        setTimeout(() => closePopup(), 1200);
      });
  }

  function handleEditProfile(userData) {
    api
      .setUserInfo(userData)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => openPopup(err))
      .finally(() => {
        openPopup('Данные успешно изменены', true);
        setTimeout(() => closePopup(), 1000);
      });
  }

  function openPopup(message, isSuccessfully) {
    setIsOpen(true);
    setInfoMessage({
      isSuccessfully: isSuccessfully || false,
      text: message || message.message || 'Что-то пошло не так!',
    });
  }

  function closePopup() {
    setIsOpen(false);
    setTimeout(() => setInfoMessage(null), 400);
  }

  function handleSearch(filmName, isShortFilms) {
    if (filmName === '' || filmName === undefined) {
      openPopup('Нужно ввести ключевое слово', false);
      setTimeout(() => closePopup(), 1000);
      return;
    }

    setIsLoading(true);

    movieApi
      .getMovies()
      .then((res) => {
        const filteredMovies = res.filter((movie) => movie.nameRU.toLowerCase().includes(filmName.toLowerCase()));
        const movies = isShortFilms ? filteredMovies.filter((movie) => movie.duration <= 40) : filteredMovies;
        setMovies(movies);
        localStorage.setItem('movieName', filmName);
        localStorage.setItem('movies', JSON.stringify(movies));
        localStorage.setItem('isShortFilms', JSON.stringify(isShortFilms));
      })
      .catch((err) => {
        openPopup(err);
        setIsResultError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function isSaved(card) {
    return savedMovies.some((movie) => movie.movieId === card.id);
  }

  function addToFavorites(card) {
    api
      .addToFavorites(card)
      .then((res) => {
        setSavedMovies([...savedMovies, res]);
      })
      .catch((err) => openPopup(err));
  }

  function removeFromFavorites(card) {
    const savedMovie = savedMovies.find(
      (movie) => movie.movieId === (card.movieId || card.id) && movie.owner._id === currentUser._id
    );
    api
      .removeCard(savedMovie._id)
      .then((res) => {
        setSavedMovies(savedMovies.filter((movie) => movie._id !== savedMovie._id));
      })
      .catch((err) => openPopup(err));
  }

  return (
    <div className='content'>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path='/' element={<Main loggedIn={loggedIn} />} />
          <Route
            path='/movies'
            element={
              <ProtectedRouteElement
                loggedIn={loggedIn}
                element={Movies}
                handleSearch={handleSearch}
                movies={movies}
                isLoading={isLoading}
                isResultError={isResultError}
                defaultInputValue={localStorage.getItem('movieName') || ''}
                handleLike={addToFavorites}
                handleDelete={removeFromFavorites}
                isSaved={isSaved}
              />
            }
          />
          <Route
            path='/saved-movies'
            element={
              <ProtectedRouteElement
                loggedIn={loggedIn}
                element={SavedMovies}
                isLoading={isLoading}
                handleSearch={handleSearch}
                movies={savedMovies}
                handleDelete={removeFromFavorites}
              />
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRouteElement
                loggedIn={loggedIn}
                element={Profile}
                onLogout={handleLogout}
                onEditProfile={handleEditProfile}
              />
            }
          />
          <Route path='/signin' element={<Login onLogin={handleLogin} />} />
          <Route path='/signup' element={<Register onRegister={handleRegister} />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <PopupInfo message={infoMessage} isOpen={isOpen} onClose={closePopup} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
