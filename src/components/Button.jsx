import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Button({ to, children, textClass }) {
  return (
    <Link to={to}>
      <button className="sidebar-toggle primary-nav__item">
        <span className={textClass}>{children}</span>
      </button>
    </Link>
  );
}

Button.propTypes = {
  to: PropTypes.string,
  children: PropTypes.string,
};

export default Button;
