import React, { useState, useEffect } from 'react';

// Hooks for fetching data
import { usePets } from '../../hooks/queries/usePets';
import { useCategories } from '../../hooks/queries/useCategories';
import { useCustomers } from '../../hooks/queries/useCustomers';

// UI Component
import PetCard from '../../components/cards/PetCard';

// Hooks for state and actions
import { useAuthStore } from '../../stores/authStore';
import { useCreateTransaction } from '../../hooks/mutations/useTransactionMutations';


export default function CatalogPage() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (successMessage || errorMessage) {
      const t = setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [successMessage, errorMessage]);

  const [search, setSearch] = useState(''); 
  const [selectedCategory, setSelectedCategory] = useState(''); 

  // Fetch data
  const { data: pets = [], isLoading } = usePets();
  const { data: categories = [] } = useCategories();
  
  // Get user details
  const { isAuthenticated, user, role } = useAuthStore();
  const createTransaction = useCreateTransaction();
  
  // Also fetch customers so we can map the auth user to a customer record
  const { data: customers = [] } = useCustomers();

  // MAGIC PART: Filtering the pets array!
  const filtered = pets.filter((pet) => {
    const matchSearch = !search || 
      pet.name.toLowerCase().includes(search.toLowerCase()) ||
      pet.breed.toLowerCase().includes(search.toLowerCase());
      
    const matchCat = !selectedCategory || pet.category_id === Number(selectedCategory);
    
    return matchSearch && matchCat;
  });

  // Function that runs when the "Adopt Now" button is clicked
  const handleBuy = async (pet) => {
    if (!isAuthenticated) { 
      setSuccessMessage('Please login to purchase'); 
      return; 
    }
    if (role !== 'Customer') { 
      setErrorMessage('Only customers can purchase pets'); 
      return; 
    }

    // Find the correct customer ID from the customers list by matching email
    const customer = customers.find((c) => c.email === user?.email);
    
    if (!customer) {
      setErrorMessage('Customer profile not found!');
      return;
    }
    try {
      // Send the purchase request to the API
      await createTransaction.mutateAsync({
        customer_id: customer.id, // Correct customer ID
        pet_id: pet.id,
        transaction_date: new Date().toISOString().slice(0, 10), // Today's date
        amount: pet.price,
        transaction_status: 'Success',
      });
      setSuccessMessage('Pet adopted successfully! Check your orders.');
    } catch (err) {
      setErrorMessage('Failed to adopt pet. Please try again.');
    }
  };

  return (
    <div className="container py-5" fluid="xl" >
      {successMessage && <div className="alert alert-success mb-4" >{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger mb-4" >{errorMessage}</div>}
      
      {/* Page Header */}
      <h2 className="fw-bolder mb-2" >Pet Catalog</h2>
      <p className="text-muted mb-4" >
        Find your perfect companion from our curated collection
      </p>

      {/* Filter Controls (Search Bar & Dropdown) */}
      <div className="row g-3 mb-4" >
        {/* Search Bar */}
        <div className="col-12 col-md-8 col-lg-9"  >
          <div className="input-group" >
            <span className="input-group-text bg-body-tertiary" >
              <i className="bi bi-search" ></i>
            </span>
            <input className="form-control"
              value={search}
               onChange={(e) => setSearch(e.target.value)} 
              placeholder="Search by name or breed..."
            />
          </div>
        </div>
        
        {/* Category Dropdown */}
        <div className="col-12 col-md-4 col-lg-3"  >
          <select className="form-select" 
            value={selectedCategory} 
             onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-3" >
        <span className="text-muted small" >
          Showing <b>{filtered.length}</b> pets
        </span>
      </div>

      {/* Grid of Pet Cards */}
      <div className="d-grid gap-4 justify-content-center" 
         
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
      >
        {/* If loading, show spinners */}
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div className="bg-body-secondary rounded-4 d-flex align-items-center justify-content-center" key={i}  style={{ height: '320px' }}>
                <div className="spinner-border text-secondary"     role="status"></div>
              </div>
            ))
          : /* Otherwise, draw the filtered pets! */
            filtered.map((pet) => (
              <div key={pet.id}>
                <PetCard 
                  pet={pet} 
                  showBuyButton={isAuthenticated && role === 'Customer'} 
                  onBuy={handleBuy} 
                />
              </div>
            ))
        }
        
        {/* If filtering returned zero results */}
        {!isLoading && filtered.length === 0 && (
          <div className="text-center py-5"  style={{ gridColumn: '1 / -1' }}>
            <h1 className="display-4 mb-3" >🐾</h1>
            <h5 className="text-muted" >No pets found matching your search</h5>
          </div>
        )}
      </div>
    </div>
  );
}


