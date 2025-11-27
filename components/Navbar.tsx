import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-stone-900 text-stone-50 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wider flex items-center gap-2">
          <span className="bg-green-700 text-white px-2 py-1 rounded-md text-lg">K</span>
          <span>KultureXR</span>
        </Link>
        <div className="flex gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-green-500 transition-colors">Home</Link>
          <Link to="/gallery" className="hover:text-green-500 transition-colors">Gallery</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;