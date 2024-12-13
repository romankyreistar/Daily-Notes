import { NavLink } from 'react-router-dom';
import { useIndicator } from '../../hooks/useIndicator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faHomeAlt,
  faListDots,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const navLinks = [
    { name: 'Dashboard', icon: faHomeAlt, url: '/dashboard/all', step: 'all' },
    // {
    //   name: 'Notes to do',
    //   icon: faListDots,
    //   url: '/dashboard/Notes-todo',
    //   step: 'Notes-todo',
    // },
    {
      name: 'Important',
      icon: faStar,
      url: '/dashboard/important',
      step: 'important',
    },
    {
      name: 'Completed',
      icon: faCircleCheck,
      url: '/dashboard/completed',
      step: 'completed',
    },
  ];

  const {
    indicatorStyle,
    windowWidth,
    sidebarRef,
    indicatorRef,
    activeIndex,
    navListClass,
    navListRef,
  } = useIndicator(navLinks);

  return (
    <nav className='navbar' ref={sidebarRef}>
      <ul className={`nav-list flex ${navListClass}`} ref={navListRef}>
        <li
          className='indicator'
          ref={indicatorRef}
          style={{
            transform:
              windowWidth <= 700
                ? indicatorStyle.transformX
                : indicatorStyle.transformY,
          }}
        ></li>
        {navLinks.map((link, index) => {
          return (
            <NavLink
              to={link.url}
              key={index}
              className={`nav-link flex ${
                activeIndex === index ? 'link-active' : ''
              }`}
            >
              <FontAwesomeIcon icon={link.icon} />
              <span>{link.name}</span>
            </NavLink>
          );
        })}
      </ul>
    </nav>
  );
};
