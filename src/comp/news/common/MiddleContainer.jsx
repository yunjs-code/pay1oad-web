import React from 'react';
import { Link } from 'react-router-dom';
import './MiddleContainer.css';

const MiddleContainer = ({ announcements }) => {
  return (
    <div className="middle-container">
      <div className="announcement-slider">
        {announcements.map((announcement, index) => (
          <Link
            key={index}
            to={`/announcement/${announcement.id}`}
            className="announcement"
          >
            {announcement.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MiddleContainer;
