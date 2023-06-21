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
import ProtectedRouteElement from '../../ProtectedRoute/ProptectedRoute';
import CurrentUserContext from '../Contexts/CurrentUserContext';
import * as auth from '../../utils/auth';
import api from '../../utils/Api';
import PopupInfo from '../PopupInfo/PopupInfo';
import movieApi from '../../utils/MoviesApi';

function App(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [message, setMessage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  function getUserInfo() {
    api
      .getUserData()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => openPopup(err.message));
  }

  function handleRegister(password, email, name) {
    auth
      .register(password, email, name)
      .then((res) => {
        navigate('/signin', { replace: true });
      })
      .catch((err) => openPopup(err.message))
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
      .catch((err) => openPopup(err.message));
  }

  function handleLogout() {
    auth
      .logout()
      .then((res) => {
        setLoggedIn(false);
        navigate('/', { replace: true });
      })
      .catch((err) => openPopup(err.message))
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
      .catch((err) => openPopup(err.message))
      .finally(() => {
        openPopup('Данные успешно изменены', true);
        setTimeout(() => closePopup(), 1000);
      });
  }

  function openPopup(message, isSuccessfully) {
    setIsOpen(true);
    setMessage({
      isSuccessfully: isSuccessfully || false,
      text: message || 'Что-то пошло не так!',
    });
  }

  function closePopup() {
    setIsOpen(false);
    setTimeout(() => setMessage(null), 400);
  }

  function handleSearch(filmName, isShortFilms) {
    if (filmName === '' || null) {
      openPopup('Нужно ввести ключевое слово', false);
      setTimeout(() => closePopup(), 1000);
      return;
    }

    movieApi
      .getMovies()
      .then((res) => {
        const filteredMovies = res.filter((movie) => movie.nameRU.toLowerCase().includes(filmName.toLowerCase()));
        const movies = isShortFilms ? filteredMovies.filter((movie) => movie.duration <= 40) : filteredMovies;
        setIsLoading(true);
        localStorage.setItem('movieName', filmName);
        localStorage.setItem('movies', movies);
        localStorage.setItem('isShortFilms', isShortFilms);
      })
      .catch((err) => openPopup(err.message))
      .finally(() => {
        setTimeout(() => setIsLoading(false), 3000);
      });
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
              />
            }
          />
          <Route
            path='/saved-movies'
            element={<ProtectedRouteElement loggedIn={loggedIn} element={SavedMovies} isLoading={isLoading} />}
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
        <PopupInfo message={message} isOpen={isOpen} onClose={closePopup} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
