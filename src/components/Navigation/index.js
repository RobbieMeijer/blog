import { Link } from 'react-router-dom';
import './style.css';

function Navigation() {
  return (
    <nav className="menu">
      <ul className="menu__list">
        <li className="menu__list-item">
          <Link className="menu__link" to="/">
            Home
          </Link>
        </li>
        <li className="menu__list-item">
          <Link className="menu__link" to="/archive">
            Blog Archive
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
