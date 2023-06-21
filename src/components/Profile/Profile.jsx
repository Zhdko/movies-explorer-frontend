import './Profile.css';
import Header from '../Header/Header';
import useValidation from '../../hooks/useValidation';
import { useContext, useEffect } from 'react';
import CurrentUserContext from '../Contexts/CurrentUserContext';

function Profile(props) {
  const { values, setValues, errors, handleChange, isValid } = useValidation();
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setValues(currentUser);
  }, [currentUser, setValues]);

  function handleSubmit(e) {
    e.preventDefault();
    setValues(values);
    props.onEditProfile(values);
  }

  return (
    <>
      <Header loggedIn={true} />
      <section className='profile'>
        <h2 className='profile__title'>Привет {currentUser.name}!</h2>
        <form className='form profile-form' onSubmit={handleSubmit}>
          <div className='profile-form__container'>
            <label htmlFor='name' className='profile-form__label'>
              Имя
            </label>
            <input
              id='name'
              type='text'
              name='name'
              className='profile-form__input'
              required=''
              minLength={2}
              maxLength={40}
              value={values.name}
              onChange={handleChange}
            />
          </div>
          <span className='error error_type_profile'>{errors.name || ''}</span>
          <div className='profile__line'></div>
          <div className='profile-form__container'>
            <label htmlFor='email' className='profile-form__label'>
              E-mail
            </label>
            <input
              id='email'
              type='email'
              name='email'
              className='profile-form__input'
              required=''
              value={values.email}
              onChange={handleChange}
            />
          </div>
          <span className='error error_type_profile'>{errors.email || ''}</span>
          <button
            className={`profile__btn profile__btn_type_submit ${!isValid && 'profile__btn_disabled'}`}
            disabled={!isValid}
            type='submit'
            aria-label='Редактировать профиль'
          >
            Редактировать
          </button>
        </form>
        <button
          className='profile__btn profile__btn_type_exit'
          type='button'
          aria-label='Выйти из аккаунта'
          onClick={props.onLogout}
        >
          Выйти из аккаунта
        </button>
      </section>
    </>
  );
}

export default Profile;
