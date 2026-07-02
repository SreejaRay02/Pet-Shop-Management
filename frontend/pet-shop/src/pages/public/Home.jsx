import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePets } from '../../hooks/queries/usePets';
import PetCard from '../../components/cards/PetCard';

// A simple array of data we map over to draw the "Why Choose Us" cards
const features = [
  { icon: 'bi-patch-check-fill', title: 'Certified Pets', desc: 'All pets are health-checked and vaccinated by our vets.' },
  { icon: 'bi-truck', title: 'Safe Delivery', desc: 'We ensure safe and comfortable delivery to your home.' },
  { icon: 'bi-headset', title: '24/7 Support', desc: 'Our pet care experts are available around the clock.' },
  { icon: 'bi-star-fill', title: 'Premium Quality', desc: 'Only the finest breeds from trusted suppliers.' },
];

export default function HomePage() {
  const navigate = useNavigate(); 
  
  // Get the pets from the API.
  const { data: pets = [], isLoading } = usePets();
  
  // Only take the first 4 pets to feature on the homepage
  const featured = pets.slice(0, 4);

  return (
    <div>
      {/* 1. Hero Section: The big colorful banner at the top */}
      <div className="text-white py-5 position-relative overflow-hidden" 
        
        style={{ background: 'linear-gradient(135deg, #6C63FF 0%, #FF6584 100%)', paddingBottom: '6rem', paddingTop: '6rem' }}
      >
        <div className="container position-relative" >
          <div className="row align-items-center" >
            
            {/* Left side text */}
            <div className="col-12 col-md-7 col-lg-6"  >
              <span className="badge bg-light text-dark mb-3 px-3 py-2 rounded-pill fs-6 fw-bold" style={{ backgroundColor: 'rgba(255,255,255,0.9)!important' }}>
                🐾 #1 Pet Shop Platform
              </span>
              <h1 className="fw-bolder mb-3 display-3"  style={{ lineHeight: 1.1 }}>
                Find Your Perfect <span style={{ color: '#FFE66D' }}>Furry Friend</span>
              </h1>
              <p className="fs-5 mb-4 opacity-75" >
                Discover thousands of healthy, vaccinated pets from verified suppliers. Your dream companion is just a click away.
              </p>
              
              {/* Buttons */}
              <div className="d-flex flex-column flex-sm-row gap-3" >
                <button className="btn btn-light btn-lg fw-bold text-primary px-4 py-2 d-flex align-items-center justify-content-center gap-2" onClick={() => navigate('/catalog')}>
                  <i className="bi bi-suit-heart-fill" ></i> Browse Pets
                </button>
                <button className="btn btn-outline-light btn-lg fw-bold px-4 py-2" onClick={() => navigate('/register')}>
                  Get Started Free
                </button>
              </div>
            </div>
            
            {/* Right side graphic (hidden on mobile) */}
            <div className="col-md-5 col-lg-6 d-none d-md-flex justify-content-center align-items-center" >
              <div style={{ fontSize: '10rem', lineHeight: 1, filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))' }}>
                🐾
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Features Section: Why Choose PetShop? */}
      <div className="container py-5 my-5" >
        <div className="text-center mb-5" >
          <h2 className="fw-bolder mb-3" >Why Choose PetShop?</h2>
          <p className="text-muted fs-5 mx-auto"  style={{ maxWidth: '800px' }}>
            We're committed to connecting pets with loving families through a trusted and transparent process.
          </p>
        </div>
        
        {/* Mapping through our features array to draw the cards */}
        <div className="row g-4 justify-content-center" >
          {features.map(({ icon, title, desc }) => (
            <div className="col-12 col-sm-6 col-lg-3"  key={title}>
              <div className="card h-100 text-center border-0 shadow-sm feature-card transition-all" >
                <div className="card-body p-4" >
                  <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" 
                     
                    style={{ width: '64px', height: '64px' }}
                  >
                    <i className={` ${`bi ${icon} fs-3`}`.trim()} ></i>
                  </div>
                  <h5 className="card-title fw-bold mb-3" >{title}</h5>
                  <p className="card-text text-muted" >{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Featured Pets Section */}
      <div className="bg-body-tertiary py-5" >
        <div className="container py-4" >
          <div className="d-flex justify-content-between align-items-center mb-4" >
            <h2 className="fw-bolder mb-0" >Featured Pets</h2>
            <button className="btn btn-outline-primary fw-semibold" onClick={() => navigate('/catalog')}>
              View All
            </button>
          </div>
          
          {/* If the data is still loading, show a spinner. Otherwise, show the pets. */}
          {isLoading ? (
            <div className="d-flex justify-content-center align-items-center py-5" >
              <div className="spinner-border text-primary"     role="status"></div>
            </div>
          ) : (
            <div className="row g-4 flex-nowrap overflow-auto pb-3"  style={{ scrollSnapType: 'x mandatory' }}>
              {featured.map((pet) => (
                <div className="col-11 col-sm-6 col-md-4 col-lg-3"  key={pet.id} style={{ scrollSnapAlign: 'start' }}>
                  <PetCard pet={pet} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Add some basic CSS for the feature cards hover effect in this file or index.css */}
      <style>{`
        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
        }
      `}</style>
    </div>
  );
}

