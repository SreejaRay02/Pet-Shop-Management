import React from 'react';
import { useNavigate } from 'react-router-dom';

// The 404 Error Page
export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-body" >
      <div className="container text-center"  style={{ maxWidth: '600px' }}>
        <div style={{ fontSize: '6rem' }}>🐾</div>
        <h1 className="fw-bolder display-1 mb-3" >404</h1>
        <h3 className="text-muted mb-3" >Oops! Page Not Found</h3>
        <p className="text-secondary mb-4 fs-5" >
          The page you're looking for seems to have wandered off with the pets.
        </p>
        <button className="btn btn-primary btn-lg fw-bold px-5"  onClick={() => navigate('/')}>
          Go Home
        </button>
      </div>
    </div>
  );
};

// The 403 Error Page
export const UnauthorizedPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-body" >
      <div className="container text-center"  style={{ maxWidth: '600px' }}>
        <div style={{ fontSize: '6rem' }}>🚫</div>
        <h1 className="fw-bolder display-1 mb-3" >403</h1>
        <h3 className="text-muted mb-3" >Access Denied</h3>
        <p className="text-secondary mb-4 fs-5" >
          You don't have permission to access this page.
        </p>
        <button className="btn btn-primary btn-lg fw-bold px-5"  onClick={() => navigate('/')}>
          Go Home
        </button>
      </div>
    </div>
  );
};

// The About Us Page
export const AboutPage = () => {
  return (
    <div className="container py-5 my-5"  style={{ maxWidth: '800px' }}>
      <h1 className="fw-bolder mb-4" >About PetShop</h1>
      
      <p className="text-muted fs-5 mb-4" >
        PetShop is a comprehensive pet management system connecting pet lovers with their perfect companions since 2014. 
        We work with certified breeders and suppliers to ensure every animal is healthy, vaccinated, and ready for a loving home.
      </p>
      
      <p className="text-muted fs-5 mb-5" >
        Our platform supports 20+ animal categories including dogs, cats, birds, fish, reptiles, and more. 
        Every pet comes with a detailed health profile including vaccination records and grooming history.
      </p>
      
      <h3 className="fw-bold mb-3" >Our Mission</h3>
      
      <p className="text-secondary fs-5 border-start border-primary border-4 ps-4 py-2 bg-body-tertiary rounded-end" >
        To create a transparent, trustworthy marketplace where every animal finds a loving home and every family finds their perfect companion.
      </p>
    </div>
  );
};

