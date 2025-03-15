
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-restaurant-700 to-restaurant-500">
        Saawariya Rasoi
      </span>
    </Link>
  );
};

export default Logo;
