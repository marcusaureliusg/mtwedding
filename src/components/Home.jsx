// Home.jsx
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="homebg">
      <div className="bg-tint"></div>
      <div className="hero-flex-wrap">
        <div>
          <div className="wrapper">
            <div className="hero animated fadeInUp">
              {" "}
              <span className="hero__txt hero__txt--lrg">
                Marcus and Taylor are getting married!
              </span>{" "}
              <span className="hero__txt hero__txt--sm">
                June 8, 2024 · 3.30pm
              </span>{" "}
              <span className="hero__txt hero__txt--sm">Bozeman, Montana</span>
            </div>
            <span className="link-leader">
              {" "}
              <div className="navigation-links home-link">
                <Link to="/schedule">So whats the plan?</Link>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
