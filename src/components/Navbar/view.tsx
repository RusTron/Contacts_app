import './style.scss';
import React from 'react';
import { NavLink } from 'react-router-dom';

// interface Props {
//   location: string;
// }

export const View = (): JSX.Element => {
  // const location = useLocation();
  // console.log(location);
  return (
    <div className='navbar'>
      <ul className='navbar__list'>
        <li className='navbar__item'>
          <NavLink to='/' exact={true} className='navbar__link' activeClassName='active-link'>
            Home
          </NavLink>
          <NavLink to='/contacts' className='navbar__link' activeClassName='active-link'>
            Contacts
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
