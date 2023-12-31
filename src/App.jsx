// App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Gallery from './components/Gallery';
import GuestMap from './components/GuestMap';
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <button className="sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        {isSidebarOpen ? 'Close' : 'Menu'}
      </button>

      <Sidebar className={isSidebarOpen ? 'open' : ''} />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/map" element={<GuestMap />} />
      </Routes>
    </Router>
  );
}

export default App;
