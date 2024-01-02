import './style.scss';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navigation = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('/');

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  return (
    <nav className="menu">
      <ul className="menu__list">
        <li className="menu__list-item">
          <Link
            className={`menu__link ${'/' === activeLink ? 'active' : ''}`}
            to="/"
            onClick={() => setActiveLink('/')}
          >
            Home
          </Link>
        </li>
        <li className="menu__list-item">
          <Link
            className={`menu__link ${'/blog' === activeLink ? 'active' : ''}`}
            to="/blog"
            onClick={() => setActiveLink('/blog')}
          >
            Blog
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
