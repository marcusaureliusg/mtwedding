// Sidebar.jsx
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Make sure to create this CSS file
import PropTypes from 'prop-types';


function Sidebar({ className }) {
  return (
    <nav className={`sidebar ${className}`}>
      <Link to="/">Home</Link>
      <Link to="/gallery">Gallery</Link>
      <Link to="/map">Guest Map</Link>
      {/* other links */}
    </nav>
  );
}

Sidebar.propTypes = {
    className: PropTypes.string
  };

export default Sidebar;
