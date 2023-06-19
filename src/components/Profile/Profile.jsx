import './Profile.css';
import Header from '../Header/Header';
import useValidation from '../../hooks/useValidation';

function Profile(props) {
  const { values, errors, handleChange } = useValidation();

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <Header loggedIn={true} />
      <section className='profile'>
        <h2 className='profile__title'>{`Привет Виталий!`}</h2>
        <form className='profile-form'>
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
              value={values.name || 'Виталий'}
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
              value={values.email || 'pochta@yandex.ru'}
              onChange={handleChange}
            />
          </div>
          <span className='error error_type_profile'>{errors.email || ''}</span>
          <button
            className='profile__btn profile__btn_type_submit'
            type='submit'
            aria-label='Редактировать профиль'
            onSubmit={handleSubmit}
          >
            Редактировать
          </button>
        </form>
        <button className='profile__btn profile__btn_type_exit' type='button' aria-label='Выйти из аккаунта'>
          Выйти из аккаунта
        </button>
      </section>
    </>
  );
}

export default Profile;
