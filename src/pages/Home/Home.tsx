import React, { FC } from 'react';
import logo from '@/assets/images/react-logo.svg';
import './Home.scss';

export const Home: FC = (): JSX.Element => (
  <div className='Home'>
    <header className='Home-header'>
      <img src={logo} className='Home-logo' alt='logo' />
    </header>
  </div>
);
