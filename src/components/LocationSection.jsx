import { Link } from "react-router-dom";
function LocationSection({
  title,
  description,
  address,
  satNav,
  mapSrc,
  mapLink,
}) {
  const handleMapClick = (event) => {
    event.target.style.pointerEvents = "none";
  };

  return (
    <section>
      <h2 className="section__header">{title}</h2>
      <p>{description}</p>
      <p>
        <strong>Address:</strong> {address}
      </p>
      <p>
        <strong>SatNav co-ordinates:</strong> {satNav}
      </p>
      <div className="google-maps">
        <div className="overlay" onClick={handleMapClick} />
        <iframe
          src={mapSrc}
          width="600"
          height="450"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen
        />
      </div>
      {mapLink && (
        <span className="link-leader link-leader--inverse">
          <div className="navigation-links">
            <Link to="/accomodations">Got it - but where can we stay?</Link>
          </div>
        </span>
      )}
    </section>
  );
}

export default LocationSection;
