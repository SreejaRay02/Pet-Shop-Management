import React, { useMemo } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import StatCard from '../../components/cards/StatCard';
import { useAuthStore } from '../../stores/authStore';
import { usePets } from '../../hooks/queries/usePets';
import { useGroomingServices } from '../../hooks/queries/useGroomingServices';
import { useVaccinations } from '../../hooks/queries/useVaccinations';
import { Link } from 'react-router-dom';
export default function EmployeeDashboard() {
  const { user } = useAuthStore();
  const { data: pets } = usePets();
  const { data: grooming } = useGroomingServices();
  const { data: vaccinations } = useVaccinations();

  const stats = useMemo(() => [
    { title: 'Total Pets', value: pets?.length || 0, icon: 'bi-suit-heart-fill', color: 'primary' },
    { title: 'Grooming Services', value: grooming?.length || 0, icon: 'bi-scissors', color: 'info' },
    { title: 'Vaccinations', value: vaccinations?.length || 0, icon: 'bi-shield-fill-plus', color: 'success' },
  ], [pets?.length, grooming?.length, vaccinations?.length]);

  return (
    <div className="container-fluid p-0">
      <div className="card bg-primary text-white border-0 shadow-sm mb-4 rounded-4 overflow-hidden">
        <div className="card-body p-4 p-md-5 position-relative">
          <div className="position-relative z-1">
            <h2 className="fw-bolder display-6 mb-2">Welcome back, {user?.name || user?.username || 'Employee'}! 👋</h2>
            <p className="fs-5 opacity-75 mb-0" style={{ maxWidth: '600px' }}>
              Here is what's happening at the PetShop today. Have a great shift!
            </p>
          </div>
          <i className="bi bi-stars position-absolute top-50 end-0 translate-middle-y opacity-25 d-none d-md-block" style={{ fontSize: '8rem', marginRight: '5%' }}></i>
        </div>
      </div>

      <div className="row g-4 mb-4">
        {stats.map((s) => (
          <div className="col-12 col-md-4" key={s.title}>
            <StatCard {...s} />
          </div>
        ))}
      </div>

      <div className="row g-4 mb-4 justify-content-center">
        <div className="col-12 col-lg-6">
          <div className="card border-0 shadow-sm h-100 rounded-4">
            <div className="card-body p-4 d-flex flex-column align-items-center justify-content-center text-center">
              <div className="bg-light rounded-circle p-3 mb-3 d-flex align-items-center justify-content-center" style={{ width: '64px', height: '64px' }}>
                <i className="bi bi-search fs-3 text-primary"></i>
              </div>
              <h5 className="fw-bold mb-2">Browse Catalog</h5>
              <p className="text-muted mb-4">Check the public catalog to assist customers with pet details, pricing, and availability.</p>
              <Link to="/catalog" className="btn btn-primary rounded-pill px-4 fw-bold">Open Catalog</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
