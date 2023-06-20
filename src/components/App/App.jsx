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

function App(props) {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, serCurrentUser] = useState({});

  function handleRegister(password, email, name) {
    auth
      .register(password, email, name)
      .then((res) => {
        navigate('/signin', { replace: true });
      })
      .catch((err) => console.log(err));
  }
  function handleLogin(email, password) {
    auth.authorize(email, password).then((res) => {
      navigate('/movies', { replace: true });
    });
  }

  return (
    <div className='content'>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/movies' element={<ProtectedRouteElement loggedIn={loggedIn} element={Movies} />} />
          <Route path='/saved-movies' element={<ProtectedRouteElement loggedIn={loggedIn} element={SavedMovies} />} />
          <Route path='/profile' element={<ProtectedRouteElement loggedIn={loggedIn} element={Profile} />} />
          <Route path='/signin' element={<Login onLogin={handleLogin} />} />
          <Route path='/signup' element={<Register onRegister={handleRegister} />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
