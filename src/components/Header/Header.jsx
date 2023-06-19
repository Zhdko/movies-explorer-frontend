import './Header.css';
import Navigation from './Navigation/Navigation';
import AuthNavigation from './AuthNavigation/AuthNavigation';
import Logo from '../Logo/Logo';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function Header(props) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  function handleMenuBtnClick() {
    setIsOpen(!isOpen);
  }
  return (
    <header className='header'>
      <Logo />
      {location.pathname === '/' ? (
        <Navigation />
      ) : (
        <AuthNavigation handleMenuBtnClick={handleMenuBtnClick} isOpen={isOpen} />
      )}
    </header>
  );
}

export default Header;
