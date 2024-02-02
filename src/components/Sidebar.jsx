// Sidebar.jsx
import { Link } from 'react-router-dom';
import './Sidebar.css';
import PropTypes from 'prop-types';


function Sidebar({ className }) {
  return (
    <nav className={`sidebar ${className}`}>
      <Link to="/">Home</Link>
      <Link to="/gallery">Gallery</Link>
      <Link to="/map">Guest Map</Link>
    </nav>
  );
}

Sidebar.propTypes = {
    className: PropTypes.string
  };

export default Sidebar;
