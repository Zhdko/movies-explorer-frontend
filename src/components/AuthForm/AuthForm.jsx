import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './AuthForm.css';

function AuthForm(props) {
  return (
    <main className='auth'>
      <div className='auth__container'>
        <header>
          <Logo />
        </header>
        <h2 className='auth__title'>{props.title}</h2>
        <form className='form'>
          {props.children}
          <button className='form__submit-btn' type='submit' aria-label={props.textBtn}>
            {props.textBtn}
          </button>
        </form>
        <footer className='auth__footer'>
          <p className='auth__subtitle'>{props.subtitle}</p>
          <Link className='auth__link link' to={props.link}>
            {props.textLink}
          </Link>
        </footer>
      </div>
    </main>
  );
}

export default AuthForm;
