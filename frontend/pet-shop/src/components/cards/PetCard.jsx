/*
Flow of execution
1. Receives 'pet' object via props.
2. Uses useNavigate to allow clicking the card to go to the pet's details page.
*/

import React from 'react';
// useNavigate is a React Router hook that lets us change pages using JavaScript
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../utils/helpers';

const PetCard = (props) => {
  const { pet, onBuy, showBuyButton = false } = props;
  
  // Initialize the navigate function
  const navigate = useNavigate();

  // Function to handle clicking the whole card
  const handleCardClick = () => {
    navigate(`/pets/${pet.id}`); // Send user to the pet details page
  };

  // Function to handle clicking the buy button
  const handleBuyClick = (event) => {
    event.stopPropagation(); // Stop the card click event from firing too
    if (onBuy) {
      onBuy(pet);
    }
  };

  return (
    <div className="card h-100 shadow-sm border-0"
      
      style={{ transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
      onClick={handleCardClick}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.classList.add('shadow');
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.classList.remove('shadow');
      }}
    >
      {/* Pet Image */}
      <img className="card-img-top"
        
        style={{ height: '200px', objectFit: 'cover' }}
        // If the pet has no image, we generate a random placeholder using their ID
        src={pet.image_url || `https://picsum.photos/seed/${pet.id}/400/200`}
        alt={pet.name}
        onError={(e) => { e.target.src = `https://picsum.photos/seed/${pet.id}/400/200`; }}
      />
      
      {/* Pet Details */}
      <div className="card-body d-flex flex-column pb-2" >
        <div className="d-flex justify-content-between align-items-start mb-2" >
          <h5 className="card-title fw-bold mb-0 text-truncate"  style={{ maxWidth: '70%' }}>
            {pet.name}
          </h5>
          <span className="badge bg-primary fs-6 px-2 py-1"  >
            {formatCurrency(pet.price)}
          </span>
        </div>
        <p className="card-text text-muted small mb-2" >
          🐾 {pet.breed} • {pet.age} yr{pet.age !== 1 ? 's' : ''}
        </p>
        <p className="card-text text-muted small flex-grow-1" 
          
          style={{
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2, // Only show 2 lines of description
            WebkitBoxOrient: 'vertical',
            minHeight: '40px',
          }}
        >
          {pet.description}
        </p>
      </div>

      {/* Optional Buy Button */}
      {showBuyButton && (
        <div className="card-footer bg-transparent border-0 px-3 pb-3 pt-0" >
          <button className="btn btn-primary w-100 fw-bold d-flex justify-content-center align-items-center gap-2"  onClick={handleBuyClick} >
            <i className="bi bi-suit-heart-fill" ></i> Adopt Now
          </button>
        </div>
      )}
    </div>
  );
};

export default PetCard;


