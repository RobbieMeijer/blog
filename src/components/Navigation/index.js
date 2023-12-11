import './style.scss';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="menu">
      <ul className="menu__list">
        <li className="menu__list-item">
          <Link className="menu__link" to="/">
            Home
          </Link>
        </li>
        <li className="menu__list-item">
          <Link className="menu__link" to="/blog">
            Blog
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
