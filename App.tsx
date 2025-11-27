import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import GalleryPage from './pages/GalleryPage';
import ExperiencePage from './pages/ExperiencePage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-stone-50 text-stone-900 font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/experience/:id" element={<ExperiencePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;