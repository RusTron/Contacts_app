import React from 'react';
import { NavLink } from 'react-router-dom';
import WezomLogo from '../assets/images/wezom-logo.svg';
import './style.scss';

const View = React.memo(function view() {
  return (
    <NavLink to='/' className='logo' activeClassName='is-active' exact={true}>
      <img className='logo__img' src={WezomLogo} alt='Wezom' />
    </NavLink>
  );
});

export { View };
