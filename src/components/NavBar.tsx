import { NavLink } from 'react-router-dom';
import './NavBar.scss';

function NavBar() {
  return (
    <nav className='navbar'>
      <NavLink to='/' className='navbar-brand'>
        Marvel
      </NavLink>

      <ul className='navbar-nav'>
        <li className='nav-item'>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
            to='/characters'>
            Characters
          </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink to='/comics' className='nav-link'>
            Comics
          </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink to='/stories' className='nav-link'>
            Stories
          </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink to='/bookmarks' className='nav-link'>
            Bookmarks
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
