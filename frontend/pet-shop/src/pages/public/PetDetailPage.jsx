import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Our custom data-fetching hooks
import { usePet, usePetGroomingServices, usePetVaccinations, usePetFoodInfo } from '../../hooks/queries/usePets';
import { useCategories } from '../../hooks/queries/useCategories';
import { useGroomingServices } from '../../hooks/queries/useGroomingServices';
import { useVaccinations } from '../../hooks/queries/useVaccinations';
import { usePetFoods } from '../../hooks/queries/usePetFoods';

import { formatCurrency } from '../../utils/helpers';

export default function PetDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Fetch all the data we need for this page
  const { data: pet, isLoading } = usePet(id);
  const { data: categories = [] } = useCategories();
  
  // Fetch junction table data
  const { data: groomingRel = [] } = usePetGroomingServices(id);
  const { data: vaccinationRel = [] } = usePetVaccinations(id);
  const { data: foodRel = [] } = usePetFoodInfo(id);
  
  // Fetch master tables data
  const { data: allGrooming = [] } = useGroomingServices();
  const { data: allVaccinations = [] } = useVaccinations();
  const { data: allFoods = [] } = usePetFoods();

  // Show a spinner while the API is thinking
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 flex-column gap-3" >
        <div className="spinner-border text-primary"    style={{ width: '3rem', height: '3rem' }}  role="status"></div>
        <h5 className="text-muted" >Loading pet details...</h5>
      </div>
    );
  }
  
  // If API finished but no pet came back, show an error
  if (!pet) {
    return (
      <div className="p-5 text-center" >
        <p className="fs-4" >Pet not found</p>
      </div>
    );
  }

  // --- Data Processing ---
  const category = categories.find((c) => c.id === pet.category_id);
  
  const groomingServices = groomingRel
    .map((r) => allGrooming.find((g) => g.id === r.service_id))
    .filter(Boolean);
    
  const vaccinations = vaccinationRel
    .map((r) => allVaccinations.find((v) => v.id === r.vaccination_id))
    .filter(Boolean);
    
  const foods = foodRel
    .map((r) => allFoods.find((f) => f.id === r.food_id))
    .filter(Boolean);

  return (
    <div className="container py-5" >
      {/* Back Button */}
      <button className="btn btn-link text-decoration-none text-body p-0 mb-4 d-flex align-items-center gap-2"  onClick={() => navigate(-1)}>
        <i className="bi bi-arrow-left" ></i> Back to Catalog
      </button>

      {/* Top Section: Photo and Basic Info */}
      <div className="row g-5" >
        {/* Left Side: Photo */}
        <div className="col-12 col-md-5"  >
          <img
            src={pet.image_url || `https://picsum.photos/seed/${pet.id}/600/400`}
            alt={pet.name}
            onError={(e) => { e.target.src = `https://picsum.photos/seed/${pet.id}/600/400`; }}
            className="w-100 rounded-4 shadow object-fit-cover"
            style={{ maxHeight: '420px' }}
          />
        </div>

        {/* Right Side: Text Info */}
        <div className="col-12 col-md-7"  >
          <div className="d-flex gap-2 mb-3" >
            {category && <span className="badge bg-primary fs-6 px-3 py-2"  >{category.name}</span>}
            <span className="badge bg-light text-dark border fs-6 px-3 py-2">
              {pet.age} yr{pet.age !== 1 ? 's' : ''} old
            </span>
          </div>
          <h1 className="fw-bolder display-5 mb-1" >{pet.name}</h1>
          <h4 className="text-muted mb-3" >{pet.breed}</h4>
          <p className="text-secondary fs-5 mb-4" >{pet.description}</p>
          
          <div className="card bg-primary text-white border-0 shadow-sm p-4 rounded-4 mb-4" >
            <h2 className="fw-bolder mb-0" >{formatCurrency(pet.price)}</h2>
            <div className="opacity-75" >Adoption Price</div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Tabs for Extra Details */}
      <div className="mt-5 pt-4 border-top" >
        <div className="mb-4" >
          <ul className="nav nav-tabs mb-3" >
            <li className="nav-item" >
              <a className="nav-link active"  data-bs-toggle="tab" href="#vaccinations">Vaccinations ({vaccinations.length})</a>
            </li>
            <li className="nav-item" >
              <a className="nav-link"  data-bs-toggle="tab" href="#grooming">Grooming Services ({groomingServices.length})</a>
            </li>
            <li className="nav-item" >
              <a className="nav-link"  data-bs-toggle="tab" href="#food">Food Info ({foods.length})</a>
            </li>
          </ul>
          
          <div className="tab-content" >
            <div className="tab-pane fade show active"  id="vaccinations">
              <div className="row g-4 mt-1" >
                {vaccinations.length === 0 ? (
                  <div className="col" ><p className="text-muted" >No vaccinations recorded</p></div>
                ) : vaccinations.map((v) => (
                  <div className="col-12 col-sm-6 col-md-4"  key={v.id}>
                    <div className="card h-100 shadow-sm border-0" >
                      <div className="card-body" >
                        <h5 className="card-title fw-bold" >{v.name}</h5>
                        <p className="card-text text-muted small" >{v.description}</p>
                        <span className="badge bg-primary" >
                          {formatCurrency(v.price)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          
            <div className="tab-pane fade"  id="grooming">
              <div className="row g-4 mt-1" >
                {groomingServices.length === 0 ? (
                  <div className="col" ><p className="text-muted" >No grooming services</p></div>
                ) : groomingServices.map((g) => (
                  <div className="col-12 col-sm-6 col-md-4"  key={g.id}>
                    <div className="card h-100 shadow-sm border-0" >
                      <div className="card-body" >
                        <h5 className="card-title fw-bold" >{g.name}</h5>
                        <p className="card-text text-muted small" >{g.description}</p>
                        <span className="badge bg-primary" >
                          {formatCurrency(g.price)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          
            <div className="tab-pane fade"  id="food">
              <div className="row g-4 mt-1" >
                {foods.length === 0 ? (
                  <div className="col" ><p className="text-muted" >No food info available</p></div>
                ) : foods.map((f) => (
                  <div className="col-12 col-sm-6 col-md-4"  key={f.id}>
                    <div className="card h-100 shadow-sm border-0" >
                      <div className="card-body" >
                        <h5 className="card-title fw-bold" >{f.name}</h5>
                        <p className="card-text text-muted small mb-1" >{f.brand} &bull; {f.type}</p>
                        <p className="card-text small mb-2" >Stock: {f.quantity}</p>
                        <span className="badge bg-primary" >
                          {formatCurrency(f.price)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

