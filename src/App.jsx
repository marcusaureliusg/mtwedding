import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Gallery from "./components/Gallery";
import GuestMap from "./components/GuestMap";
import Schedule from "./components/Schedule";
import Accomodations from "./components/Accomodations";
import Location from "./components/Location";
import Questions from "./components/Questions";
import Engagement from "./components/Engagement";
import Rsvp from "./components/Rsvp";
import Login from "./components/Login";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setIsLoading(false);
    });
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const ProtectedRoute = ({ children }) => {
    if (isLoading) {
      return (
        <div className="loading-container homebg">
          <div>
            <div className="spinner"></div>
            <div className="loading-text">Loading...</div>
          </div>
        </div>
      );
    }
    if (!isLoggedIn) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const routes = [
    { path: "/", Component: Home, protected: true },
    {
      path: "/login",
      Component: Login,
      protected: false,
      props: { onLogin: handleLoginSuccess },
    },
    { path: "/gallery", Component: Gallery, protected: true },
    { path: "/map", Component: GuestMap, protected: true },
    { path: "/location", Component: Location, protected: true },
    { path: "/engagement", Component: Engagement, protected: true },
    { path: "/questions", Component: Questions, protected: true },
    { path: "/schedule", Component: Schedule, protected: true },
    { path: "/accomodations", Component: Accomodations, protected: true },
    { path: "/rsvp", Component: Rsvp, protected: true },
  ];

  return (
    <Router>
      <Navigation />
      <Routes>
        {routes.map(
          ({ path, Component, protected: isProtected, props = {} }, index) => (
            <Route
              key={index}
              path={path}
              element={
                isProtected ? (
                  <ProtectedRoute>
                    <Component {...props} />
                  </ProtectedRoute>
                ) : (
                  <Component {...props} />
                )
              }
            />
          )
        )}
      </Routes>
    </Router>
  );
}

export default App;
