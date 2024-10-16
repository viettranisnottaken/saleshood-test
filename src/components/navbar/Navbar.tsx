import { useMemo } from 'react';
import './navbar.scss';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  const urls = [
    {
      label: 'Home',
      path: '/',
    },
    {
      label: 'Notes',
      path: '/notes',
    },
  ];

  return (
    <nav className="navbar">
      <div className="brand">SALESHOOD TEST</div>

      {urls.map(({ label, path }) => (
        <NavLink key={path} className="link mr-2" to={path}>
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
