import React from 'react';
import { FaCubes } from 'react-icons/fa';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <FaCubes className="text-primary text-5xl" aria-hidden />
              <span className="text-3xl font-bold tracking-wide text-base-content">
                Asset
                <span className="text-primary">Verse</span>
              </span>
            </Link>
          </div>
    );
};

export default Logo;