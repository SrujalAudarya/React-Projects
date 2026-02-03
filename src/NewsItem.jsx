import React, { useState } from 'react';

const NewsItem = ({ title, description, src, url, author }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="col-md-4 mb-4">
      {/* ADDED: bg-dark, text-light, and border-secondary for a subtle outline */}
      <div className="card h-100 shadow-sm bg-transparent text-light border-primary news-card">
        
        <img 
          src={src || "https://via.placeholder.com/400x200?text=No+Image"} 
          className="card-img-top" 
          alt={title} 
          style={{ height: "200px", objectFit: "cover", opacity: "0.9" }} // Slight opacity blends image better
        />

        <div className="card-body d-flex flex-column">
          {/* Changed text-dark to text-light */}
          <h5 className="card-title font-weight-bold text-light">{title}</h5>
          
          {/* Changed text-muted to text-secondary for better visibility on dark */}
          <p className="text-secondary small mb-2">
            By <span className="font-weight-bold text-light">{author || "Unknown"}</span>
          </p>

          <p className="card-text flex-grow-1" style={{ color: '#b0b3b8' }}>
            {isExpanded ? description : description ? description.slice(0, 100) + "..." : "No description."}
            
            {description && description.length > 100 && (
              <span 
                onClick={toggleReadMore} 
                // Changed color to a lighter cyan/blue for dark mode
                style={{ color: '#4dabf7', cursor: 'pointer', fontWeight:'bolder', marginLeft: '5px' }}
              >
                {isExpanded ? " Show Less" : " See More"}
              </span>
            )}
          </p>
          
          {/* Changed button to btn-light or btn-outline-light for contrast */}
          <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-block mt-3">
            Go to Source Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;