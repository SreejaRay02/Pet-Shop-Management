import React, { useMemo } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { useSuppliers } from '../../hooks/queries/useSuppliers';
import { usePets } from '../../hooks/queries/usePets';
import StatCard from '../../components/cards/StatCard';
import { PageHeader } from '../../components/layout/PageHeader';

export default function SupplierDashboard() {
  const { user } = useAuthStore();
  const { data: suppliers = [] } = useSuppliers();
  const { data: pets = [] } = usePets();
  
  const mySupplier = useMemo(() => suppliers.find((s) => s.email === user?.email), [suppliers, user?.email]);

  const supplierInfo = useMemo(() => {
    if (!mySupplier) return [];
    return [
      ['Company Name', mySupplier.name],
      ['Contact Person', mySupplier.contact_person],
      ['Phone', mySupplier.phone_number],
      ['Email', mySupplier.email],
    ];
  }, [mySupplier]);

  return (
    <div className="container p-0" fluid >
      <PageHeader title="Supplier Dashboard" subtitle={mySupplier?.name || 'Supplier Portal'} />
      <div className="row g-4 mb-4" >
        <div className="col-12 col-sm-6 col-md-4"  >
          <StatCard title="Total Pets in System" value={pets.length} icon="heart" color="primary" />
        </div>
        <div className="col-12 col-sm-6 col-md-4"  >
          <StatCard title="My Profile ID" value={mySupplier?.id || 'N/A'} icon="box-seam" color="warning" />
        </div>
      </div>
      <div className="card p-4 border-0 shadow-sm" >
        <h5 className="fw-bold mb-3" >My Supplier Information</h5>
        
        {mySupplier ? (
          <div className="row g-3" >
            {supplierInfo.map(([label, value]) => (
              <div className="col-12 col-sm-6"  key={label}>
                <span className="text-secondary small d-block mb-1" >{label}</span>
                <span className="fw-semibold" >{value}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-secondary mb-0" >No supplier profile linked to this account.</p>
        )}
      </div>
    </div>
  );
}