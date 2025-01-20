import Button from "./Button";

function Navigation() {
  return (
    <div className="navbar">
      <Button to="/" className="sidebar-toggle" textClass="button-text">
        M + T
      </Button>
      <Button to="/wedding-photos" className="sidebar-toggle">
        WEDDING PHOTOS
      </Button>
      <Button to="/schedule" className="sidebar-toggle">
        SCHEDULE
      </Button>
      <Button to="/location" className="sidebar-toggle">
        LOCATION
      </Button>
      <Button to="/accomodations" className="sidebar-toggle">
        ACCOMODATIONS
      </Button>
      <Button to="/engagement" className="sidebar-toggle">
        The ENGAGEMENT
      </Button>
      <Button to="/rsvp" className="sidebar-toggle">
        RSVP
      </Button>
      <Button to="/questions" className="sidebar-toggle">
        Q & A
      </Button>
      <Button to="/registry" className="sidebar-toggle">
        REGISTRY
      </Button>
    </div>
  );
}

export default Navigation;
