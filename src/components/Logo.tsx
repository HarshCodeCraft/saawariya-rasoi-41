
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <div className="mr-2">
        <img 
          src="/lovable-uploads/d78bd6a6-d487-4464-bcec-aef43c95de9a.png" 
          alt="Saawariya Rasoi" 
          className="h-12 w-auto"
        />
      </div>
      <div className="hidden sm:block">
        <span className="text-xl font-bold font-brand tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-saawariya-red to-saawariya-darkred">
          Saawariya Rasoi
        </span>
        <span className="block text-xs text-saawariya-darkred font-medium">
          Homemade Goodness with Purwanchl Taste
        </span>
      </div>
    </Link>
  );
};

export default Logo;
